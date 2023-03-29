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

  return salt.replace(/==$/, '')
}

export function getHash (string) {
  const {
    value
  } = JSON.parse(string)

  return value.replace(/==$/, '')
}

export default function transformUser ({
  email,
  emailVerified,
  firstName,
  lastName,
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
    given_name: (firstName || '').trim(),
    family_name: (lastName || '').trim(),
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
