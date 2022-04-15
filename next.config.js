module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    config.resolve.preferRelative = true
    return config;
  },
  webpackDevMiddleware: (config) => {
    return config;
  },
};