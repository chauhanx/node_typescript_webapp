#!/bin/sh
cd /home/ubuntu/webapp
sudo kill -9 $(sudo lsof -t -i:3000)
npm install
npm run prod
