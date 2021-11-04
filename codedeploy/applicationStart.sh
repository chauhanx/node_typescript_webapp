#!/bin/bash
cd /home/ubuntu/webapp
# sudo kill -9 $(sudo lsof -t -i:3000)
ls -a
source /etc/profile
# sudo pm2 install typescript
# sudo pm2 install ts-node
echo **************************************************************
ls -a
npm run prod
