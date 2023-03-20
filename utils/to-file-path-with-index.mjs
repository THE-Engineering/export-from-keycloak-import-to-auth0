import {
  parse,
  join
} from 'node:path'

export default function toFilePathWithIndex (fromFilePath, toDirectoryPath, index) {
  const {
    name
  } = parse(fromFilePath)

  return join(
    toDirectoryPath,
    `${name}-${index}.json`
  )
}
