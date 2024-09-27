#!/bin/bash

if [ -z "$1" ]; then
  echo "\033[31mError:\033[m No Arguments"
  exit 0;
fi

env=$1
echo "\033[32mSelected:\033[m $1 to admin"

rm -f ./admin/.env && echo "\033[32mRemoved:\033[m  admin/.env"

if [ $env = "Emulator" ]; then
  touch ./admin/.env && echo "$(grep ^VITE_ ./envs/.env.development.local)" >> ./admin/.env && echo "\033[32mCreated:\033[m  admin/.env"
elif [ $env = "Cloud" ]; then
  touch ./admin/.env && echo "$(grep ^VITE_ ./envs/.env.local)" >> ./admin/.env && echo "\033[32mCreated:\033[m  admin/.env"
fi
