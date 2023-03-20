#!/bin/bash

node ./scripts/different-files/transform.mjs \
  --ORIGIN './json/keycloak' \
  --DESTINATION './json/auth0'

exit 0
