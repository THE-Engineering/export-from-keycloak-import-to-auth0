#!/bin/bash

set -a
source .env
set +a

source ./utils.sh

DEFAULT_KEYCLOAK_JSON_DIRECTORY=./json/keycloak
DEFAULT_AUTH0_JSON_DIRECTORY=./json/auth0
DEFAULT_AUTH0_UPSERT=true
DEFAULT_STATUS_JSON_DIRECTORY=./json/status
DEFAULT_USERS_IMPORTS_JSON_DIRECTORY=.users-imports
DEFAULT_USERS_EXPORTS_JSON_DIRECTORY=.users-exports

echo ✨

if ! has_auth0;
then
  if ! has_auth0_programmatic_token;
  then
    echo -e 1>&2 "Required environment variables must be defined (2):";
    ! has_auth0_domain && \
    echo -e 1>&2 "\033[0;31m • \033[0m\$AUTH0_DOMAIN"
    ! has_auth0_connection_id && \
    echo -e 1>&2 "\033[0;31m • \033[0m\$AUTH0_CONNECTION_ID"
    ! has_auth0_access_token && \
    echo -e 1>&2 "\033[0;31m • \033[0m\$AUTH0_ACCESS_TOKEN"

    echo 💥
    exit 2
  fi

  if ! has_auth0_manual_token;
  then
    echo -e 1>&2 "Required environment variables must be defined (3):";
    ! has_auth0_domain && \
    echo -e 1>&2 "\033[0;31m • \033[0m\$AUTH0_DOMAIN"
    ! has_auth0_connection_id && \
    echo -e 1>&2 "\033[0;31m • \033[0m\$AUTH0_CONNECTION_ID"
    ! has_auth0_client_id && \
    echo -e 1>&2 "\033[0;31m • \033[0m\$AUTH0_CLIENT_ID"
    ! has_auth0_client_secret && \
    echo -e 1>&2 "\033[0;31m • \033[0m\$AUTH0_CLIENT_SECRET"
    ! has_auth0_audience && \
    echo -e 1>&2 "\033[0;31m • \033[0m\$AUTH0_AUDIENCE"
    ! has_auth0_resource && \
    echo -e 1>&2 "\033[0;31m • \033[0m\$AUTH0_RESOURCE"

    echo 💥
    exit 3
  fi
fi

case $METHOD in
  DIFFERENT_FILES)
    if ! different_files;
    then
      echo -e 1>&2 "Required environment variables must be defined (4):"; # "Required environment variables \$DOCKER_CONTAINER_NAME \$KEYCLOAK_JSON_DIRECTORY must be defined"
      ! has_docker_container_name && \
      echo -e 1>&2 " \033[0;31m•\033[0m \$DOCKER_CONTAINER_NAME"

      echo 💥
      exit 4
    fi
    ;;

  REALM_FILE)
    if ! realm_file;
    then
      echo -e 1>&2 "Required environment variables must be defined (5)"; # "Required environment variables \$DOCKER_CONTAINER_NAME \$KEYCLOAK_JSON_DIRECTORY \$KEYCLOAK_REALM_NAME must be defined"
      ! has_docker_container_name && \
      echo -e 1>&2 " \033[0;31m•\033[0m \$DOCKER_CONTAINER_NAME"
      ! has_keycloak_realm_name && \
      echo -e 1>&2 " \033[0;31m•\033[0m \$KEYCLOAK_REALM_NAME"

      echo 💥
      exit 5
    fi
    ;;

  SAME_FILE)
    if ! same_file;
    then
      echo -e 1>&2 "Required environment variables must be defined (6)"; # "Required environment variables \$DOCKER_CONTAINER_NAME \$KEYCLOAK_JSON_DIRECTORY must be defined"
      ! has_docker_container_name && \
      echo -e 1>&2 " \033[0;31m•\033[0m \$DOCKER_CONTAINER_NAME"

      echo 💥
      exit 6
    fi
    ;;

  *)
    echo 💥
    exit 1
    ;;
esac

mkdir \
  "${KEYCLOAK_JSON_DIRECTORY-$DEFAULT_KEYCLOAK_JSON_DIRECTORY}" \
  "${AUTH0_JSON_DIRECTORY-$DEFAULT_AUTH0_JSON_DIRECTORY}" \
  "${STATUS_JSON_DIRECTORY-$DEFAULT_STATUS_JSON_DIRECTORY}" \
  "${USERS_IMPORTS_JSON_DIRECTORY-$DEFAULT_USERS_IMPORTS_JSON_DIRECTORY}" \
  "${USERS_EXPORTS_JSON_DIRECTORY-$DEFAULT_USERS_EXPORTS_JSON_DIRECTORY}" 2> /dev/null

echo Archiving files

archive_files "${KEYCLOAK_JSON_DIRECTORY-$DEFAULT_KEYCLOAK_JSON_DIRECTORY}"
archive_files "${AUTH0_JSON_DIRECTORY-$DEFAULT_AUTH0_JSON_DIRECTORY}"
archive_files "${STATUS_JSON_DIRECTORY-$DEFAULT_STATUS_JSON_DIRECTORY}"
archive_files "${USERS_IMPORTS_JSON_DIRECTORY-$DEFAULT_USERS_IMPORTS_JSON_DIRECTORY}"
archive_files "${USERS_EXPORTS_JSON_DIRECTORY-$DEFAULT_USERS_EXPORTS_JSON_DIRECTORY}"

