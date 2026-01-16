const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Apply NativeWind first
const configWithNativeWind = withNativeWind(config, { input: './global.css' });

// Then configure SVG support
configWithNativeWind.transformer = {
  ...configWithNativeWind.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

configWithNativeWind.resolver = {
  ...configWithNativeWind.resolver,
  assetExts: configWithNativeWind.resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...configWithNativeWind.resolver.sourceExts, 'svg'],
};

module.exports = configWithNativeWind;
