import args from './args.mjs'

import {
  DEFAULT_KEYCLOAK_PATH,
  DEFAULT_USERS_IMPORTS_PATH
} from './defaults.mjs'

export const ORIGIN = (
  args.has('ORIGIN')
    ? args.get('ORIGIN')
    : DEFAULT_USERS_IMPORTS_PATH
)

export const DESTINATION = (
  args.has('DESTINATION')
    ? args.get('DESTINATION')
    : '.validate/users-imports-by-users.json'
)

export const KEYCLOAK_PATH = (
  args.has('KEYCLOAK_PATH')
    ? args.get('KEYCLOAK_PATH')
    : DEFAULT_KEYCLOAK_PATH
)
