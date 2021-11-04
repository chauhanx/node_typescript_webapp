#!/bin/bash

cd /home/ubuntu
pwd
ls -a
sudo unzip webapp.zip
ls -la
pwd
cd /home/ubuntu/webapp
source /etc/profile
sudo npm install
# sudo npm install nodemon -g
# sudo nohup nodemon >> debug.log 2>&1 &
