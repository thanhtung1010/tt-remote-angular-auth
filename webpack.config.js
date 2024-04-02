const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: '@tt-auth',

  exposes: {
    './module': './src/app/app.module.ts',
  },

  // remotes: {
  //   "@tt-management": "http://localhost:8083/remoteEntry.js",
  // },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
