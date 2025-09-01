import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: theme.palette.mode === "dark" 
          ? "linear-gradient(135deg, #0A0B1E 0%, #1A1B2E 100%)" 
          : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme.palette.mode === "dark"
            ? "radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
            : "radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)",
          zIndex: 0,
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          p: "2rem 6%",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <Typography 
          fontWeight="bold" 
          fontSize="clamp(2rem, 4vw, 4rem)" 
          sx={{
            background: theme.palette.kaptur.gradient,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          Kaptur
        </Typography>
        <Typography 
          variant="h6" 
          color={theme.palette.text.secondary}
          sx={{ 
            mt: "0.5rem",
            opacity: 0.8,
          }}
        >
          Capture. Share. Connect.
        </Typography>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          width: isNonMobileScreens ? "450px" : "90%",
          maxWidth: "500px",
          p: "3rem",
          borderRadius: "24px",
          backgroundColor: theme.palette.mode === "dark" 
            ? "rgba(26, 27, 46, 0.95)" 
            : "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${theme.palette.mode === "dark" 
            ? "rgba(255, 255, 255, 0.1)" 
            : "rgba(0, 0, 0, 0.1)"}`,
          boxShadow: theme.palette.mode === "dark"
            ? "0 25px 50px rgba(0, 0, 0, 0.5)"
            : "0 25px 50px rgba(0, 0, 0, 0.1)",
          zIndex: 1,
          position: "relative",
        }}
      >
        <Box textAlign="center" mb="2rem">
          <Typography 
            fontWeight="600" 
            variant="h4" 
            color={theme.palette.text.primary}
            mb="0.5rem"
          >
            Welcome to Kaptur
          </Typography>
          <Typography 
            variant="body1" 
            color={theme.palette.text.secondary}
            sx={{ lineHeight: 1.6 }}
          >
            Join the community and start sharing your moments with the world
          </Typography>
        </Box>
        
        <Form />
      </Box>

      {/* Floating Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "100px",
          height: "100px",
          background: theme.palette.kaptur.gradient,
          borderRadius: "50%",
          opacity: 0.1,
          animation: "float 6s ease-in-out infinite",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: "150px",
          height: "150px",
          background: theme.palette.kaptur.gradientHover,
          borderRadius: "50%",
          opacity: 0.1,
          animation: "float 8s ease-in-out infinite reverse",
          zIndex: 0,
        }}
      />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </Box>
  );
};

export default LoginPage;
