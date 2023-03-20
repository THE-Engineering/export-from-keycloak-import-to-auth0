import args from './args.mjs'

import {
  DEFAULT_KEYCLOAK_PATH
} from './defaults.mjs'

export const ORIGIN = (
  args.has('ORIGIN')
    ? args.get('ORIGIN')
    : DEFAULT_KEYCLOAK_PATH
)

export const DESTINATION = (
  args.has('DESTINATION')
    ? args.get('DESTINATION')
    : '.validate/users.json'
)
