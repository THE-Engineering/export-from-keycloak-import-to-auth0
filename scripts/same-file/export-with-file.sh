#!/bin/bash

node ./scripts/same-file/export-with-file.mjs \
  --DOCKER_CONTAINER 'aaa-keycloak-keycloak-1' \
  --DESTINATION './json/keycloak'

exit 0
