#!/usr/bin/env node

import {
  dirname
} from 'node:path'
import {
  ensureDir
} from 'fs-extra'
import {
  ORIGIN,
  USERS_EXPORTS_PATH,
  DESTINATION
} from '#config/validate-users-by-users-exports'
import getUsers from '#utils/same-file/get-users'
import getUsersExports from '#utils/get-users-exports'
import writeToFilePath from '#utils/write-to-file-path'
import hasUserEmail from '#utils/has-user-email'
import getUserEmail from '#utils/get-user-email'
import validate from '#utils/validate-users'
import sortById from '#utils/sort-by-id'
import handleError from '#utils/handle-error'

function toSet (usersExports) {
  return (
    new Set(
      usersExports
        .filter(hasUserEmail)
        .map((user) => getUserEmail(user).toLowerCase())
    )
  )
}

function getReduce (usersExports) {
  return function reduce (accumulator, user) {
    if (!validate(user)) accumulator.push(user)
    else {
      if (!usersExports.has(getUserEmail(user).toLowerCase())) accumulator.push(user)
    }

    return accumulator
  }
}

async function app () {
  await ensureDir(ORIGIN)
  await ensureDir(dirname(USERS_EXPORTS_PATH))
  await ensureDir(dirname(DESTINATION))

  console.log('🚀')

  try {
    const users = await getUsers(ORIGIN)
    const usersExports = await getUsersExports(USERS_EXPORTS_PATH)
    await writeToFilePath(DESTINATION, users.reduce(getReduce(toSet(usersExports)), []).sort(sortById))

    console.log('👍')
  } catch (e) {
    handleError(e)

    process.exit(1)
  }
}

export default app()
