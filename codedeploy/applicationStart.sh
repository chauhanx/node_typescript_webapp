#!/bin/sh
cd /home/ubuntu/webapp
sudo kill -9 $(sudo lsof -t -i:3000)
ls -a
sudo touch .env
sudo chmod 777 .env
ls -a
sudo echo PORT=$PORT>>.env
sudo echo DB_HOST=$DB_HOST>>.env
sudo echo DB_NAME=$DB_NAME>>.env
sudo echo DB_USER=$DB_USER>>.env
sudo echo DB_PASS=$DB_PASS>>.env
sudo echo SECRET_KEY=$SECRET_KEY>>.env
sudo echo DB_DIALECT $DB_DIALECT>>.env
sudo echo BASIC_AUTH_USER=$BASIC_AUTH_USER>>.env
sudo echo BASIC_AUTH_PASS=$BASIC_AUTH_PASS>>.env
npm run prod
