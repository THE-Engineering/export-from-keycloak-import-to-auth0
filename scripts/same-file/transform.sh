#!/bin/bash

node ./scripts/same-file/transform.mjs \
  --ORIGIN './json/keycloak/export.json' \
  --DESTINATION './json/auth0'

exit 0
