#!/bin/bash

set -a
source .env
set +a

D=$1
d=$(mktemp -d)

boom () {
  echo 💥
  exit 1
}

git clone "https://$GIT_USER_ID:$GIT_PERSONAL_ACCESS_TOKEN@$GIT_REPOSITORY" "$d" &> /dev/null

# shellcheck disable=SC2181
if [[ $? == 0 ]];
then
  node ./scripts/users.mjs \
    --ORIGIN "$d"

  rm -rf "$d"

  # shellcheck disable=SC2181
  if [[ $? == 0 ]];
  then
    echo 🎉
    exit 0
  fi
fi

boom;
