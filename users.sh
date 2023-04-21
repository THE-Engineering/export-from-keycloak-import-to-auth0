#!/bin/bash

set -a
source .env
set +a

source ./utils.sh

get_args "$@";

DEFAULT_USERS_JSON_FILE=./json/users.json

echo ✨

echo Archiving file

archive;

archive_file "${USERS_JSON_FILE-$DEFAULT_USERS_JSON_FILE}";

# shellcheck disable=SC2181
if [[ $? == 0 ]];
then
  echo Exporting users from Keycloak

  users;

  echo 👋
  exit 0
fi

echo 💥
exit 1
