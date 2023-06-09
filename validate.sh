#!/bin/bash

set -a
source .env
set +a

source ./utils.sh

# Don't get args!

DEFAULT_USERS_JSON_FILE=./json/users.json
DEFAULT_STATUS_JSON_DIRECTORY=./json/status
DEFAULT_USERS_IMPORTS_JSON_DIRECTORY=.users-imports
DEFAULT_USERS_EXPORTS_JSON_DIRECTORY=.users-exports
DEFAULT_USERS_EXPORTS_JSON_FILE="${USERS_EXPORTS_JSON_DIRECTORY-$DEFAULT_USERS_EXPORTS_JSON_DIRECTORY}/users.json"

USERS=false
USERS_BY_USERS_IMPORTS=false
USERS_BY_USERS_EXPORTS=false
USERS_IMPORTS_BY_USERS_EXPORTS=false
USERS_EXPORTS_BY_USERS_IMPORTS=false
USERS_IMPORTS_BY_USERS=false
USERS_EXPORTS_BY_USERS=false

# Get args! Differently!

while getopts "1234567" flag
do
  case "${flag}" in
    1) USERS=true;;
    2) USERS_BY_USERS_IMPORTS=true;;
    3) USERS_BY_USERS_EXPORTS=true;;
    4) USERS_IMPORTS_BY_USERS_EXPORTS=true;;
    5) USERS_EXPORTS_BY_USERS_IMPORTS=true;;
    6) USERS_IMPORTS_BY_USERS=true;;
    7) USERS_EXPORTS_BY_USERS=true;;
    *) exit 1;;
  esac
done

echo 🛸

if
  $USERS ||
  $USERS_BY_USERS_IMPORTS ||
  $USERS_BY_USERS_EXPORTS ||
  $USERS_IMPORTS_BY_USERS_EXPORTS ||
  $USERS_EXPORTS_BY_USERS_IMPORTS ||
  $USERS_IMPORTS_BY_USERS ||
  $USERS_EXPORTS_BY_USERS;
