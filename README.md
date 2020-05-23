# Gen-CLI

Code generation with js.

## Configuration

Example `config.json` that contains two commands, `controller` and `service`. Calling `$ gen g controller foo` will then create the template files first if it doesn't exist, and then the destination files.
```json
{
    "controller": {
        "description": "Generates a controller",
        "prompts": [{
            "type": "input",
            "name": "name",
            "message": "Enter a name"
        }, {
            "type": "password",
            "name": "password",
            "message": "Enter a password"
        }],
        "actions": [{
                "description": "Create controller",
                "template": "templates/{{kebabCase command}}/index.js",
                "destination": "{{name}}/{{kebabCase command}}/index.js",
                "data": {
                    "msg": "static data can be passed in"
                }
            }, {
                "description": "Create controller",
                "template": "templates/{{kebabCase command}}/index.spec.js",
                "destination": "{{name}}/{{kebabCase command}}/index.spec.js"
            }
        },
        "service": {
            "name": "service",
            "actions": [{
                "name": "Create a service",
                "template": "templates/{{command}}.js",
                "destination": "{{name}}/service/index.js"
            }, {
                "name": "Create a service test",
                "template": "templates/{{command}}.spec.js",
                "destination": "{{name}}/service/index.spec.js"
            }]
        }
    }
}
```

## Usage

```bash
$ gen g <type> <name>
```

## Templating

Uses `handlebar.js` because it allows us to register helpers.


## TODO

[ ] read config from package.json, "gen"
[ ] force overwrite if exists
[ ] better UI
[ ] allow configuration of templates (passing helpers)
[ ] compile to supported js versions
[ ] a golang version
