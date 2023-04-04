# export-from-keycloak-import-to-auth0

This application exports users from Keycloak and imports them to Auth0

It is organised into _scripts_ which perform a particular task, or a series of tasks

It can be built for Docker

## Set-up

### Scripts

These documents assume that a developer is preparing their _development environment_ to perform tasks manually but much of the same configuration is required for _production_

- [Exporting users from Keycloak](docs/exporting-users-from-keycloak.md)
- [Transforming users from Keycloak JSON to Auth0 JSON](docs/transforming-users-from-keycloak-json-to-auth0-json.md)
- [Importing users to Auth0](docs/importing-users-to-auth0.md)
- [Exporting users from Auth0](docs/exporting-users-from-auth0.md)
- [Validation](docs/validation.md)

## Building the Docker image

```bash
docker build -t export-from-keycloak-import-to-auth0 .
```

## Starting the Docker container

```bash
docker compose up -d
```