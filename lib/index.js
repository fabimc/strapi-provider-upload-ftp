'use strict'

/**
 * Module dependencies
 */
const ftpClient = require('./ftp-client')

module.exports = {
  init: (config) => {
    const sizeLimit = config.sizeLimit || 1000000

    const verifySize = (file) => {
      if (file.size > sizeLimit) {
        throw new Error('File size is too large.')
      }
    }

    return {
      upload: (file) => {
        verifySize(file)
        return new Promise((resolve, reject) => {
          ftpClient.upload(config, file).then(resolve).catch(reject)
        })
      },

      delete: (file) => {
        return new Promise((resolve, reject) => {
          ftpClient.delete(config, file).then(resolve).catch(reject)
        })
      }
    }
  }
}
