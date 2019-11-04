# PetraGold Knights REST API

## Setup

### Environment variables
| Name | Default |
|------|---------|
| ADDRESS | 0.0.0.0 |
| PORT | 3000 |
| MONGODB_URI | mongodb://localhost/realm |
| BASE_ATTACK | 10 |

### Requirements

 * MongoDB
 * Node.js vrs 10
 *

### Installing

```bash
npm i
```

### Testing

```bash
npm test
```

### Running for production

```bash
npm start
```

### Running for development

```bash
npm run dev
```

### Running for CI

```bash
MONGODB_URI=<uri for mongodb> npm run ci
```

## Extra

### Containers

Docker

## API Documentation

The REST API documentation is [here](https://documenter.getpostman.com/view/9352363/SW14Tw8A?version=latest).

## License
[MIT](LICENSE)