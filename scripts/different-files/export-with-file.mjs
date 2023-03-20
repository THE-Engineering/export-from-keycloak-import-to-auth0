#!/usr/bin/env node

import {
  ensureDir,
  remove
} from 'fs-extra'
import {
  exec
} from 'node:child_process'
import {
  writeFile,
  unlink
} from 'node:fs/promises'
import {
  basename,
  dirname
} from 'node:path'
import {
  DESTINATION
} from '#config/different-files'
import getContainerBashExportDirCommandsForFileData from '#utils/different-files/get-container-bash-export-dir-commands-for-file-data'
import getCommandsForFileData from '#utils/different-files/get-commands-for-file-data'
import handleError from '#utils/handle-error'

const FILE_PATH = './scripts/export/different-files.sh'
const DIRECTORY = './scripts/export'

async function differentFiles (filePath, destinationDirectory, destinationParentDirectory) {
  return (
    new Promise((resolve, reject) => {
      exec(
        getCommandsForFileData(filePath, destinationDirectory, destinationParentDirectory),
        (e, v = '') => {
          (!e)
            ? resolve(v.trim())
            : reject(e)
        }
      )
    })
  )
}

async function app () {
  await ensureDir(DESTINATION)

  console.log('🚀')
  try {
    const destinationDirectory = basename(DESTINATION)
    const destinationParentDirectory = dirname(DESTINATION)

    await ensureDir(DIRECTORY)
    await writeFile(FILE_PATH, getContainerBashExportDirCommandsForFileData(destinationDirectory))

    console.log('👍', await differentFiles(FILE_PATH, destinationDirectory, destinationParentDirectory))

    await unlink(FILE_PATH)
    await remove(DIRECTORY)
  } catch (e) {
    handleError(e)

    process.exit(1)
  }
}

export default app()
