#!/bin/bash

# CauseWay Website - AWS S3 + CloudFront Deployment Script
# Domain: finance.causewaygrp.com
# 
# Prerequisites:
# - AWS CLI configured with appropriate credentials
# - Domain registered and accessible
# - Node.js and pnpm installed

set -e

# Configuration
DOMAIN="finance.causewaygrp.com"
BUCKET_NAME="finance.causewaygrp.com"
REGION="us-east-1"  # ACM certificates for CloudFront must be in us-east-1

echo "=========================================="
echo "CauseWay Website - AWS Deployment"
echo "Domain: $DOMAIN"
echo "=========================================="

# Step 1: Build the website
echo ""
echo "Step 1: Building website..."
cd "$(dirname "$0")/.."
pnpm install
pnpm build

# Step 2: Create S3 bucket for main domain
echo ""
echo "Step 2: Creating S3 bucket for $DOMAIN..."
aws s3api create-bucket \
    --bucket "$BUCKET_NAME" \
    --region "$REGION" \
    2>/dev/null || echo "Bucket $BUCKET_NAME may already exist"

# Step 3: Configure bucket for static website hosting
echo ""
echo "Step 3: Configuring static website hosting..."
aws s3 website "s3://$BUCKET_NAME" \
    --index-document index.html \
    --error-document index.html

# Step 4: Set bucket policy for public read access
echo ""
echo "Step 4: Setting bucket policy..."
cat > /tmp/bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
EOF

aws s3api put-bucket-policy \
    --bucket "$BUCKET_NAME" \
    --policy file:///tmp/bucket-policy.json

# Step 5: Disable block public access
echo ""
echo "Step 5: Configuring public access settings..."
aws s3api put-public-access-block \
    --bucket "$BUCKET_NAME" \
    --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# Step 6: Upload website files
echo ""
echo "Step 6: Uploading website files to S3..."
aws s3 sync dist/public "s3://$BUCKET_NAME" \
    --delete \
    --cache-control "max-age=31536000" \
    --exclude "*.html" \
    --exclude "*.json"

# Upload HTML and JSON with shorter cache
aws s3 sync dist/public "s3://$BUCKET_NAME" \
    --delete \
    --cache-control "max-age=0,no-cache,no-store,must-revalidate" \
    --exclude "*" \
    --include "*.html" \
    --include "*.json"

echo ""
echo "=========================================="
echo "S3 Deployment Complete!"
echo "=========================================="
echo ""
echo "Website URL: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
echo ""
echo "Next steps:"
echo "1. Run: ./aws/setup-ssl.sh to request SSL certificate"
echo "2. Run: ./aws/setup-cloudfront.sh to create CloudFront distribution"
echo "3. Run: ./aws/setup-dns.sh to configure Route 53"
echo ""
