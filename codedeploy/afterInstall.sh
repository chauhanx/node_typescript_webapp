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
