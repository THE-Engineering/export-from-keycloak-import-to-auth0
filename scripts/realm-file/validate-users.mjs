#!/usr/bin/env node

import {
  dirname
} from 'node:path'
import {
  ensureDir
} from 'fs-extra'
import {
  ORIGIN,
  DESTINATION
} from '#config/validate-users'
import getUsers from '#utils/realm-file/get-users'
import writeToFilePath from '#utils/write-to-file-path'
import validate from '#utils/validate-users'
import sortById from '#utils/sort-by-id'
import handleError from '#utils/handle-error'

function reduce (accumulator, user) {
  if (!validate(user)) accumulator.push(user)

  return accumulator
}

async function app () {
  await ensureDir(ORIGIN)
  await ensureDir(dirname(DESTINATION))

  console.log('🚀')

  try {
    const users = await getUsers(ORIGIN)
    await writeToFilePath(DESTINATION, users.reduce(reduce, []).sort(sortById))

    console.log('👍')
  } catch (e) {
    handleError(e)

    process.exit(1)
  }
}

export default app()
