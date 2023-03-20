import args from './args.mjs'

import {
  DEFAULT_KEYCLOAK_PATH
} from './defaults.mjs'

if (!args.has('DOCKER_CONTAINER')) throw new Error('Parameter `DOCKER_CONTAINER` is required')
export const DOCKER_CONTAINER = args.get('DOCKER_CONTAINER')

if (!args.has('KEYCLOAK_REALM_NAME')) throw new Error('Parameter `KEYCLOAK_REALM_NAME` is required')
export const KEYCLOAK_REALM_NAME = args.get('KEYCLOAK_REALM_NAME')

export const TIMEOUT = (
  args.has('TIMEOUT')
    ? args.get('TIMEOUT')
    : '12h'
)

export const DESTINATION = (
  args.has('DESTINATION')
    ? args.get('DESTINATION')
    : DEFAULT_KEYCLOAK_PATH
)
