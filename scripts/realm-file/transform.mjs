#!/usr/bin/env node

import {
  ensureDir
} from 'fs-extra'
import {
  ORIGIN,
  DESTINATION
} from '#config/transform'
import getUsersFilePathList from '#utils/get-users-file-path-list'
import readFromFilePath from '#utils/read-from-file-path'
// import getFileName from '#utils/get-file-name'
import transformUsers from '#utils/transform-users'
import genUser from '#utils/gen-user'
import toFilePathWithIndex from '#utils/to-file-path-with-index'
import writeToFilePath from '#utils/write-to-file-path'
import handleError from '#utils/handle-error'

function toUsers ({ users = [] }) {
  return users
}

const FILE_PATH = /export-.+\.json$/

async function app () {
  await ensureDir(ORIGIN)
  await ensureDir(DESTINATION)

  console.log('🚀')

  try {
    const filePathList = (await getUsersFilePathList(ORIGIN))
      .filter((filePath) => FILE_PATH.test(filePath))
    while (filePathList.length) {
      const filePath = filePathList.shift()
      const fileData = await readFromFilePath(filePath)

      // console.log(`👉 ${getFileName(filePath)}`)

      for (const { i, user } of genUser(transformUsers(toUsers(fileData)))) {
        await writeToFilePath(toFilePathWithIndex(filePath, DESTINATION, i), user)
      }
    }

    console.log('👍')
  } catch (e) {
    handleError(e)

    process.exit(1)
  }
}

export default app()
