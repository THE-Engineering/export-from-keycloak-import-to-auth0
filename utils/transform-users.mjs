import transformUser from './transform-user.mjs'

function reduceUsers (accumulator, user) {
  const {
    credentials: [
      credential
    ] = [] // admin user does not expose `credentials`
  } = user

  if (credential) accumulator.push(transformUser(user))
  return accumulator
}

export default function transformUsers (users = []) {
  return (
    users.reduce(reduceUsers, [])
  )
}
