#!/bin/bash
cd /home/ubuntu/webapp
sudo kill -9 $(sudo lsof -t -i:3000)
ls -a
source /etc/profile

ls -a
pm2 start dist/src/app.js --name webapp
