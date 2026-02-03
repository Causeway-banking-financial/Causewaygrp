#!/bin/bash

# CauseWay Website - AWS Route 53 DNS Setup
# Domain: finance.causewaygrp.com

set -e

DOMAIN="finance.causewaygrp.com"
PARENT_DOMAIN="causewaygrp.com"

echo "=========================================="
echo "CauseWay - Route 53 DNS Setup"
echo "Domain: $DOMAIN"
echo "=========================================="

# Get CloudFront distribution domain
if [ -f /tmp/causeway-distribution-domain.txt ]; then
    CF_DOMAIN=$(cat /tmp/causeway-distribution-domain.txt)
else
    echo "CloudFront distribution domain not found."
    echo "Please enter the CloudFront distribution domain (e.g., d1234567890.cloudfront.net):"
    read -p "CloudFront Domain: " CF_DOMAIN
fi

echo "CloudFront Domain: $CF_DOMAIN"

# Find hosted zone for parent domain
echo ""
echo "Looking for Route 53 hosted zone for $PARENT_DOMAIN..."
HOSTED_ZONE_ID=$(aws route53 list-hosted-zones \
    --query "HostedZones[?Name=='$PARENT_DOMAIN.'].Id" \
    --output text | sed 's|/hostedzone/||')

if [ -z "$HOSTED_ZONE_ID" ] || [ "$HOSTED_ZONE_ID" == "None" ]; then
    echo ""
    echo "No hosted zone found for $PARENT_DOMAIN in Route 53."
    echo ""
    echo "Option 1: Create a hosted zone in Route 53"
    echo "  aws route53 create-hosted-zone --name $PARENT_DOMAIN --caller-reference $(date +%s)"
    echo ""
    echo "Option 2: Add CNAME record manually in your DNS provider:"
    echo "  Name: finance"
    echo "  Type: CNAME"
    echo "  Value: $CF_DOMAIN"
    echo ""
    exit 0
fi

echo "Found Hosted Zone ID: $HOSTED_ZONE_ID"

# Create DNS record
echo ""
echo "Creating CNAME record for $DOMAIN..."

cat > /tmp/dns-change.json << EOF
{
    "Comment": "CauseWay Finance subdomain",
    "Changes": [
        {
            "Action": "UPSERT",
            "ResourceRecordSet": {
                "Name": "$DOMAIN",
                "Type": "CNAME",
                "TTL": 300,
                "ResourceRecords": [
                    {
                        "Value": "$CF_DOMAIN"
                    }
                ]
            }
        }
    ]
}
EOF

aws route53 change-resource-record-sets \
    --hosted-zone-id "$HOSTED_ZONE_ID" \
    --change-batch file:///tmp/dns-change.json

echo ""
echo "=========================================="
echo "DNS Configuration Complete!"
echo "=========================================="
echo ""
echo "CNAME record created:"
echo "  Name: $DOMAIN"
echo "  Value: $CF_DOMAIN"
echo ""
echo "DNS propagation may take up to 48 hours, but usually completes within minutes."
echo ""
echo "Your website will be available at: https://$DOMAIN"
echo ""
