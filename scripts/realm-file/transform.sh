#!/bin/bash

node ./scripts/realm-file/transform.mjs \
  --ORIGIN './json/keycloak/export-THE.json' \
  --DESTINATION './json/auth0'

exit 0
