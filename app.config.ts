export default {
  expo: {
    name: "halp",
    slug: "halp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      favicon: "./assets/favicon.png",
      output: "server",
    },
    extra: {
      eas: {
        projectId: "85d1b78d-d225-4ce6-aaef-08c7b6278cd9",
      },
    },
    owner: "floklein",
    plugins: [
      [
        "expo-router",
        {
          origin: process.env.EXPO_SERVER_URL,
        },
      ],
    ],
    scheme: "halp",
  },
};