echo Exporting users from Keycloak

case $METHOD in
  DIFFERENT_FILES)
    node ./scripts/different-files/export.mjs \
      --DOCKER_CONTAINER "$DOCKER_CONTAINER_NAME" \
      --DESTINATION "${KEYCLOAK_JSON_DIRECTORY-$DEFAULT_KEYCLOAK_JSON_DIRECTORY}"
    ;;

  REALM_FILE)
    node ./scripts/realm-file/export.mjs \
      --DOCKER_CONTAINER "$DOCKER_CONTAINER_NAME" \
      --KEYCLOAK_REALM_NAME "$KEYCLOAK_REALM_NAME" \
      --DESTINATION "${KEYCLOAK_JSON_DIRECTORY-$DEFAULT_KEYCLOAK_JSON_DIRECTORY}"
    ;;

  SAME_FILE)
    node ./scripts/same-file/export.mjs \
      --DOCKER_CONTAINER "$DOCKER_CONTAINER_NAME" \
      --DESTINATION "${KEYCLOAK_JSON_DIRECTORY-$DEFAULT_KEYCLOAK_JSON_DIRECTORY}"
    ;;

  *) exit 1;;
esac

# shellcheck disable=SC2181
if [[ $? == 0 ]];
then
  echo Transforming users

  case $METHOD in
    DIFFERENT_FILES)
      node ./scripts/different-files/transform.mjs \
        --ORIGIN "${KEYCLOAK_JSON_DIRECTORY-$DEFAULT_KEYCLOAK_JSON_DIRECTORY}" \
        --DESTINATION "${AUTH0_JSON_DIRECTORY-$DEFAULT_AUTH0_JSON_DIRECTORY}"
      ;;

    REALM_FILE)
      node ./scripts/realm-file/transform.mjs \
        --ORIGIN "${KEYCLOAK_JSON_DIRECTORY-$DEFAULT_KEYCLOAK_JSON_DIRECTORY}" \
        --DESTINATION "${AUTH0_JSON_DIRECTORY-$DEFAULT_AUTH0_JSON_DIRECTORY}"
      ;;

    SAME_FILE)
      node ./scripts/same-file/transform.mjs \
        --ORIGIN "${KEYCLOAK_JSON_DIRECTORY-$DEFAULT_KEYCLOAK_JSON_DIRECTORY}" \
        --DESTINATION "${AUTH0_JSON_DIRECTORY-$DEFAULT_AUTH0_JSON_DIRECTORY}"
      ;;

    *) exit 1;;
  esac

  # shellcheck disable=SC2181
  if [[ $? == 0 ]];
  then
    echo Importing users to Auth0

    NODE_OPTIONS=--no-warnings node ./scripts/users-imports.mjs \
      --AUTH0_DOMAIN "$AUTH0_DOMAIN" \
      --AUTH0_CONNECTION_ID "$AUTH0_CONNECTION_ID" \
      --AUTH0_CLIENT_ID "$AUTH0_CLIENT_ID" \
      --AUTH0_CLIENT_SECRET "$AUTH0_CLIENT_SECRET" \
      --AUTH0_AUDIENCE "$AUTH0_AUDIENCE" \
      --AUTH0_RESOURCE "$AUTH0_RESOURCE" \
      --AUTH0_UPSERT "${AUTH0_UPSERT-$DEFAULT_AUTH0_UPSERT}" \
      --ORIGIN "${AUTH0_JSON_DIRECTORY-$DEFAULT_AUTH0_JSON_DIRECTORY}" \
      --USERS_IMPORTS_PATH "${USERS_IMPORTS_JSON_DIRECTORY-$DEFAULT_USERS_IMPORTS_JSON_DIRECTORY}" \
      --DESTINATION "${STATUS_JSON_DIRECTORY-$DEFAULT_STATUS_JSON_DIRECTORY}"

    if
      $USERS ||
      $USERS_BY_USERS_IMPORTS ||
      $USERS_BY_USERS_EXPORTS ||
      $USERS_IMPORTS_BY_USERS_EXPORTS ||
      $USERS_EXPORTS_BY_USERS_IMPORTS ||
      $USERS_IMPORTS_BY_USERS ||
      $USERS_EXPORTS_BY_USERS;
    then
      params=()

      [[ $USERS == true ]] && params+=('-1')
      [[ $USERS_BY_USERS_IMPORTS == true ]] && params+=('-2')
      [[ $USERS_BY_USERS_EXPORTS == true ]] && params+=('-3')
      [[ $USERS_IMPORTS_BY_USERS_EXPORTS == true ]] && params+=('-4')
      [[ $USERS_EXPORTS_BY_USERS_IMPORTS == true ]] && params+=('-5')
      [[ $USERS_IMPORTS_BY_USERS == true ]] && params+=('-6')
      [[ $USERS_EXPORTS_BY_USERS == true ]] && params+=('-7')

      source ./validate.sh "${params[@]}"
    fi

    # shellcheck disable=SC2181
    if [[ $? == 0 ]];
    then
        echo 👋
      exit 0
    fi
  fi
fi

echo 💥
exit 1
