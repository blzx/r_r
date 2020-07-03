const cracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: cracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#1da57a'
                        },
                        javascriptEnabled: true,
                    }
                }
            }
        }
    ]
}