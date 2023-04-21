const PATTERN = /={1,2}$/

export function getAlgorithm (string) {
  const {
    algorithm
  } = JSON.parse(string)

  return algorithm
}

export function getHashIterations (string) {
  const {
    hashIterations
  } = JSON.parse(string)

  return hashIterations
}

export function getSalt (string) {
  const {
    salt
  } = JSON.parse(string)

  return salt.replace(PATTERN, '')
}

export function getHash (string) {
  const {
    value
  } = JSON.parse(string)

  return value.replace(PATTERN, '')
}

export default function transformUser ({
  email,
  emailVerified,
  firstName: givenName,
  lastName: familyName,
  credentials: [
    {
      secretData,
      credentialData
    } = {}
  ] = [],
  id
}) {
  return {
    email,
    email_verified: emailVerified,
    given_name: (givenName || '').trim(),
    family_name: (familyName || '').trim(),
    custom_password_hash: {
      algorithm: 'pbkdf2',
      hash: {
        value: `$${getAlgorithm(credentialData)}$i=${getHashIterations(credentialData)},l=64$${getSalt(secretData)}$${getHash(secretData)}`
      }
    },
    user_metadata: {
      origin: 'keycloak',
      id
    }
  }
}
