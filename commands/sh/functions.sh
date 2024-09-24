if [ -z "$1" ]; then
  echo "\033[31mError:\033[m No Arguments"
  exit 0;
fi

env=$1
echo "\033[32mSelected:\033[m $env to functions"

rm -f ./functions/.env && echo "\033[32mRemoved:\033[m  functions/.env"

if [ $env = "Emulator" ]; then
  touch ./functions/.env && echo "$(grep ^FUNCTIONS_ ./envs/.env.development.local)" >> ./functions/.env && echo "\033[32mCreated:\033[m  functions/.env"
elif [ $env = "Cloud" ]; then
  touch ./functions/.env && echo "$(grep ^FUNCTIONS_ ./envs/.env.local)" >> ./functions/.env && echo "\033[32mCreated:\033[m  functions/.env"
fi
