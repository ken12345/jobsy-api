#!/bin/bash

set -e 

echo "🚀 Starting deployment..."
cd "/root/apps/jobsy-api"

echo "🔄 Pulling latest code..."
git fetch origin
git reset --hard origin/main

echo "📥 Installing dependencies..."
npm install

echo "🏗️ Building app..."
npm run build

echo "♻️ Restarting PM2 process: api-gateway"
pm2 restart api-gateway

echo "✅ Deployment completed successfully!"
