const { override, fixBabelImports } = require('customize-cra');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
     style: 'css',
  }),
);



// const {override , fixBabelImports} = require('customize-cra')

// const addOthers = () => config => {

//   // config.module.loaders.push({
//   //   test: /\.css$/,
//   //   loader: 'style-loader!css-loader?modules'
//   // })

//   return config
// }


// module.expost = {
//   webpack: override(
//     fixBabelImports("import" , {libraryName: 'antd-mobile', style:'css'}),
//     addOthers()
//   )
// }