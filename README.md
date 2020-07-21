# Gen-CLI

Code generation with js.

## Configuration

Example `config.json` that contains two commands, `controller` and `service`. Calling `$ gen g controller foo` will then create the template files first if it doesn't exist, and then the destination files. See `config.sample.json5`.


## Usage

```bash
# Initialize config file.
$ gen init

# Run the template generation.
$ gen g <type> <name>
```

## Templating

Uses `handlebar.js` because it allows us to register helpers.


## TODO

- [x] read config from package.json, "gen"
- [x] ~force overwrite if exists~ warn if exists
- [ ] better UI
- [x] allow configuration of templates (passing helpers)
- [ ] compile to supported js versions
- [ ] a golang version
