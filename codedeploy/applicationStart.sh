#!/bin/sh
cd /home/ubuntu/webapp
sudo kill -9 $(sudo lsof -t -i:3000)
ls -a
sudo touch .env
sudo chmod 755 .env
ls -a
echo PORT=$PORT>>.env
echo DB_HOST=$DB_HOST>>.env
echo DB_NAME=$DB_NAME>>.env
echo DB_USER=$DB_USER>>.env
echo DB_PASS=$DB_PASS>>.env
echo SECRET_KEY=$SECRET_KEY>>.env
echo DB_DIALECT $DB_DIALECT>>.env
echo BASIC_AUTH_USER=$BASIC_AUTH_USER>>.env
echo BASIC_AUTH_PASS=$BASIC_AUTH_PASS>>.env
npm run prod
