const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('./combinedTransformer.js'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
        nonInlinedRequires: [
          "@react-native-async-storage/async-storage",
          'React',
          'react',
          'react-native',
        ],
      },
    }),
  };

  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg' && ext !== 'scss'),
    sourceExts: [...resolver.sourceExts, 'svg', 'scss', 'sass'],
  };

  return config;
})();