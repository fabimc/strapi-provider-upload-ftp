# strapi-provider-upload-ftp

FTP provider for Strapi CMS file upload.

## Installation

```
yarn add strapi-provider-upload-ftp-v2
```

## Config

`./extensions/upload/config/settings.json`

```json
{
  "provider": "ftp-v2",
  "providerOptions": {
    "host": "",
    "port": "21",
    "user": "",
    "password": "",
    "basePath": "",
    "baseUrl": "",
    "sizeLimit": 1000000
  }
}
```

The `sizeLimit` parameter must be a number. Be aware that the unit is in KB. When setting this value high, you should make sure to also configure the body parser middleware `maxFileSize` so the file can be sent and processed. Read more [here](https://strapi.io/documentation/v3.x/plugins/upload.html#configuration)

## Resources

- [MIT License](LICENSE.md)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
