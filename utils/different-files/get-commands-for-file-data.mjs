import {
  DOCKER_CONTAINER
} from '#config/different-files'

export default function getCommandsForFileData (filePath, destinationDirectory, destinationParentDirectory) {
  return `
docker exec ${DOCKER_CONTAINER} rm -f /opt/jboss/different-files.sh 2> /dev/null
docker exec ${DOCKER_CONTAINER} mkdir /opt/jboss/export 2> /dev/null
docker exec ${DOCKER_CONTAINER} mkdir /opt/jboss/export/${destinationDirectory} 2> /dev/null
docker cp ${filePath} ${DOCKER_CONTAINER}:/opt/jboss/different-files.sh
docker exec ${DOCKER_CONTAINER} sh /opt/jboss/different-files.sh
docker cp ${DOCKER_CONTAINER}:/opt/jboss/export/${destinationDirectory} ${destinationParentDirectory}
docker exec ${DOCKER_CONTAINER} rm -rf /opt/jboss/export
`.trim()
}
