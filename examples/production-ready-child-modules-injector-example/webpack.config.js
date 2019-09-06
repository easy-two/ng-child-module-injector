const { AngularCompilerPlugin } = require('@ngtools/webpack');
const { ngModulePathTransformer } = require('./transformers');

module.exports = function (initial) {
  const AngularCompilerPluginInstance = initial.plugins.find(plugin => plugin instanceof AngularCompilerPlugin);

  const defaultsTransformers = AngularCompilerPluginInstance._transformers;
  AngularCompilerPluginInstance._transformers = [ngModulePathTransformer(), ...defaultsTransformers];

  return initial;
};
