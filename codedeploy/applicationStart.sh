#!/bin/bash
cd /home/ubuntu/webapp
sudo kill -9 $(sudo lsof -t -i:3000)
ls -a
source /etc/profile

ls -a

sudo pm2 start src/app.ts
