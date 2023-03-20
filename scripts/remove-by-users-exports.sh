#!/bin/bash

node ./scripts/remove-by-users-exports.mjs \
  --AUTH0_DOMAIN 'dev-blqkxjd6yftz1lu3.uk.auth0.com' \
  --AUTH0_CONNECTION_ID 'con_Oz2oP7Ae52YcHlgq' \
  --AUTH0_CLIENT_ID 'Qoymh7pfy0nzg3GJWnUX9RaQs2zmtHB6' \
  --AUTH0_CLIENT_SECRET '5Fo1Gl9U9nSa-daW7_miWUdxuUnOMu745POiRWXx7Tu8lep18tpSYMGs0Vk3W9Gl' \
  --AUTH0_AUDIENCE 'https://dev-blqkxjd6yftz1lu3.uk.auth0.com/api/v2/' \
  --AUTH0_RESOURCE 'https://dev-blqkxjd6yftz1lu3.uk.auth0.com/oauth/token'

exit 0
