# export-from-keycloak-import-to-auth0

## Building the Docker image

```bash
docker build -t export-from-keycloak-import-to-auth0 .
```

## Starting the Docker container

```bash
docker compose up -d
```

- [Exporting users from Keycloak](docs/exporting-users-from-keycloak.md)
- [Transforming users from Keycloak JSON to Auth0 JSON](docs/transforming-users-from-keycloak-json-to-auth0-json.md)
- [Importing users to Auth0](docs/importing-users-to-auth0.md)
- [Exporting users from Auth0](docs/exporting-users-from-auth0.md)
- [Validation](docs/validation.md)
