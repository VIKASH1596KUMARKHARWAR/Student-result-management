module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            // Exclude source map warnings for @antv/util
            webpackConfig.module.rules.push({
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
                exclude: [/node_modules\/@antv\/util/],
            });

            // Ignore all source map related warnings
            webpackConfig.ignoreWarnings = [
                /Failed to parse source map/
            ];

            return webpackConfig;
        },
    },
};
