#!/usr/bin/env node

import {
  ensureDir
} from 'fs-extra'
import {
  exec
} from 'node:child_process'
import {
  KEYCLOAK_REALM_NAME,
  DESTINATION
} from '#config/realm-file'
import getContainerBashExportSingleFileCommands from '#utils/realm-file/get-container-bash-export-single-file-commands'
import getCommands from '#utils/realm-file/get-commands'
import handleError from '#utils/handle-error'

async function realmFile (commands, realmName, destination) {
  return (
    new Promise((resolve, reject) => {
      exec(
        getCommands(commands, realmName, destination),
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
    const commands = getContainerBashExportSingleFileCommands(KEYCLOAK_REALM_NAME)

    console.log('👍', await realmFile(commands, KEYCLOAK_REALM_NAME, DESTINATION))
  } catch (e) {
    handleError(e)

    process.exit(1)
  }
}

export default app()
