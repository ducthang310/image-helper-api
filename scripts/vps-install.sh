#!/usr/bin/env bash
set -e

# update instance
yum -y update

# add nodejs to yum
curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
yum -y install nodejs

# install pm2 module globally
npm install -g foreman pm2
pm2 update

# install dependencies
npm install
