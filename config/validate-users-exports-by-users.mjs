import args from './args.mjs'

import {
  DEFAULT_KEYCLOAK_PATH,
  DEFAULT_USERS_EXPORTS_PATH
} from './defaults.mjs'

export const ORIGIN = (
  args.has('ORIGIN')
    ? args.get('ORIGIN')
    : DEFAULT_USERS_EXPORTS_PATH
)

export const DESTINATION = (
  args.has('DESTINATION')
    ? args.get('DESTINATION')
    : '.validate/users-exports-by-users.json'
)

export const KEYCLOAK_PATH = (
  args.has('KEYCLOAK_PATH')
    ? args.get('KEYCLOAK_PATH')
    : DEFAULT_KEYCLOAK_PATH
)
