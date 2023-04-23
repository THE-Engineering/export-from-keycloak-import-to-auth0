# Exporting users from Keycloak

Refer to [export-users-from-keycloak](https://github.com/THE-Engineering/export-from-keycloak)

This application operates on a GitHub repository of Keycloak user JSON files

You will need

- A shared secret

The Keycloak user JSON files _must be_ encrypted with a shared secret

They will be decrypted by this application with the same shared secret

You will also need

- A _GitHub User Name_
- A _GitHub User Email_
- A _GitHub User ID_
- The _GitHub Repository_ where the Keycloak user JSON files are stored
- A _GitHub Personal Access Token_ to read from that repository

**Note** that you only need part of the _GitHub Repository_ address after `https://` (and not including it)

You should create a _fine grained_ Personal Access Token with read and write permissions _only_ for that repository


```dotenv
GIT_USER_NAME='<GITHUB USER NAME>'
GIT_USER_EMAIL='<GITHUB USER EMAIL>'
GIT_USER_ID='<GITHUB USER ID>'
GIT_PERSONAL_ACCESS_TOKEN='<GITHUB PERSONAL ACCESS TOKEN>'
GIT_REPOSITORY='<GITHUB REPOSITORY>'
```
