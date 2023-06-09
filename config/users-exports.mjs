import args from './args.mjs'

import {
  DEFAULT_STATUS_PATH,
  DEFAULT_USERS_EXPORTS_PATH
} from './defaults.mjs'

if (!args.has('AUTH0_DOMAIN')) throw new Error('Parameter `AUTH0_DOMAIN` is required')
export const AUTH0_DOMAIN = args.get('AUTH0_DOMAIN')

if (!args.has('AUTH0_CONNECTION_ID')) throw new Error('Parameter `AUTH0_CONNECTION_ID` is required')
export const AUTH0_CONNECTION_ID = args.get('AUTH0_CONNECTION_ID')

let AUTH0_ACCESS_TOKEN_ENDPOINT
let AUTH0_CLIENT_ID
let AUTH0_CLIENT_SECRET
let AUTH0_AUDIENCE
let AUTH0_ACCESS_TOKEN

if (args.has('AUTH0_ACCESS_TOKEN_ENDPOINT')) {
  AUTH0_ACCESS_TOKEN_ENDPOINT = args.get('AUTH0_ACCESS_TOKEN_ENDPOINT')

  if (!args.has('AUTH0_CLIENT_ID')) throw new Error('Parameter `AUTH0_CLIENT_ID` is required')
  AUTH0_CLIENT_ID = args.get('AUTH0_CLIENT_ID')

  if (!args.has('AUTH0_CLIENT_SECRET')) throw new Error('Parameter `AUTH0_CLIENT_SECRET` is required')
  AUTH0_CLIENT_SECRET = args.get('AUTH0_CLIENT_SECRET')

  if (!args.has('AUTH0_AUDIENCE')) throw new Error('Parameter `AUTH0_AUDIENCE` is required')
  AUTH0_AUDIENCE = args.get('AUTH0_AUDIENCE')
} else {
  if (!args.has('AUTH0_ACCESS_TOKEN')) throw new Error('Parameter `AUTH0_ACCESS_TOKEN` is required')
  AUTH0_ACCESS_TOKEN = args.get('AUTH0_ACCESS_TOKEN')
}

export const DESTINATION = (
  args.has('DESTINATION')
    ? args.get('DESTINATION')
    : DEFAULT_STATUS_PATH
)

export const USERS_EXPORTS_PATH = (
  args.has('USERS_EXPORTS_PATH')
    ? args.get('USERS_EXPORTS_PATH')
    : DEFAULT_USERS_EXPORTS_PATH
)

export {
  AUTH0_ACCESS_TOKEN_ENDPOINT,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_AUDIENCE,
  AUTH0_ACCESS_TOKEN
}
