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
    config: {
      provider: "strapi-provider-upload-ftp-v2",
      providerOptions: {
        host: env("FTP_HOST"),
        port: env("FTP_PORT"),
        user: env("FTP_USER"),
        password: env("FTP_PASSWORD"),
        basePath: env("FTP_BASEPATH"),
        baseUrl: env("FTP_BASEURL"),
      },
    },
  },
});
```

Currently the Strapi middleware in charge of parsing requests needs to be configured to support file sizes larger than the default of 200MB in addition to provider options passed to the upload plugin for sizeLimit.
Read more [here](https://docs.strapi.io/developer-docs/latest/plugins/upload.html#configuration).

## Resources

- [MIT License](LICENSE.md)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
