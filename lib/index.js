'use strict'

/**
 * Module dependencies
 */
const ftpClient = require('./ftp-client')

module.exports = {
  init: config => {
    return {
      upload: file => {
        return new Promise((resolve, reject) => {
          ftpClient
            .upload(config, file)
            .then(resolve)
            .catch(reject)
        })
      },

      delete: file => {
        return new Promise((resolve, reject) => {
          ftpClient
            .delete(config, file)
            .then(resolve)
            .catch(reject)
        })
      }
    }
  }
}
