module.exports = function override(config, env) {
  // Exclude source maps for @antv/util
  config.module.rules.push({
    test: /\.js$/,
    enforce: 'pre',
    use: ['source-map-loader'],
    exclude: /node_modules\/@antv/,
  });

  // Suppress source map warnings globally
  config.ignoreWarnings = [
    /Failed to parse source map/
  ];

  return config;
};
