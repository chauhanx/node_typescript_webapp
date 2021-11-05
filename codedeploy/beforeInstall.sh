#!/bin/bash
cd /home/ubuntu
sudo rm -rf node_modules package-lock.json webapp
pm2 kill