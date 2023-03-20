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
  KEYCLOAK_REALM_NAME,
  DESTINATION
} from '#config/realm-file'
import getContainerBashExportSingleFileCommandsForFileData from '#utils/realm-file/get-container-bash-export-single-file-commands-for-file-data'
import getCommandsForFileData from '#utils/realm-file/get-commands-for-file-data'
import handleError from '#utils/handle-error'

const FILE_PATH = './scripts/export/realm-file.sh'
const DIRECTORY = './scripts/export'

async function realmFile (filePath, realmName, destination) {
  return (
    new Promise((resolve, reject) => {
      exec(
        getCommandsForFileData(filePath, realmName, destination),
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
    await writeFile(FILE_PATH, getContainerBashExportSingleFileCommandsForFileData(KEYCLOAK_REALM_NAME))

    console.log('👍', await realmFile(FILE_PATH, KEYCLOAK_REALM_NAME, DESTINATION))

    await unlink(FILE_PATH)
    await remove(DIRECTORY)
  } catch (e) {
    handleError(e)

    process.exit(1)
  }
}

export default app()
