const { withProjectBuildGradle } = require("@expo/config-plugins");

const newResolutionStrategyGradle = `
  buildscript {
    repositories {
      gradlePluginPortal()
    }
    dependencies {
      classpath 'gradle.plugin.com.onesignal:onesignal-gradle-plugin:[0.14.0, 0.99.99]'
    }
  }
`;

const withOneSignalGradlePluginVersion = (config, _props) => {
    return withProjectBuildGradle(config, newConfig => {
        newConfig.modResults.contents = `${newResolutionStrategyGradle.trimStart()}\n\n${newConfig.modResults.contents}`;
        return newConfig;
    });
};

exports.default = (config) => {
    return withOneSignalGradlePluginVersion(config);
};