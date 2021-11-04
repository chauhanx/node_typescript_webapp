#!/bin/bash
cd /home/ubuntu/webapp
sudo kill -9 $(sudo lsof -t -i:3000)
ls -a
source /etc/profile
sudo pm2 install typescript
sudo pm2 install ts-node
npm run prod