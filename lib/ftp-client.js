'use strict'

/**
 * Module dependencies
 */
const ftp = require('ftp')

const configParser = ({
  host = '',
  port = '',
  user = '',
  password = '',
  secure = false,
  secureOptions,
  connTimeout = 10000,
  pasvTimeout = 10000,
  keepalive = 10000,
  autoReconnect = false,
  preserveCwd = false,
  baseUrl,
  basePath,
  cacheFolder
}) => ({
  host,
  port,
  user,
  password,
  secure,
  secureOptions,
  connTimeout,
  pasvTimeout,
  keepalive,
  autoReconnect,
  preserveCwd,
  baseUrl,
  basePath,
  cacheFolder
})

const fileNameComposer = (file) => `${file.hash}${file.ext}`

module.exports = {
  upload: (inputConfig, file) => {
    const client = new ftp()
    const config = configParser(inputConfig)
    const remoteFileName = fileNameComposer(file)

    return new Promise((resolve, reject) => {
      client.connect(config)
      client.on('ready', () => {
        client.append(
          file.buffer,
          `${config.basePath}${remoteFileName}`,
          (err) => {
            if (err) {
              return reject(err)
            }
            file.public_id = remoteFileName
            file.url = `${config.baseUrl}${remoteFileName}`
            resolve(client.end())
          }
        )
        client.end()
      })
      client.on('error', (err) => {
        reject(err)
      })
    })
  },

  delete: (inputConfig, file) => {
    const client = new ftp()
    const config = configParser(inputConfig)
    const remoteFileName = fileNameComposer(file)

    return new Promise((resolve, reject) => {
      client.connect(config)
      client.on('ready', () => {
        client.delete(`${config.basePath}${remoteFileName}`, (err) => {
          if (err) {
            return reject(err)
          }
          resolve(client.end())
        })
        client.end()
      })
      client.on('error', (err) => {
        reject(err)
      })
    })
  }
}
