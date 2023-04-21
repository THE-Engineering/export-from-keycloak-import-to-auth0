import args from './args.mjs'

import {
  DEFAULT_USERS_PATH
} from './defaults.mjs'

if (!args.has('ORIGIN')) throw new Error('Parameter `ORIGIN` is required')
export const ORIGIN = args.get('ORIGIN')

export const DESTINATION = (
  args.has('DESTINATION')
    ? args.get('DESTINATION')
    : DEFAULT_USERS_PATH
)
