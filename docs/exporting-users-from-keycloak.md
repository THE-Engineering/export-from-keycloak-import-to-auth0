# Exporting users from Keycloak

Refer to [export-users-from-keycloak](https://github.com/THE-Engineering/export-from-keycloak)

This application operates on a GitHub repository of Keycloak user JSON files

You will need

- A shared secret

The Keycloak user JSON files _must be_ encrypted with a shared secret

They will be decrypted by this application with the same shared secret

You will also need

- A _Git User Name_
- A _Git User Email_
- A _Git User ID_
- The _Git Repository_ where the Keycloak user JSON files are stored
- A _Personal Access Token_ to read from that repository

**Note** that you only need part of the _Git Repository_ address after `https://` (and not including it)

You should create a _fine grained Personal Access Token_ with read and write permissions _only_ for that repository

You should set `.env` environment variables before starting the application. (These values cannot be set at the command line)

```dotenv
GIT_USER_NAME='<GIT USER NAME>'
GIT_USER_EMAIL='<GIT USER EMAIL>'
GIT_USER_ID='<GIT USER ID>'
GIT_PERSONAL_ACCESS_TOKEN='<PERSONAL ACCESS TOKEN>'
GIT_REPOSITORY='<GIT REPOSITORY>'
```
