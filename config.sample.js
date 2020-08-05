module.exports = {
  version: "0.0.1",
  handlebars: function(handlebars) {
    handlebars.registerHelper("upper", str => str.toUpperCase());
  },
  actions: [
    {
      name: "service",
      templates: [
        {
          name: "Create a service",
          template: "templates/{{upper command}}.js",
          destination: "{{upper name}}/service/index.js"
        },
        {
          name: "Create a service test",
          template: "templates/{{upper command}}.spec.js",
          destination: "{{upper name}}/service/index.spec.js"
        }
      ]
    }
  ]
};
