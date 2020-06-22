'use strict'

/**
 * Module dependencies
 */

// Public node modules.
const fs = require('fs')
const path = require('path')
const FTP = require('ftp')

module.exports = {
  init (config = { sizeLimit: 1000000 }) {
    const { host, port, user, password, baseUrl, basePath, sizeLimit } = config
    const verifySize = file => {
      if (file.size > sizeLimit) {
        throw strapi.errors.badRequest('FileToBig', {
          errors: [
            {
              id: 'Upload.status.sizeLimit',
              message: `${file.name} file is bigger than limit size!`,
              values: { file: file.name }
            }
          ]
        })
      }
    }

    const getFTPConnection = new Promise((resolve, reject) => {
      const ftp = new FTP()

      ftp.connect({
        host,
        port,
        user,
        password
      })

      ftp.on('ready', () => {
        resolve(ftp)
      })

      ftp.on('error', err => {
        reject(err)
      })
    })

    return {
      upload (file) {
        verifySize(file)
        return new Promise((resolve, reject) => {
          getFTPConnection
            .then(ftp => {
              ftp.append(
                file.buffer,
                `${basePath}${file.hash}${file.ext}`,
                err => {
                  if (err) {
                    return reject(err)
                  }
                  file.url = `${baseUrl}${file.hash}${file.ext}`
                  // ftp.end()
                  resolve()
                }
              )
            })
            .catch(err => {
              reject(err)
            })
        })
      },
      delete (file) {
        return new Promise((resolve, reject) => {
          getFTPConnection
            .then(ftp => {
              ftp.delete(`${basePath}${file.hash}${file.ext}`, err => {
                if (err) {
                  return reject(err)
                }
                // ftp.end()
                resolve()
              })
            })
            .catch(err => {
              reject(err)
            })
        })
      }
    }
  }
}
