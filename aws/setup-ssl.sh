#!/bin/bash

# CauseWay Website - AWS ACM SSL Certificate Setup
# Domain: finance.causewaygrp.com

set -e

DOMAIN="finance.causewaygrp.com"
REGION="us-east-1"  # CloudFront requires certificates in us-east-1

echo "=========================================="
echo "CauseWay - SSL Certificate Setup"
echo "Domain: $DOMAIN"
echo "=========================================="

# Step 1: Request SSL certificate
echo ""
echo "Step 1: Requesting SSL certificate..."
CERT_ARN=$(aws acm request-certificate \
    --domain-name "$DOMAIN" \
    --validation-method DNS \
    --region "$REGION" \
    --query 'CertificateArn' \
    --output text)

echo "Certificate ARN: $CERT_ARN"

# Step 2: Get DNS validation records
echo ""
echo "Step 2: Getting DNS validation records..."
sleep 5  # Wait for certificate to be created

aws acm describe-certificate \
    --certificate-arn "$CERT_ARN" \
    --region "$REGION" \
    --query 'Certificate.DomainValidationOptions[0].ResourceRecord' \
    --output table

echo ""
echo "=========================================="
echo "SSL Certificate Requested!"
echo "=========================================="
echo ""
echo "Certificate ARN: $CERT_ARN"
echo ""
echo "IMPORTANT: Add the DNS validation record shown above to your domain's DNS settings."
echo ""
echo "Add a CNAME record in your DNS provider (Route 53 or other):"
echo "  - Name: The 'Name' value from the table above (without the domain suffix)"
echo "  - Value: The 'Value' from the table above"
echo ""
echo "After DNS validation is complete (usually 5-30 minutes), run:"
echo "  ./aws/setup-cloudfront.sh"
echo ""

# Save certificate ARN for later use
echo "$CERT_ARN" > /tmp/causeway-cert-arn.txt
echo "Certificate ARN saved to /tmp/causeway-cert-arn.txt"
