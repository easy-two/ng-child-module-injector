console.log('>> reuqires sooqa blat');
const merge = require('webpack-merge');


module.exports = function (initial, argv) {
  const { aot } = argv;

  console.log(merge(initial, {
    resolve: {
      alias: {
        withCustomInjectorModule: 'src/app/with-custom-injector/with-custom-injector.module' + (aot ? '.ngfactory' : '')
      }
    }
  }));
  return merge(initial, {
    resolve: {
      alias: {
        withCustomInjectorModule: 'src/app/with-custom-injector/with-custom-injector.module' + (aot ? '.ngfactory' : '')
      }
    }
  });
  // return initial;
};
