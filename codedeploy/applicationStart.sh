#!/bin/bash
cd /home/ubuntu/webapp
sudo kill -9 $(sudo lsof -t -i:3000)
ls -a
whoami
echo $PORT
source /etc/profile
echo $PORT
npm run prod