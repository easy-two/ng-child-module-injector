const { childInjectorModuleTransformer } = require('@easy-two/ngx-child-injector-transformer');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

module.exports = function (initial) {
  const AngularCompilerPluginInstance = initial.plugins.find(plugin => plugin instanceof AngularCompilerPlugin);

  const defaultsTransformers = AngularCompilerPluginInstance._transformers;
  AngularCompilerPluginInstance._transformers = [childInjectorModuleTransformer(), ...defaultsTransformers];

  return initial;
};
