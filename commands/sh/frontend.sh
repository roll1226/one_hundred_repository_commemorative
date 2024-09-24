#!/bin/bash

if [ -z "$1" ]; then
  echo "\033[31mError:\033[m No Arguments"
  exit 0;
fi

env=$1
echo "\033[32mSelected:\033[m $1 to frontend"

rm -f ./frontend/.env && echo "\033[32mRemoved:\033[m  frontend/.env"

if [ $env = "Emulator" ]; then
  touch ./frontend/.env && echo "$(grep ^NEXT_ ./envs/.env.development.local)" >> ./frontend/.env && echo "\033[32mCreated:\033[m  frontend/.env"
elif [ $env = "Cloud" ]; then
  touch ./frontend/.env && echo "$(grep ^NEXT_ ./envs/.env.local)" >> ./frontend/.env && echo "\033[32mCreated:\033[m  frontend/.env"
fi
