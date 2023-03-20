#!/usr/bin/env node

import {
  dirname
} from 'node:path'
import {
  ensureDir
} from 'fs-extra'
import {
  ORIGIN,
  KEYCLOAK_PATH,
  DESTINATION
} from '#config/validate-users-imports-by-users'
import getUsersImports from '#utils/get-users-imports'
import getUsers from '#utils/same-file/get-users'
import writeToFilePath from '#utils/write-to-file-path'
import hasUserEmail from '#utils/has-user-email'
import getUserEmail from '#utils/get-user-email'
import validate from '#utils/validate-users'
import sortById from '#utils/sort-by-id'
import handleError from '#utils/handle-error'

function toSet (users) {
  return (
    new Set(
      users
        .filter(hasUserEmail)
        .map((user) => getUserEmail(user).toLowerCase())
    )
  )
}

function getReduce (users) {
  return function reduce (accumulator, user) {
    if (!validate(user)) accumulator.push(user)
    else {
      if (!users.has(getUserEmail(user).toLowerCase())) accumulator.push(user)
    }

    return accumulator
  }
}

async function app () {
  await ensureDir(ORIGIN)
  await ensureDir(KEYCLOAK_PATH)
  await ensureDir(dirname(DESTINATION))

  console.log('🚀')

  try {
    const usersImports = await getUsersImports(ORIGIN)
    const users = await getUsers(KEYCLOAK_PATH)
    await writeToFilePath(DESTINATION, usersImports.reduce(getReduce(toSet(users)), []).sort(sortById))

    console.log('👍')
  } catch (e) {
    handleError(e)

    process.exit(1)
  }
}

export default app()
