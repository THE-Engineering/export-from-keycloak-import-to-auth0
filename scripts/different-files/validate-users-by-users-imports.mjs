#!/usr/bin/env node

import {
  dirname
} from 'node:path'
import {
  ensureDir
} from 'fs-extra'
import {
  ORIGIN,
  USERS_IMPORTS_PATH,
  DESTINATION
} from '#config/validate-users-by-users-imports'
import getUsers from '#utils/different-files/get-users'
import getUsersImports from '#utils/get-users-imports'
import writeToFilePath from '#utils/write-to-file-path'
import hasUserEmail from '#utils/has-user-email'
import getUserEmail from '#utils/get-user-email'
import validate from '#utils/validate-users'
import sortById from '#utils/sort-by-id'
import handleError from '#utils/handle-error'

function toSet (usersImports) {
  return (
    new Set(
      usersImports
        .filter(hasUserEmail)
        .map((user) => getUserEmail(user).toLowerCase())
    )
  )
}

function getReduce (usersImports) {
  return function reduce (accumulator, user) {
    if (!validate(user)) accumulator.push(user)
    else {
      if (!usersImports.has(getUserEmail(user).toLowerCase())) accumulator.push(user)
    }

    return accumulator
  }
}

async function app () {
  await ensureDir(ORIGIN)
  await ensureDir(USERS_IMPORTS_PATH)
  await ensureDir(dirname(DESTINATION))

  console.log('🚀')

  try {
    const users = await getUsers(ORIGIN)
    const usersImports = await getUsersImports(USERS_IMPORTS_PATH)
    await writeToFilePath(DESTINATION, users.reduce(getReduce(toSet(usersImports)), []).sort(sortById))

    console.log('👍')
  } catch (e) {
    handleError(e)

    process.exit(1)
  }
}

export default app()
