import transformUser from '#utils/transform-user'

function reduceUsers (accumulator, user) {
  const {
    credentials: [
      credential
    ] = [] // admin user does not expose `credentials`
  } = user

  return (
    credential
      ? accumulator.concat(transformUser(user))
      : accumulator
  )
}

export default function transformUsers (users) {
  return users.reduce(reduceUsers, [])
}
