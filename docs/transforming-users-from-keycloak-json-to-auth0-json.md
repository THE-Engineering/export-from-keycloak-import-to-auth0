# Transforming users from Keycloak JSON to Auth0 JSON with `transform`

## Different files

Note that this script expects directory paths _not_ file paths

With NPM

```bash
npm run different-files:transform -- \
  --ORIGIN '<KEYCLOAK JSON DIRECTORY>' \
  --DESTINATION '<AUTH0 JSON DIRECTORY>'
```

Otherwise

```bash
node ./scripts/different-files/transform.mjs \
  --ORIGIN '<KEYCLOAK JSON DIRECTORY>' \
  --DESTINATION '<AUTH0 JSON DIRECTORY>'
```

## Realm file

Note that this script expects a file path for the _origin_

With NPM

```bash
npm run realm-file:transform -- \
  --ORIGIN '<KEYCLOAK JSON FILE>' \
  --KEYCLOAK_REALM_NAME '<KEYCLOAK REALM NAME>' \
  --DESTINATION '<AUTH0 JSON DIRECTORY>'
```

Otherwise

```bash
node ./scripts/realm-file/transform.mjs \
  --ORIGIN '<KEYCLOAK JSON FILE>' \
  --KEYCLOAK_REALM_NAME '<KEYCLOAK REALM NAME>' \
  --DESTINATION '<AUTH0 JSON DIRECTORY>'
```

## Same file

Note that this script expects a file path for the _origin_

With NPM

```bash
npm run same-file:transform -- \
  --ORIGIN '<KEYCLOAK JSON FILE>' \
  --DESTINATION '<AUTH0 JSON DIRECTORY>'
```

Otherwise

```bash
node ./scripts/same-file/transform.mjs \
  --ORIGIN '<KEYCLOAK JSON FILE>' \
  --DESTINATION '<AUTH0 JSON DIRECTORY>'
```
