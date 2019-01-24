export const bucketPath =
  'https://s3.us-east-2.amazonaws.com/prettynicestudio-website/sessions/'

export const getAssetPath = (session, fileName, size = 'big') =>
  `${bucketPath + session}/${size}/${fileName}.jpg`

export const decodePath = path => {
  const [session, size, fileName] = path.split('/')

  return {
    session,
    size,
    fileName,
  }
}
