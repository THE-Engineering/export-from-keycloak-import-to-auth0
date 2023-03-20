export default function * genUser (users) {
  let i = 0

  while (users.length) {
    const user = users.shift()

    yield {
      i,
      user
    }

    i = i + 1
  }
}
