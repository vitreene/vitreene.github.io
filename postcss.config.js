module.exports = (config) => [
    require("stylelint")(),
    require("postcss-cssnext")({
      browsers: ["last 2 versions", "iOS 7"],
      features: {
        customProperties: {
          variables: {
            maxWidth: "60rem",
            articlesMaxWidth: "40rem",
            colorPrimaryDark: "#004080",
            colorPrimary: "#007acc",
            colorSecondaryDark: "#22846C",
            colorSecondary: "#46BE77",
            colorNeutralDark: "#111",
            colorNeutral: "#8C8D91",
            colorNeutralLight: "#FBFCFC",
            colorText: "#555",
            colorTextTernary: "#C2482D",
            colorLogo : "#1AC2E6",
            textMenu: "#80A0C0",
            raleway: 'Raleway, "Fira Sans", "Helvetica Neue", Arial, sans-serif'

          },
        },
      },
    }),
    require("postcss-reporter")(),
    ...!config.production ? [
      require("postcss-browser-reporter")(),
    ] : [],
  ]
