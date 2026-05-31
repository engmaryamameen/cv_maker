const themes = {
  default: {
    name: "Default",
    colors: {
      primary: "#a21caf",       // fuchsia-700 — profile border, accent color
      sectionBorder: "#d1d5db", // gray-300 — section title underlines
      toolbar: "#C026D3",       // highlight menu background
    },
  },
};

const DEFAULT_THEME = "default";

function getThemeCSSVariables(theme) {
  return {
    "--cv-primary": theme.colors.primary,
    "--cv-section-border": theme.colors.sectionBorder,
    "--cv-toolbar": theme.colors.toolbar,
  };
}

export { themes, DEFAULT_THEME, getThemeCSSVariables };
