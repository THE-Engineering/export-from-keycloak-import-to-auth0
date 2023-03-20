#!/bin/bash

has_docker_container_name () {
  if [[ -z "$DOCKER_CONTAINER_NAME" ]];
  then
    false
  fi
}

has_keycloak_realm_name () {
  if [[ -z "$KEYCLOAK_REALM_NAME" ]];
  then
    false
  fi
}

has_auth0_domain () {
  if [[ -z "$AUTH0_DOMAIN" ]];
  then
    false
  fi
}

has_auth0_connection_id () {
  if [[ -z "$AUTH0_CONNECTION_ID" ]];
  then
    false
  fi
}

has_auth0_client_id () {
  if [[ -z "$AUTH0_CLIENT_ID" ]];
  then
    false
  fi
}

has_auth0_client_secret () {
  if [[ -z "$AUTH0_CLIENT_SECRET" ]];
  then
    false
  fi
}

has_auth0_audience () {
  if [[ -z "$AUTH0_AUDIENCE" ]];
  then
    false
  fi
}

has_auth0_resource () {
  if [[ -z "$AUTH0_RESOURCE" ]];
  then
    false
  fi
}

has_auth0_access_token () {
  if [[ -z "$AUTH0_ACCESS_TOKEN" ]];
  then
    false
  fi
}

has_auth0_manual_token () {
  if ! has_auth0_domain || ! has_auth0_connection_id || ! has_auth0_access_token;
  then
    false
  fi
}

has_auth0_programmatic_token () {
  if ! has_auth0_domain || ! has_auth0_connection_id || ! has_auth0_client_id || ! has_auth0_client_secret || ! has_auth0_audience || ! has_auth0_resource;
  then
    false
  fi
}

has_auth0 () {
  if ! has_auth0_access_token;
  then
    if ! has_auth0_programmatic_token
    then
      false
    fi
  else
    if ! has_auth0_manual_token;
    then
      false
    fi
  fi
}

different_files () {
  if ! has_docker_container_name;
  then
    false
  fi
}

realm_file () {
  if ! has_docker_container_name || ! has_keycloak_realm_name;
  then
    false
  fi
}

same_file () {
  if ! has_docker_container_name;
  then
    false
  fi
}

archive_files () {
  file_count=$(find "$1" -name "*.json" 2> /dev/null | wc -l | xargs)

  if [ "$file_count" -gt 0 ];
  then
    current_date=$(date '+%Y-%m-%d')
    n=1
    archive_directory="$current_date-$n" # archive directory name

    while [ -d "$1/$archive_directory" ] # while archive directory name exists
    do
      ((n++)) # bash compliant versus n=$((n + 1)) posix compliant increment
      archive_directory="$current_date-$n" # archive directory name
    done

    mkdir -p "$1/$archive_directory"
    mv "$1"/*.json "$1/$archive_directory" 2> /dev/null
  fi
}
