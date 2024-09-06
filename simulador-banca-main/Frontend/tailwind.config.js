const colors = require("tailwindcss/colors");

module.exports = {
  enabled: true, // Agrega la propiedad enabled

  plugins: [require("flowbite/plugin")],

  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        azure: "#EEF5F4",
        darkGreen: "#325259",
        neutralGreen: "#038C73",
        lightGreen: "#80F2DD",
        lightGray: "#F2F2F2",
        black: colors.black,
        white: colors.white,
        darkGray: "#325259",
        DarkSlate: "#038C73",
        green: "#038C73",
        lightgreen: "#E3F2EF",
        verde: "#7DC09E",
        lightWhite: "#8B8B8B",
        beige: "#F2F5F8",
      },
      spacing: {
        128: "32rem",
      },
    },
  },

  purge: {
    content: [
      "./src/**/*.html",
      "./src/**/*.vue",
      "./src/**/*.jsx",
      "./src/**/*.js",
      // ... otras rutas de contenido
    ],
    options: {
      // Agrega excepciones para propiedades específicas
    },
  },
};
