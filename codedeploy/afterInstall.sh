#!/bin/bash

cd /home/ubuntu
pwd
ls -a
sudo unzip webapp.zip
pwd
cd /home/ubuntu/webapp
sudo npm install
# sudo npm i pm2
# sudo ./node_modules/.bin/pm2 install typescript
# sudo npm install -g typescript
# sudo npm install -g ts-node
echo "**************************************************************"
# mkdir /home/ubuntu/logs
sudo npm install nodemon -g
sudo nohup nodemon >> debug.log 2>&1 &
sudo apt install node-typescript
