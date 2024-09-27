#!/bin/bash

if [ -z "$1" ]; then
  echo "\033[31mError:\033[m No Arguments"
  exit 0;
fi

env=$1
echo "\033[32mSelected:\033[m $1 to user"

rm -f ./user/.env && echo "\033[32mRemoved:\033[m  user/.env"

if [ $env = "Emulator" ]; then
  touch ./user/.env && echo "$(grep ^VITE_ ./envs/.env.development.local)" >> ./user/.env && echo "\033[32mCreated:\033[m  user/.env"
elif [ $env = "Cloud" ]; then
  touch ./user/.env && echo "$(grep ^VITE_ ./envs/.env.local)" >> ./user/.env && echo "\033[32mCreated:\033[m  user/.env"
fi
