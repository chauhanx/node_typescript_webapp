#!/bin/bash
cd /home/ubuntu/webapp
sudo kill -9 $(sudo lsof -t -i:3000)
ls -a
whoami
source /etc/profile
pm2 start dist/src/app.js --name webapp