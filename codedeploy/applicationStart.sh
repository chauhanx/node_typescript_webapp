#!/bin/bash
cd /home/ubuntu/webapp
sudo kill -9 $(sudo lsof -t -i:3000)
ls -a
source /etc/profile
npm run prod