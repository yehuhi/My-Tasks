const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    /[\\/]node_modules[\\/]quasar[\\/]/
  ],

  pluginOptions: {
    quasar: {
      treeShake: true,
      rtl: true
    }
  }
})
