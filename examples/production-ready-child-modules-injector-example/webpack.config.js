const merge = require('webpack-merge');
const { argv } = require('yargs');
const getAliasesForChildInjectorModules = require('./precompiled-modules.config');

module.exports = function (initial, opts) {
  const aot = argv.aot || opts.aot;

  return merge(initial, {
    resolve: {
      alias: {
        ngFactoryLoader: `src/app/ng-factory-loaders/${aot ? 'aot' : 'jit'}`,
        ...getAliasesForChildInjectorModules(aot)
      }
    }
  });
};
