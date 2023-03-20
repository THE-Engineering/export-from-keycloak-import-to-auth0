#!/bin/bash

node ./scripts/realm-file/export-with-file.mjs \
  --DOCKER_CONTAINER 'aaa-keycloak-keycloak-1' \
  --KEYCLOAK_REALM_NAME 'THE' \
  --DESTINATION './json/keycloak'

exit 0
