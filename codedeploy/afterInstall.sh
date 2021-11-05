#!/bin/bash

cd /home/ubuntu
pwd
ls -a
sudo unzip webapp.zip
pwd
cd /home/ubuntu/webapp
sudo npm install
sudo npm install nodemon -g
sudo nohup nodemon >> debug.log 2>&1 &
