import {
  DOCKER_CONTAINER
} from '#config/same-file'

export default function getCommands (commands, destination) {
  return `
docker exec ${DOCKER_CONTAINER} rm -f /opt/jboss/same-file.sh 2> /dev/null
docker exec ${DOCKER_CONTAINER} mkdir /opt/jboss/export 2> /dev/null
docker exec -i ${DOCKER_CONTAINER} sh -c "cat > /opt/jboss/same-file.sh" << EOF
${commands}
EOF
docker exec ${DOCKER_CONTAINER} sh /opt/jboss/same-file.sh
docker cp ${DOCKER_CONTAINER}:/opt/jboss/export/export.json ${destination}/export.json
docker exec ${DOCKER_CONTAINER} rm -rf /opt/jboss/export
`.trim()
}
