import {
  DOCKER_CONTAINER
} from '#config/realm-file'

export default function getCommands (commands, realmName, destination) {
  return `
docker exec ${DOCKER_CONTAINER} rm -f /opt/jboss/realm-file.sh 2> /dev/null
docker exec ${DOCKER_CONTAINER} mkdir /opt/jboss/export 2> /dev/null
docker exec -i ${DOCKER_CONTAINER} sh -c "cat > /opt/jboss/realm-file.sh" << EOF
${commands}
EOF
docker exec ${DOCKER_CONTAINER} sh /opt/jboss/realm-file.sh
docker cp ${DOCKER_CONTAINER}:/opt/jboss/export/export-${realmName}.json ${destination}/export-${realmName}.json
docker exec ${DOCKER_CONTAINER} rm -rf /opt/jboss/export
`.trim()
}
