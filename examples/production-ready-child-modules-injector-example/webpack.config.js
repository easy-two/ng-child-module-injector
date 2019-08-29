const merge = require('webpack-merge');
const { argv } = require('yargs');
const getAliasesForChildInjectorModules = require('./precompiled-modules.config');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const { ngModulePathTransformer } = require('./transformers');

module.exports = function (initial, opts) {
  const aot = argv.aot || opts.aot;
  const AngularCompilerPluginInstance = initial.plugins.find(plugin => plugin instanceof AngularCompilerPlugin);

  const defaultsTransformers = AngularCompilerPluginInstance._transformers;
  AngularCompilerPluginInstance._transformers = [ngModulePathTransformer, ...defaultsTransformers];

  return merge(initial, {
    resolve: {
      alias: {
        ngFactoryLoader: `src/app/ng-factory-loaders/${aot ? 'aot' : 'jit'}`,
        ...getAliasesForChildInjectorModules(aot)
      }
    }
  });
};
