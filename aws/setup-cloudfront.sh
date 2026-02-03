#!/bin/bash

# CauseWay Website - AWS CloudFront Distribution Setup
# Domain: finance.causewaygrp.com

set -e

DOMAIN="finance.causewaygrp.com"
BUCKET_NAME="finance.causewaygrp.com"
REGION="us-east-1"

echo "=========================================="
echo "CauseWay - CloudFront Distribution Setup"
echo "Domain: $DOMAIN"
echo "=========================================="

# Get certificate ARN
if [ -f /tmp/causeway-cert-arn.txt ]; then
    CERT_ARN=$(cat /tmp/causeway-cert-arn.txt)
else
    echo "Certificate ARN not found. Please run setup-ssl.sh first."
    echo "Or enter the certificate ARN manually:"
    read -p "Certificate ARN: " CERT_ARN
fi

echo "Using Certificate ARN: $CERT_ARN"

# Check if certificate is validated
echo ""
echo "Checking certificate status..."
CERT_STATUS=$(aws acm describe-certificate \
    --certificate-arn "$CERT_ARN" \
    --region "$REGION" \
    --query 'Certificate.Status' \
    --output text)

if [ "$CERT_STATUS" != "ISSUED" ]; then
    echo "WARNING: Certificate status is $CERT_STATUS"
    echo "Please complete DNS validation before proceeding."
    echo "Run: aws acm describe-certificate --certificate-arn $CERT_ARN --region $REGION"
    exit 1
fi

echo "Certificate is validated!"

# Create CloudFront distribution configuration
echo ""
echo "Creating CloudFront distribution..."

cat > /tmp/cloudfront-config.json << EOF
{
    "CallerReference": "finance-causewaygrp-$(date +%s)",
    "Aliases": {
        "Quantity": 1,
        "Items": ["$DOMAIN"]
    },
    "DefaultRootObject": "index.html",
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "S3-$BUCKET_NAME",
                "DomainName": "$BUCKET_NAME.s3-website-$REGION.amazonaws.com",
                "CustomOriginConfig": {
                    "HTTPPort": 80,
                    "HTTPSPort": 443,
                    "OriginProtocolPolicy": "http-only",
                    "OriginSslProtocols": {
                        "Quantity": 1,
                        "Items": ["TLSv1.2"]
                    }
                }
            }
        ]
    },
    "DefaultCacheBehavior": {
        "TargetOriginId": "S3-$BUCKET_NAME",
        "ViewerProtocolPolicy": "redirect-to-https",
        "AllowedMethods": {
            "Quantity": 2,
            "Items": ["GET", "HEAD"],
            "CachedMethods": {
                "Quantity": 2,
                "Items": ["GET", "HEAD"]
            }
        },
        "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
        "Compress": true
    },
    "CustomErrorResponses": {
        "Quantity": 2,
        "Items": [
            {
                "ErrorCode": 404,
                "ResponsePagePath": "/index.html",
                "ResponseCode": "200",
                "ErrorCachingMinTTL": 300
            },
            {
                "ErrorCode": 403,
                "ResponsePagePath": "/index.html",
                "ResponseCode": "200",
                "ErrorCachingMinTTL": 300
            }
        ]
    },
    "Comment": "CauseWay Financial & Banking Consultancies - finance.causewaygrp.com",
    "PriceClass": "PriceClass_100",
    "Enabled": true,
    "ViewerCertificate": {
        "ACMCertificateArn": "$CERT_ARN",
        "SSLSupportMethod": "sni-only",
        "MinimumProtocolVersion": "TLSv1.2_2021"
    },
    "HttpVersion": "http2and3"
}
EOF

DISTRIBUTION_ID=$(aws cloudfront create-distribution \
    --distribution-config file:///tmp/cloudfront-config.json \
    --query 'Distribution.Id' \
    --output text)

DISTRIBUTION_DOMAIN=$(aws cloudfront get-distribution \
    --id "$DISTRIBUTION_ID" \
    --query 'Distribution.DomainName' \
    --output text)

echo ""
echo "=========================================="
echo "CloudFront Distribution Created!"
echo "=========================================="
echo ""
echo "Distribution ID: $DISTRIBUTION_ID"
echo "Distribution Domain: $DISTRIBUTION_DOMAIN"
echo ""
echo "Save these values! You'll need them for DNS configuration."
echo ""
echo "Distribution ID saved to /tmp/causeway-distribution-id.txt"
echo "Distribution Domain saved to /tmp/causeway-distribution-domain.txt"
echo ""
echo "Next step: Run ./aws/setup-dns.sh to configure Route 53"
echo "Or add a CNAME record manually in your DNS provider:"
echo "  Name: finance"
echo "  Value: $DISTRIBUTION_DOMAIN"
echo ""

# Save for later use
echo "$DISTRIBUTION_ID" > /tmp/causeway-distribution-id.txt
echo "$DISTRIBUTION_DOMAIN" > /tmp/causeway-distribution-domain.txt
