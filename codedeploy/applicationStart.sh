#!/bin/bash
cd /home/ubuntu/webapp
sudo kill -9 $(sudo lsof -t -i:3000)
ls -a
source /etc/profile

ls -a
pm2 start dist/src/app.js
pm2 startup systemd
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
