
// apollo.config.js
module.exports = {
  client: {
    service: {
      name: "my-app",
      // URL to the GraphQL API
      url: "https://eyob-todo-app.hasura.app/v1/graphql/",
    },
    // Files processed by the extension
    includes: ["src/**/*.vue", "src/**/*.js"],
  },
};
