#!/bin/bash

cd /home/ubuntu
pwd
ls -a
sudo unzip webapp.zip
pwd
cd /home/ubuntu/webapp
sudo npm install
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/home/ubuntu/webapp/cloudwatch-config.json -s

