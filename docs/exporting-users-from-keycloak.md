# Exporting users from Keycloak with `export` or `export-with-file`

Keycloak has [documentation on how to export _Realms_](https://www.keycloak.org/server/importExport) which applies to versions 17 - 20

This application is for versions 15 or 16

## Different files

Note that this script expects directory paths _not_ file paths

### Export with `export`

This script applies the `-c` flag to execute shell commands from the command line

With NPM

```bash
npm run different-files:export -- \
  --DOCKER_CONTAINER '<DOCKER CONTAINER NAME>' \
  --DESTINATION '<KEYCLOAK JSON DIRECTORY>'
```

Otherwise

```bash
node ./scripts/different-files/export.mjs \
  --DOCKER_CONTAINER '<DOCKER CONTAINER NAME>' \
  --DESTINATION '<KEYCLOAK JSON DIRECTORY>'
```

### Export with `export-with-file`

This script applies the `cp` flag to create a shell script in the container

With NPM

```bash
npm run different-files:export-with-file -- \
  --DOCKER_CONTAINER '<DOCKER CONTAINER NAME>' \
  --DESTINATION '<KEYCLOAK JSON DIRECTORY>'
```

Otherwise

```bash
node ./scripts/different-files/export-with-file.mjs \
  --DOCKER_CONTAINER '<DOCKER CONTAINER NAME>' \
  --DESTINATION '<KEYCLOAK JSON DIRECTORY>'
```

## Realm file

Note that this script expects directory paths _not_ file paths

### Export with `export`

With NPM

```bash
npm run realm-file:export -- \
  --DOCKER_CONTAINER '<DOCKER CONTAINER NAME>' \
  --KEYCLOAK_REALM_NAME '<KEYCLOAK REALM NAME>' \
  --DESTINATION '<KEYCLOAK JSON DIRECTORY>'
```

Otherwise

```bash
node ./scripts/realm-file/export.mjs \
  --DOCKER_CONTAINER '<DOCKER CONTAINER NAME>' \
  --KEYCLOAK_REALM_NAME '<KEYCLOAK REALM NAME>' \
  --DESTINATION '<KEYCLOAK JSON DIRECTORY>'
```

### Export with `export-with-file`

With NPM

```bash
npm run realm-file:export-with-file -- \
  --DOCKER_CONTAINER '<DOCKER CONTAINER NAME>' \
  --KEYCLOAK_REALM_NAME '<KEYCLOAK REALM NAME>' \
  --DESTINATION '<KEYCLOAK JSON DIRECTORY>'
```

Otherwise

```bash
node ./scripts/realm-file/export-with-file.mjs \
  --DOCKER_CONTAINER '<DOCKER CONTAINER NAME>' \
  --KEYCLOAK_REALM_NAME '<KEYCLOAK REALM NAME>' \
  --DESTINATION '<KEYCLOAK JSON DIRECTORY>'
```

## Same file

Note that this script expects directory paths _not_ file paths

### Export with `export`

With NPM

```bash
npm run same-file:export -- \
  --DOCKER_CONTAINER '<DOCKER CONTAINER NAME>' \
  --DESTINATION '<KEYCLOAK JSON DIRECTORY>'
```

Otherwise

```bash
node ./scripts/same-file/export.mjs \
  --DOCKER_CONTAINER '<DOCKER CONTAINER NAME>' \
  --DESTINATION '<KEYCLOAK JSON DIRECTORY>'
```

### Export with `export-with-file`

With NPM

```bash
npm run same-file:export-with-file -- \
  --DOCKER_CONTAINER '<DOCKER CONTAINER NAME>' \
  --DESTINATION '<KEYCLOAK JSON DIRECTORY>'
```

Otherwise

```bash
node ./scripts/same-file/export-with-file.mjs \
  --DOCKER_CONTAINER '<DOCKER CONTAINER NAME>' \
  --DESTINATION '<KEYCLOAK JSON DIRECTORY>'
```
