#!/bin/sh

cd /home/ubuntu/l_webapp/webapp
sudo kill -9 $(sudo lsof -t -i:3000)
npm run prod