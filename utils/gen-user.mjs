export default function * genUser (users = []) {
  const USERS = users.filter(Boolean)
  while (USERS.length) yield USERS.shift()
}
