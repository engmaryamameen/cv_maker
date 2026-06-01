const fonts = [
  { id: "default", name: "Sans Serif", family: "sans-serif" },
  { id: "inter", name: "Inter", family: "'Inter', sans-serif" },
  { id: "roboto", name: "Roboto", family: "'Roboto', sans-serif" },
  { id: "lato", name: "Lato", family: "'Lato', sans-serif" },
  { id: "open-sans", name: "Open Sans", family: "'Open Sans', sans-serif" },
  { id: "poppins", name: "Poppins", family: "'Poppins', sans-serif" },
  { id: "raleway", name: "Raleway", family: "'Raleway', sans-serif" },
  { id: "merriweather", name: "Merriweather", family: "'Merriweather', serif" },
  { id: "playfair", name: "Playfair Display", family: "'Playfair Display', serif" },
  { id: "georgia", name: "Georgia", family: "Georgia, serif" },
  { id: "times", name: "Times New Roman", family: "'Times New Roman', serif" },
];

const DEFAULT_FONT = "default";

function getGoogleFontsURL(fontId) {
  const googleFonts = {
    inter: "Inter:wght@400;500;600;700",
    roboto: "Roboto:wght@400;500;700",
    lato: "Lato:wght@400;700",
    "open-sans": "Open+Sans:wght@400;600;700",
    poppins: "Poppins:wght@400;500;600;700",
    raleway: "Raleway:wght@400;500;600;700",
    merriweather: "Merriweather:wght@400;700",
    playfair: "Playfair+Display:wght@400;600;700",
  };
  if (!googleFonts[fontId]) return null;
  return `https://fonts.googleapis.com/css2?family=${googleFonts[fontId]}&display=swap`;
}

export { fonts, DEFAULT_FONT, getGoogleFontsURL };
