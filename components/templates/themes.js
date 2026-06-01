const themes = {
  default: {
    name: "Fuchsia",
    colors: {
      primary: "#a21caf",
      sectionBorder: "#d1d5db",
      toolbar: "#C026D3",
    },
  },
  blue: {
    name: "Blue",
    colors: {
      primary: "#1d4ed8",
      sectionBorder: "#d1d5db",
      toolbar: "#2563eb",
    },
  },
  emerald: {
    name: "Emerald",
    colors: {
      primary: "#047857",
      sectionBorder: "#d1d5db",
      toolbar: "#059669",
    },
  },
  slate: {
    name: "Slate",
    colors: {
      primary: "#334155",
      sectionBorder: "#cbd5e1",
      toolbar: "#475569",
    },
  },
  rose: {
    name: "Rose",
    colors: {
      primary: "#be123c",
      sectionBorder: "#d1d5db",
      toolbar: "#e11d48",
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
