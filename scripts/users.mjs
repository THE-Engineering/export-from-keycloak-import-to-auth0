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
} from '#config/users'
import getUsersFilePathList from '#utils/get-users-file-path-list'
import readFromFilePath from '#utils/read-from-file-path'
import genUser from '#utils/gen-user'
import writeToFilePath from '#utils/write-to-file-path'
import handleError from '#utils/handle-error'

function getUsers (fileData) {
  if (Array.isArray(fileData)) {
    /**
     *  `SAME_FILE`
     */
    return fileData.reduce((accumulator, { users = [] }) => accumulator.concat(users), [])
  }

  if (Reflect.has(fileData, 'users')) {
    /**
     *  `REALM_FILE` or `DIFFERENT_FILES`
     */
    return Reflect.get(fileData, 'users')
  }
}

async function app () {
  await ensureDir(dirname(ORIGIN))
  await ensureDir(dirname(DESTINATION))

  console.log('🚀')

  try {
    const filePathList = await getUsersFilePathList(ORIGIN)
    const users = []

    while (filePathList.length) {
      const filePath = filePathList.shift()
      const fileData = await readFromFilePath(filePath)
      for (const user of genUser(getUsers(fileData))) users.push(user)
    }

    await writeToFilePath(DESTINATION, users.filter(Boolean))
  } catch (e) {
    handleError(e)

    process.exit(1)
  }

  console.log('👍')
}

export default app()
