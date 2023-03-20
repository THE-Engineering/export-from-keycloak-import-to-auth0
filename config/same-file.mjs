import args from './args.mjs'

import {
  DEFAULT_KEYCLOAK_PATH
} from './defaults.mjs'

if (!args.has('DOCKER_CONTAINER')) throw new Error('Parameter `DOCKER_CONTAINER` is required')
export const DOCKER_CONTAINER = args.get('DOCKER_CONTAINER')

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
