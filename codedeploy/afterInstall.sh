#!/bin/bash

cd /home/ubuntu
pwd
ls -la
sudo unzip webapp.zip
ls -la
pwd
cd /home/ubuntu/webapp
source /etc/profile
sudo npm install
