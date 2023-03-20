#!/usr/bin/env node

import {
  ensureDir
} from 'fs-extra'
import {
  exec
} from 'node:child_process'
import {
  basename,
  dirname
} from 'node:path'
import {
  DESTINATION
} from '#config/different-files'
import getContainerBashExportDirCommands from '#utils/different-files/get-container-bash-export-dir-commands'
import getCommands from '#utils/different-files/get-commands'
import handleError from '#utils/handle-error'

async function differentFiles (commands, destinationDirectory, destinationParentDirectory) {
  return (
    new Promise((resolve, reject) => {
      exec(
        getCommands(commands, destinationDirectory, destinationParentDirectory),
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
    const commands = getContainerBashExportDirCommands(destinationDirectory, destinationParentDirectory)

    console.log('👍', await differentFiles(commands, destinationDirectory, destinationParentDirectory))
  } catch (e) {
    handleError(e)

    process.exit(1)
  }
}

export default app()
