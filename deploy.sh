#!/bin/bash

set -e 

export NVM_DIR="/root/.nvm"
source "$NVM_DIR/nvm.sh"

# Force Node version
nvm use 24

# Fix PATH explicitly
export PATH="$NVM_DIR/versions/node/v24.13.0/bin:$PATH"

NODE=$(which node)
NPM=$(which npm)

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
