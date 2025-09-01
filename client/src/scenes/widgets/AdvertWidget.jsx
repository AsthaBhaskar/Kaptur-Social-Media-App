import { Typography, useTheme, Box, Button, Chip } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { TrendingUp, Launch } from "@mui/icons-material";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      {/* Header */}
      <Box mb="1.5rem">
        <FlexBetween mb="1rem">
          <Box display="flex" alignItems="center" gap="0.5rem">
            <TrendingUp sx={{ color: palette.kaptur.purple, fontSize: "20px" }} />
            <Typography color={dark} variant="h5" fontWeight="600">
              Sponsored
            </Typography>
          </Box>
          <Chip 
            label="Create Ad" 
            size="small"
            sx={{
              background: palette.kaptur.gradient,
              color: "white",
              fontWeight: "500",
              cursor: "pointer",
              "&:hover": {
                background: palette.kaptur.gradientHover,
              },
            }}
          />
        </FlexBetween>
      </Box>

      {/* Ad Image */}
      <Box
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          mb: "1.5rem",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          border: `1px solid ${palette.mode === "dark" 
            ? "rgba(255, 255, 255, 0.05)" 
            : "rgba(0, 0, 0, 0.05)"}`,
        }}
      >
        <img
          width="100%"
          height="auto"
          alt="advert"
          src="http://localhost:6001/assets/info4.jpeg"
          style={{ display: "block" }}
        />
      </Box>

      {/* Ad Content */}
      <Box mb="1.5rem">
        <FlexBetween mb="1rem">
          <Typography 
            color={main} 
            variant="h6" 
            fontWeight="600"
            sx={{ 
              background: palette.kaptur.gradient,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            MikaCosmetics
          </Typography>
          <Typography 
            color={medium} 
            variant="body2"
            sx={{
              backgroundColor: palette.mode === "dark" 
                ? "rgba(255, 255, 255, 0.05)" 
                : "rgba(0, 0, 0, 0.05)",
              px: "0.75rem",
              py: "0.25rem",
              borderRadius: "12px",
              border: `1px solid ${palette.mode === "dark" 
                ? "rgba(255, 255, 255, 0.1)" 
                : "rgba(0, 0, 0, 0.1)"}`,
            }}
          >
            mikacosmetics.com
          </Typography>
        </FlexBetween>
        
        <Typography 
          color={medium} 
          variant="body2" 
          sx={{ 
            lineHeight: 1.6,
            mb: "1.5rem",
          }}
        >
          Your pathway to stunning and immaculate beauty and made sure your skin
          is exfoliating skin and shining like light.
        </Typography>

        {/* CTA Button */}
        <Button
          variant="contained"
          fullWidth
          endIcon={<Launch />}
          sx={{
            background: palette.kaptur.gradient,
            color: "white",
            borderRadius: "12px",
            py: "0.75rem",
            fontWeight: "600",
            textTransform: "none",
            boxShadow: "0 4px 15px rgba(139, 92, 246, 0.4)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: palette.kaptur.gradientHover,
              transform: "translateY(-2px)",
              boxShadow: "0 8px 25px rgba(139, 92, 246, 0.5)",
            },
          }}
        >
          Shop Now
        </Button>
      </Box>

      {/* Ad Stats */}
      <Box
        sx={{
          backgroundColor: palette.mode === "dark" 
            ? "rgba(139, 92, 246, 0.05)" 
            : "rgba(139, 92, 246, 0.05)",
          borderRadius: "12px",
          p: "1rem",
          border: `1px solid ${palette.mode === "dark" 
            ? "rgba(139, 92, 246, 0.1)" 
            : "rgba(139, 92, 246, 0.1)"}`,
        }}
      >
        <Typography 
          variant="body2" 
          color={palette.text.secondary} 
          textAlign="center"
          sx={{ fontSize: "12px" }}
        >
          Sponsored content helps keep Kaptur free
        </Typography>
      </Box>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
