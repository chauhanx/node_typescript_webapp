#!/bin/sh

cd /home/ubuntu
pwd
ls -la
sudo unzip webapp.zip
ls -la
pwd
cd /home/ubuntu/webapp
source /etc/profile

touch .env
echo PORT=$PORT>>.env
echo DB_HOST=$DB_HOST>>.env
echo DB_NAME=$DB_NAME>>.env
echo DB_USER=$DB_USER>>.env
echo DB_PASS=$DB_PASS>>.env
echo SECRET_KEY=$SECRET_KEY>>.env
echo DB_DIALECT $DB_DIALECT>>.env
echo BASIC_AUTH_USER=$BASIC_AUTH_USER>>.env
echo BASIC_AUTH_PASS=$BASIC_AUTH_PASS>>.env


sudo npm install
ls -la
cat .env