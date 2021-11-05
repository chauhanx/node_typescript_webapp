#!/bin/bash
cd /home/ubuntu/webapp
sudo kill -9 $(sudo lsof -t -i:3000)
ls -a
source /etc/profile

ls -a

# ./node_modules/.bin/pm2 start src/app.ts --watch

# ./node_modules/.bin/pm2 start src/app.ts --watch

# export NODE_OPTIONS="--max-old-space-size=4096"
# npm run build
# npm run start

# ./node_modules/.bin/pm2  start src/app.ts --max-old-space-size=4096 --name webapp  
# sudo NODE_OPTIONS="--max-old-space-size=4096" forever start ./forever/prod.json
# ./node_modules/.bin/pm2  start src/app.ts  --name webapp
pm2 start dist/src/app.js
pm2 startup systemd

# pm2 startup systemd
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
# sudo pm2 start src/app.ts
# sudo pm2 startup systemd
