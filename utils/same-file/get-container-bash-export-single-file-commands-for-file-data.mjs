import {
  TIMEOUT
} from '#config/same-file'

// https://gist.github.com/MrHassanMurtaza/73922ce2ec5e965feec2194e309c2e6d
export default function getContainerBashExportSingleFileCommandsForFileData () { /* eslint-disable no-useless-escape */
  return `
#!/bin/bash
rm -f /opt/jboss/export.log
mkdir /opt/jboss/export 2> /dev/null
timeout ${TIMEOUT} \\
  /opt/jboss/keycloak/bin/standalone.sh \\
    -Djboss.socket.binding.port-offset=100 \\
    -Dkeycloak.migration.action=export \\
    -Dkeycloak.migration.provider=singleFile \\
    -Dkeycloak.migration.file=/opt/jboss/export/export.json \\
    -Dkeycloak.migration.usersExportStrategy=SAME_FILE \\
  > /opt/jboss/export.log &
PID=\"\${!}\"
until grep -m 1 \"Export finished successfully\" < /opt/jboss/export.log
do
  sleep 2
done
kill \${PID}
exit 0
`.trim() /* eslint-enable no-useless-escape */
}
