import getUsersFilePathList from '#utils/get-users-file-path-list'
import readFromFilePath from '#utils/read-from-file-path'

function toUsers ({ users = [] }) {
  return users
}

export default async function getUsers (filePath) {
  const filePathList = await getUsersFilePathList(filePath)
  let users = []

  while (filePathList.length) {
    const filePath = filePathList.shift()
    const fileData = await readFromFilePath(filePath)
    users = users.concat(toUsers(fileData))
  }

  return users
}
