#!/bin/sh

cd /home/ubuntu
pwd
ls -la
sudo unzip webapp.zip
ls -la
pwd
cd /home/ubuntu/webapp
sudo apt install build-essential
sudo npm install