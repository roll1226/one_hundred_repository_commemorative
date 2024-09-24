#!/bin/bash

if [ -z "$1" ]; then
  echo "\033[31mError:\033[m No Arguments"
  exit 0;
fi

env=$1
echo "\033[32mSelected:\033[m $env to backend"

rm -f ./backend/.env && echo "\033[32mRemoved:\033[m  backend/.env"

if [ $env = "Emulator" ]; then
  touch ./backend/.env && echo "$(grep ^NESTJS ./envs/.env.development.local)" >> ./backend/.env && echo "\033[32mCreated:\033[m  backend/.env"
elif [ $env = "Cloud" ]; then
  touch ./backend/.env && echo "$(grep ^NESTJS ./envs/.env.local)" >> ./backend/.env && echo "\033[32mCreated:\033[m  backend/.env"
fi
