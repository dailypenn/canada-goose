const { withAppBuildGradle } = require("@expo/config-plugins");

const newResolutionStrategyGradle = `
  apply plugin: 'com.onesignal.androidsdk.onesignal-gradle-plugin'

  configurations.all {
    resolutionStrategy {
        force 'androidx.work:work-runtime:2.6.0'
    }
  }
`;

const withWorkingWorkRuntimeVersion = (config, _props) => {
    return withAppBuildGradle(config, newConfig => {
        newConfig.modResults.contents = `${newResolutionStrategyGradle.trimStart()}\n\n${newConfig.modResults.contents}`;
        return newConfig;
    });
};

exports.default = (config) => {
    return withWorkingWorkRuntimeVersion(config);
};