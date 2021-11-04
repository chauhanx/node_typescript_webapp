#!/bin/sh
cd /home/ubuntu/webapp
sudo kill -9 $(sudo lsof -t -i:3000)
ls -la
sudo npm install
sleep 10
ls -la
npm run prod
