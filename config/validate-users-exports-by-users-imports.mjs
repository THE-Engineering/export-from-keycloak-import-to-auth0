import args from './args.mjs'

import {
  DEFAULT_USERS_EXPORTS_PATH,
  DEFAULT_USERS_IMPORTS_PATH
} from './defaults.mjs'

export const ORIGIN = (
  args.has('ORIGIN')
    ? args.get('ORIGIN')
    : DEFAULT_USERS_EXPORTS_PATH
)

export const DESTINATION = (
  args.has('DESTINATION')
    ? args.get('DESTINATION')
    : '.validate/users-exports-by-users-imports.json'
)

export const USERS_IMPORTS_PATH = (
  args.has('USERS_IMPORTS_PATH')
    ? args.get('USERS_IMPORTS_PATH')
    : DEFAULT_USERS_IMPORTS_PATH
)
