# URL Shortener
Basic URL shortening service intended for use with preten.do

## Configuration

Configurations are loaded through environment variables. `.env` files are supported

| Name                                                    | Description                                                                                                      | Optional |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------- |
| `PN_URL_SHORTENER_CONFIG_HTTP_PORT`                     | The HTTP port the server listens on                                                                              | No       |
| `PN_URL_SHORTENER_CONFIG_MONGO_CONNECTION_STRING`       | The MongoDB connection string                                                                                    | No       |
| `PN_URL_SHORTENER_CONFIG_MONGOOSE_CONNECT_OPTIONS_PATH` | Path to JSON file containing [Mongoose connection options](https://mongoosejs.com/docs/connections.html#options) | Yes      |
| `PN_URL_SHORTENER_CONFIG_ANALYTICS`                     | `true` or `false`. Defaults to `false`. Enables tracking of URL hits                                             | Yes      |