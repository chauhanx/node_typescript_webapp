#!/bin/sh

cd /home/ubuntu
pwd
mkdir l_webapp
mv webapp /home/ubuntu/l_webapp/
pwd
cd /home/ubuntu/l_webapp/webapp
pwd
npm install
npm test