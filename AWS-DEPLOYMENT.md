# CauseWay Website - AWS Deployment Guide

This guide covers deploying the CauseWay website to AWS using various methods.

## Prerequisites

- AWS CLI configured with appropriate credentials
- Docker installed locally (for building images)
- Node.js 20+ and pnpm (for local development)

## Quick Start (Local Development)

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Deployment Options

### Option 1: AWS Amplify (Recommended for Static Sites)

1. Push code to GitHub repository
2. Go to AWS Amplify Console
3. Click "New app" → "Host web app"
4. Connect your GitHub repository
5. Configure build settings:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install -g pnpm
        - pnpm install
    build:
      commands:
        - pnpm build
  artifacts:
    baseDirectory: dist/public
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

6. Deploy

### Option 2: AWS S3 + CloudFront (Static Hosting)

```bash
# Build the project
pnpm build

# Create S3 bucket
aws s3 mb s3://causeway-website-prod

# Enable static website hosting
aws s3 website s3://causeway-website-prod --index-document index.html --error-document index.html

# Upload files
aws s3 sync dist/public s3://causeway-website-prod --delete

# Create CloudFront distribution (optional but recommended)
aws cloudfront create-distribution \
  --origin-domain-name causeway-website-prod.s3.amazonaws.com \
  --default-root-object index.html
```

### Option 3: AWS ECS with Docker

1. Build and push Docker image to ECR:

```bash
# Create ECR repository
aws ecr create-repository --repository-name causeway-website

# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Build image
docker build -t causeway-website .

# Tag image
docker tag causeway-website:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/causeway-website:latest

# Push image
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/causeway-website:latest
```

2. Create ECS cluster and service using AWS Console or CLI

### Option 4: AWS App Runner (Simplest Container Deployment)

1. Push Docker image to ECR (see above)
2. Go to AWS App Runner Console
3. Create new service
4. Select "Container registry" → ECR
5. Configure:
   - Port: 3000
   - CPU: 0.25 vCPU
   - Memory: 0.5 GB
6. Deploy

## Environment Variables

This is a static website and doesn't require server-side environment variables. All configuration is baked into the build.

For future backend integration, you may need:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://api.causeway.com` |
| `VITE_GA_ID` | Google Analytics ID | `G-XXXXXXXXXX` |

## Domain Configuration

### Using Route 53

1. Register or transfer domain to Route 53
2. Create hosted zone
3. Add A record pointing to:
   - CloudFront distribution (for S3 hosting)
   - ALB DNS name (for ECS)
   - App Runner service URL

### SSL Certificate

Use AWS Certificate Manager (ACM) to provision free SSL certificates:

```bash
aws acm request-certificate \
  --domain-name causeway.com \
  --subject-alternative-names "*.causeway.com" \
  --validation-method DNS
```

## Monitoring & Logging

### CloudWatch

- Enable CloudWatch Logs for container logs
- Set up CloudWatch Alarms for:
  - 5xx error rates
  - Response latency
  - CPU/Memory utilization

### Health Check

The Docker image includes a health check endpoint at `/`. Configure your load balancer to use this for health checks.

## Cost Optimization

| Service | Estimated Monthly Cost |
|---------|----------------------|
| S3 + CloudFront | $1-5 (low traffic) |
| Amplify | Free tier available |
| App Runner | $5-25 |
| ECS Fargate | $10-50 |

## Security Best Practices

1. Enable HTTPS only (redirect HTTP to HTTPS)
2. Configure security headers in CloudFront or ALB
3. Enable AWS WAF for DDoS protection
4. Use AWS Secrets Manager for any sensitive configuration
5. Enable CloudTrail for audit logging

## Support

For deployment assistance, contact the CauseWay development team.