then
  mkdir \
    "${STATUS_JSON_DIRECTORY-$DEFAULT_STATUS_JSON_DIRECTORY}" \
    "${USERS_IMPORTS_JSON_DIRECTORY-$DEFAULT_USERS_IMPORTS_JSON_DIRECTORY}" \
    "${USERS_EXPORTS_JSON_DIRECTORY-$DEFAULT_USERS_EXPORTS_JSON_DIRECTORY}" \
    .validate 2> /dev/null

  echo Archiving files

  archive_files "${STATUS_JSON_DIRECTORY-$DEFAULT_STATUS_JSON_DIRECTORY}";
  archive_files "${USERS_IMPORTS_JSON_DIRECTORY-$DEFAULT_USERS_IMPORTS_JSON_DIRECTORY}";
  archive_files "${USERS_EXPORTS_JSON_DIRECTORY-$DEFAULT_USERS_EXPORTS_JSON_DIRECTORY}";
  archive_files .validate;

  users;

  if
    $USERS_BY_USERS_IMPORTS ||
    $USERS_BY_USERS_EXPORTS ||
    $USERS_IMPORTS_BY_USERS_EXPORTS ||
    $USERS_EXPORTS_BY_USERS_IMPORTS ||
    $USERS_IMPORTS_BY_USERS ||
    $USERS_EXPORTS_BY_USERS;
  then
    echo Exporting users from Auth0

    users_exports;

    # shellcheck disable=SC2181
    if [[ $? == 0 ]];
    then
      if [[ ! -f "${USERS_EXPORTS_JSON_FILE-$DEFAULT_USERS_EXPORTS_JSON_FILE}" ]];
      then
        # shellcheck disable=SC2016
        echo Run "./users-exports.sh"
        exit 1
      fi
    fi
  fi

  if $USERS;
  then
    echo -e "Validating users \033[0;90m1\033[0m" # 1

    # 1. Structure
    node ./scripts/validate-users.mjs \
      --ORIGIN "${USERS_JSON_FILE-$DEFAULT_USERS_JSON_FILE}" \
      --DESTINATION .validate/users.json
  fi

  if $USERS_BY_USERS_IMPORTS;
  then
    echo -e "Validating users by users imports \033[0;90m2\033[0m" # 2

    # 2. Users not in users imports (not dispatched to Auth0)
    node ./scripts/validate-users-by-users-imports.mjs \
      --ORIGIN "${USERS_JSON_FILE-$DEFAULT_USERS_JSON_FILE}" \
      --USERS_IMPORTS_PATH "${USERS_IMPORTS_JSON_DIRECTORY-$DEFAULT_USERS_IMPORTS_JSON_DIRECTORY}" \
      --DESTINATION .validate/users-by-users-imports.json
  fi

  if $USERS_BY_USERS_EXPORTS;
  then
    echo -e "Validating users by users exports \033[0;90m3\033[0m" # 3

    # 3. Users not in users exports (not retrieved from Auth0. Exceptions)
    node ./scripts/validate-users-by-users-exports.mjs \
      --ORIGIN "${USERS_JSON_FILE-$DEFAULT_USERS_JSON_FILE}" \
      --USERS_EXPORTS_PATH "${USERS_EXPORTS_JSON_FILE-$DEFAULT_USERS_EXPORTS_JSON_FILE}" \
      --DESTINATION .validate/users-by-users-exports.json
  fi

  if $USERS_IMPORTS_BY_USERS_EXPORTS;
  then
    echo -e "Validating users imports by users exports \033[0;90m4\033[0m" # 4

    # 4. Users in users imports but not in users exports (dispatched to Auth0 but not retrieved from Auth0)
    node ./scripts/validate-users-imports-by-users-exports.mjs \
      --ORIGIN "${USERS_IMPORTS_JSON_DIRECTORY-$DEFAULT_USERS_IMPORTS_JSON_DIRECTORY}" \
      --USERS_EXPORTS_PATH "${USERS_EXPORTS_JSON_FILE-$DEFAULT_USERS_EXPORTS_JSON_FILE}" \
      --DESTINATION .validate/users-imports-by-users-exports.json
  fi

  if $USERS_EXPORTS_BY_USERS_IMPORTS;
  then
    echo -e "Validating users exports by users imports \033[0;90m5\033[0m" # 5

    # 5. Users in users exports but not in users imports (retrieved from Auth0 but not Keycloak users)
    node ./scripts/validate-users-exports-by-users-imports.mjs \
      --ORIGIN "${USERS_EXPORTS_JSON_FILE-$DEFAULT_USERS_EXPORTS_JSON_FILE}" \
      --USERS_IMPORTS_PATH "${USERS_IMPORTS_JSON_DIRECTORY-$DEFAULT_USERS_IMPORTS_JSON_DIRECTORY}" \
      --DESTINATION .validate/users-exports-by-users-imports.json
  fi

  if $USERS_IMPORTS_BY_USERS;
  then
    echo -e "Validating users imports by users \033[0;90m6\033[0m" # 6

    # 6. Users in users imports but not in users (This should be impossible)
    node ./scripts/validate-users-imports-by-users.mjs \
      --ORIGIN "${USERS_IMPORTS_JSON_DIRECTORY-$DEFAULT_USERS_IMPORTS_JSON_DIRECTORY}" \
      --USERS_PATH "${USERS_JSON_FILE-$DEFAULT_USERS_JSON_FILE}" \
      --DESTINATION .validate/users-imports-by-users.json
  fi

  if $USERS_EXPORTS_BY_USERS;
  then
    echo -e "Validating users exports by users \033[0;90m7\033[0m" # 7

    # 7. Users in users exports but not in users (retrieved from Auth0 but not Keycloak users)
    node ./scripts/validate-users-exports-by-users.mjs \
      --ORIGIN "${USERS_EXPORTS_JSON_FILE-$DEFAULT_USERS_EXPORTS_JSON_FILE}" \
      --USERS_PATH "${USERS_JSON_FILE-$DEFAULT_USERS_JSON_FILE}" \
      --DESTINATION .validate/users-exports-by-users.json
  fi

  # shellcheck disable=SC2181
  if [[ $? == 0 ]];
  then
    if has_git_lfs;
    then
      # Git LFS is configured

      bash ./git-lfs.sh "$PWD"
    else
      # Git LFS or Git is not configured

      ! has_git_user_id && \
      echo -e " \033[0;33m•\033[0m No \033[0;93m\$GIT_USER_ID\033[0m"
      ! has_git_user_name && \
      echo -e " \033[0;33m•\033[0m No \033[0;93m\$GIT_USER_NAME\033[0m"
      ! has_git_user_email && \
      echo -e " \033[0;33m•\033[0m No \033[0;93m\$GIT_USER_EMAIL\033[0m"
      ! has_git_lfs_personal_access_token && \
      echo -e " \033[0;33m•\033[0m No \033[0;93m\$GIT_LFS_PERSONAL_ACCESS_TOKEN\033[0m"
      ! has_git_lfs_repo && \
      echo -e " \033[0;33m•\033[0m No \033[0;93m\$GIT_LFS_REPOSITORY\033[0m"
    fi

    echo 👋
    exit 0
  fi
else
  echo 💩
  exit 1
fi

echo 💥
exit 1
