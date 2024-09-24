#!/bin/bash

rm -f ./hasura/.env && echo "\033[32mRemoved:\033[m  hasura/.env"

touch ./hasura/.env && echo "$(grep ^HASURA_GRAPHQL_ADMIN_SECRET ./envs/.env.development.local)" >> ./hasura/.env && echo "\033[32mCreated:\033[m  hasura/.env"
