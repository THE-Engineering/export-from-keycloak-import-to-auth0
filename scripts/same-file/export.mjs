#!/usr/bin/env node

import {
  ensureDir
} from 'fs-extra'
import {
  exec
} from 'node:child_process'
import {
  DESTINATION
} from '#config/same-file'
import getContainerBashExportSingleFileCommands from '#utils/same-file/get-container-bash-export-single-file-commands'
import getCommands from '#utils/same-file/get-commands'
import handleError from '#utils/handle-error'

async function sameFile (commands, destination) {
  return (
    new Promise((resolve, reject) => {
      exec(
        getCommands(commands, destination),
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
    const commands = getContainerBashExportSingleFileCommands()

    console.log('👍', await sameFile(commands, DESTINATION))
  } catch (e) {
    handleError(e)

    process.exit(1)
  }
}

export default app()
