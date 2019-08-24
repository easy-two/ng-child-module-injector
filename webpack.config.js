const merge = require('webpack-merge');
const { argv } = require('yargs');

module.exports = function (initial, opts) {
  const aot = argv.aot || opts.aot;

  return merge(initial, {
    resolve: {
      alias: {
        withCustomInjectorModule: `src/app/with-custom-injector/with-custom-injector.module${aot ? '.ngfactory' : ''}`,
        ngFactoryLoader: `src/app/ng-factory-loaders/${aot ? 'aot' : 'jit'}`
      }
    }
  });
};
