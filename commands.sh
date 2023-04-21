rm -rf /tmp/keycloak

mkdir -p /tmp/keycloak 2> /dev/null
mkdir -p /tmp/keycloak/different-files 2> /dev/null

/opt/jboss/keycloak/bin/standalone.sh \
  -Djboss.socket.binding.port-offset=100 \
  -Dkeycloak.migration.action=export \
  -Dkeycloak.migration.provider=dir \
  -Dkeycloak.migration.dir=/tmp/keycloak/different-files \
  -Dkeycloak.migration.usersExportStrategy=DIFFERENT_FILES \
> /tmp/keycloak/different-files.log &

mkdir -p /tmp/keycloak 2> /dev/null
mkdir -p /tmp/keycloak/realm-file 2> /dev/null

/opt/jboss/keycloak/bin/standalone.sh \
  -Djboss.socket.binding.port-offset=101 \
  -Dkeycloak.migration.action=export \
  -Dkeycloak.migration.provider=singleFile \
  -Dkeycloak.migration.file=/tmp/keycloak/realm-file/export-master.json \
  -Dkeycloak.migration.realmName=master \
  -Dkeycloak.migration.usersExportStrategy=REALM_FILE \
> /tmp/keycloak/realm-file/export-master.log &

/opt/jboss/keycloak/bin/standalone.sh \
  -Djboss.socket.binding.port-offset=102 \
  -Dkeycloak.migration.action=export \
  -Dkeycloak.migration.provider=singleFile \
  -Dkeycloak.migration.file=/tmp/keycloak/realm-file/export-THE.json \
  -Dkeycloak.migration.realmName=THE \
  -Dkeycloak.migration.usersExportStrategy=REALM_FILE \
> /tmp/keycloak/realm-file/export-THE.log &

mkdir -p /tmp/keycloak 2> /dev/null
mkdir -p /tmp/keycloak/same-file 2> /dev/null

/opt/jboss/keycloak/bin/standalone.sh \
  -Djboss.socket.binding.port-offset=103 \
  -Dkeycloak.migration.action=export \
  -Dkeycloak.migration.provider=singleFile \
  -Dkeycloak.migration.file=/tmp/keycloak/same-file/export.json \
  -Dkeycloak.migration.usersExportStrategy=SAME_FILE \
> /tmp/keycloak/same-file/export.log &

rm -rf /tmp/keycloak
