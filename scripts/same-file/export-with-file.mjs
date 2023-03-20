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
  DESTINATION
} from '#config/same-file'
import getContainerBashExportSingleFileCommandsForFileData from '#utils/same-file/get-container-bash-export-single-file-commands-for-file-data'
import getCommandsForFileData from '#utils/same-file/get-commands-for-file-data'
import handleError from '#utils/handle-error'

const FILE_PATH = './scripts/export/same-file.sh'
const DIRECTORY = './scripts/export'

async function sameFile (filePath, destination) {
  return (
    new Promise((resolve, reject) => {
      exec(
        getCommandsForFileData(filePath, destination),
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
    await ensureDir(DIRECTORY)
    await writeFile(FILE_PATH, getContainerBashExportSingleFileCommandsForFileData())

    console.log('👍', await sameFile(FILE_PATH, DESTINATION))

    await unlink(FILE_PATH)
    await remove(DIRECTORY)
  } catch (e) {
    handleError(e)

    process.exit(1)
  }
}

export default app()
