// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#E6FBFF",
    100: "#CCF7FE",
    200: "#99EEFD",
    300: "#66E6FC",
    400: "#33DDFB",
    500: "#00D5FA",
    600: "#00A0BC",
    700: "#006B7D",
    800: "#00353F",
    900: "#001519",
  },
  // New modern colors inspired by the NFT marketplace
  modern: {
    darkBlue: "#0A0B1E",
    darkPurple: "#1A1B2E",
    purple: "#8B5CF6",
    blue: "#3B82F6",
    pink: "#EC4899",
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)",
    gradientHover: "linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)",
    accent: "#06B6D4",
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode - modern Kaptur theme
            primary: {
              dark: colorTokens.modern.purple,
              main: colorTokens.modern.blue,
              light: colorTokens.modern.accent,
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.modern.darkBlue,
              alt: colorTokens.modern.darkPurple,
              paper: colorTokens.modern.darkPurple,
            },
            text: {
              primary: colorTokens.grey[0],
              secondary: colorTokens.grey[200],
            },
            // Custom colors for Kaptur
            kaptur: {
              gradient: colorTokens.modern.gradient,
              gradientHover: colorTokens.modern.gradientHover,
              purple: colorTokens.modern.purple,
              blue: colorTokens.modern.blue,
              pink: colorTokens.modern.pink,
              accent: colorTokens.modern.accent,
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
              paper: colorTokens.grey[0],
            },
            text: {
              primary: colorTokens.grey[900],
              secondary: colorTokens.grey[700],
            },
            // Custom colors for Kaptur
            kaptur: {
              gradient: colorTokens.modern.gradient,
              gradientHover: colorTokens.modern.gradientHover,
              purple: colorTokens.modern.purple,
              blue: colorTokens.modern.blue,
              pink: colorTokens.modern.pink,
              accent: colorTokens.modern.accent,
            },
          }),
    },
    typography: {
      fontFamily: ["Inter", "system-ui", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Inter", "system-ui", "sans-serif"].join(","),
        fontSize: 48,
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontFamily: ["Inter", "system-ui", "sans-serif"].join(","),
        fontSize: 36,
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h3: {
        fontFamily: ["Inter", "system-ui", "sans-serif"].join(","),
        fontSize: 28,
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontFamily: ["Inter", "system-ui", "sans-serif"].join(","),
        fontSize: 24,
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontFamily: ["Inter", "system-ui", "sans-serif"].join(","),
        fontSize: 18,
        fontWeight: 500,
        lineHeight: 1.5,
      },
      h6: {
        fontFamily: ["Inter", "system-ui", "sans-serif"].join(","),
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 1.5,
      },
      body1: {
        fontSize: 16,
        lineHeight: 1.6,
      },
      body2: {
        fontSize: 14,
        lineHeight: 1.6,
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
        fontSize: 14,
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: "12px 24px",
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0 8px 25px rgba(139, 92, 246, 0.3)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
    },
  };
};
