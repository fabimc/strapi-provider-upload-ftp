# strapi-provider-upload-ftp-v2

FTP provider for Strapi CMS file upload.

## Installation

```
yarn add strapi-provider-upload-ftp-v2
```

## Config

`./config/plugins.js`

```
module.exports = ({ env }) => ({
  upload: {
    provider: 'ftp-v2',
    providerOptions: {
      host: env('FTP_HOST'),
      port: env('FTP_PORT'),
      user: env('FTP_USER'),
      password: env('FTP_PASSWORD'),
      basePath: env('FTP_BASEPATH'),
      baseUrl: env('FTP_BASEURL'),
    },
  },
});
```

Currently the Strapi middleware in charge of parsing request needs to be configured to support bigger file sizes if you need to upload file with a size greater than 200MB.

The library we use is koa-body, and itself uses the node-formidable library to process files.

You can pass configuration to the middleware directly by setting it in the parser middleware configuration:

```
{
  "parser": {
    "enabled": true,
    "multipart": true,
    "formidable": {
      "maxFileSize": 20000000 // defaults to 200mb
    }
  }
}
```
Read more [here](https://strapi.io/documentation/v3.x/plugins/upload.html#upload)

## Resources

- [MIT License](LICENSE.md)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
