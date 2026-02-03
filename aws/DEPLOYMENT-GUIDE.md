# CauseWay Website - AWS Deployment Guide

**Domain:** finance.causewaygrp.com

This guide provides step-by-step instructions to deploy the CauseWay website to AWS using S3 + CloudFront with a custom domain.

---

## Prerequisites

Before starting, ensure you have:

1. **AWS CLI** installed and configured with appropriate credentials
2. **Node.js 20+** and **pnpm** installed
3. **Access to DNS settings** for causewaygrp.com (Route 53 or external DNS provider)

```bash
# Verify AWS CLI is configured
aws sts get-caller-identity
```

---

## Option 1: Automated Deployment (Recommended)

### Step 1: Deploy to S3

```bash
cd /path/to/causeway-website
chmod +x aws/*.sh
./aws/deploy.sh
```

This script will:
- Build the website
- Create an S3 bucket named `finance.causewaygrp.com`
- Configure static website hosting
- Upload all files with proper cache headers

### Step 2: Request SSL Certificate

```bash
./aws/setup-ssl.sh
```

This script will:
- Request an SSL certificate from AWS Certificate Manager
- Display the DNS validation record you need to add

**Important:** Add the CNAME record shown to your DNS provider to validate the certificate.

### Step 3: Create CloudFront Distribution

After the certificate is validated (check status in AWS Console):

```bash
./aws/setup-cloudfront.sh
```

This script will:
- Create a CloudFront distribution with HTTPS
- Configure custom error pages for SPA routing
- Enable HTTP/2 and HTTP/3

### Step 4: Configure DNS

```bash
./aws/setup-dns.sh
```

Or manually add a CNAME record:
- **Name:** `finance`
- **Type:** `CNAME`
- **Value:** `[CloudFront distribution domain from Step 3]`

---

## Option 2: CloudFormation (Infrastructure as Code)

Deploy everything with a single command:

```bash
# Deploy the CloudFormation stack
aws cloudformation create-stack \
    --stack-name causeway-finance \
    --template-body file://aws/cloudformation.yml \
    --parameters \
        ParameterKey=DomainName,ParameterValue=finance.causewaygrp.com \
        ParameterKey=HostedZoneId,ParameterValue=YOUR_HOSTED_ZONE_ID \
    --capabilities CAPABILITY_IAM \
    --region us-east-1

# Wait for stack creation (10-15 minutes)
aws cloudformation wait stack-create-complete --stack-name causeway-finance

# Get outputs
aws cloudformation describe-stacks --stack-name causeway-finance --query 'Stacks[0].Outputs'
```

**Note:** If not using Route 53, leave `HostedZoneId` empty and manually configure DNS after deployment.

After stack creation, upload the website files:

```bash
pnpm build
aws s3 sync dist/public s3://finance.causewaygrp.com --delete
```

---

## Option 3: Manual Deployment

### Step 1: Build the Website

```bash
pnpm install
pnpm build
```

### Step 2: Create S3 Bucket

```bash
# Create bucket
aws s3api create-bucket --bucket finance.causewaygrp.com --region us-east-1

# Enable static website hosting
aws s3 website s3://finance.causewaygrp.com --index-document index.html --error-document index.html

# Set bucket policy for public access
aws s3api put-bucket-policy --bucket finance.causewaygrp.com --policy '{
    "Version": "2012-10-17",
    "Statement": [{
        "Sid": "PublicReadGetObject",
        "Effect": "Allow",
        "Principal": "*",
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::finance.causewaygrp.com/*"
    }]
}'

# Disable block public access
aws s3api put-public-access-block --bucket finance.causewaygrp.com \
    --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# Upload files
aws s3 sync dist/public s3://finance.causewaygrp.com --delete
```

### Step 3: Request SSL Certificate

```bash
aws acm request-certificate \
    --domain-name finance.causewaygrp.com \
    --validation-method DNS \
    --region us-east-1
```

Add the DNS validation record, then wait for certificate to be issued.

### Step 4: Create CloudFront Distribution

Use the AWS Console or CLI to create a distribution with:
- **Origin:** `finance.causewaygrp.com.s3-website-us-east-1.amazonaws.com`
- **Alternate domain:** `finance.causewaygrp.com`
- **SSL Certificate:** Select the certificate from Step 3
- **Custom error responses:** 404 → /index.html (200), 403 → /index.html (200)

### Step 5: Configure DNS

Add a CNAME record pointing `finance.causewaygrp.com` to your CloudFront distribution domain.

---

## Updating the Website

After making changes to the website:

```bash
# Rebuild
pnpm build

# Upload to S3
aws s3 sync dist/public s3://finance.causewaygrp.com --delete

# Invalidate CloudFront cache (optional, for immediate updates)
aws cloudfront create-invalidation \
    --distribution-id YOUR_DISTRIBUTION_ID \
    --paths "/*"
```

---

## Monitoring & Troubleshooting

### Check S3 Website

```bash
curl -I http://finance.causewaygrp.com.s3-website-us-east-1.amazonaws.com
```

### Check Certificate Status

```bash
aws acm describe-certificate --certificate-arn YOUR_CERT_ARN --region us-east-1
```

### Check CloudFront Distribution Status

```bash
aws cloudfront get-distribution --id YOUR_DISTRIBUTION_ID
```

### Common Issues

| Issue | Solution |
|-------|----------|
| Certificate pending validation | Add the CNAME record to your DNS |
| 403 Forbidden from S3 | Check bucket policy and public access settings |
| CloudFront returning old content | Create a cache invalidation |
| DNS not resolving | Wait for propagation (up to 48 hours) |

---

## Cost Estimate

| Service | Monthly Cost (Low Traffic) |
|---------|---------------------------|
| S3 Storage | $0.023/GB |
| S3 Requests | $0.0004/1000 GET |
| CloudFront | $0.085/GB transfer |
| Route 53 | $0.50/hosted zone |
| ACM Certificate | Free |
| **Total (estimated)** | **$1-5/month** |

---

## Security Recommendations

1. **Enable CloudFront logging** for audit trails
2. **Set up AWS WAF** for DDoS protection (optional)
3. **Enable versioning** on S3 bucket for rollback capability
4. **Use IAM roles** with least privilege for deployments

---

## Support

For deployment assistance, contact the CauseWay development team.
