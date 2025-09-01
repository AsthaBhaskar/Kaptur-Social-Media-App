import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Avatar,
  Badge,
  Tooltip,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
  Home,
  Explore,
  Add,
  Person,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: theme.palette.mode === "dark" 
          ? "rgba(26, 27, 46, 0.95)" 
          : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${theme.palette.mode === "dark" 
          ? "rgba(255, 255, 255, 0.1)" 
          : "rgba(0, 0, 0, 0.1)"}`,
      }}
    >
      <FlexBetween padding="1rem 6%">
        <FlexBetween gap="2rem">
          {/* Kaptur Logo */}
          <Typography
            fontWeight="bold"
            fontSize="clamp(1.5rem, 2.5rem, 3rem)"
            onClick={() => navigate("/home")}
            sx={{
              background: theme.palette.kaptur.gradient,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              cursor: "pointer",
              "&:hover": {
                background: theme.palette.kaptur.gradientHover,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              },
            }}
          >
            Kaptur
          </Typography>

          {/* Desktop Navigation Links */}
          {isNonMobileScreens && (
            <FlexBetween gap="2rem">
              <Typography
                variant="body1"
                sx={{
                  cursor: "pointer",
                  color: theme.palette.text.primary,
                  "&:hover": { color: theme.palette.kaptur.purple },
                  transition: "color 0.3s ease",
                }}
                onClick={() => navigate("/home")}
              >
                Home
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  cursor: "pointer",
                  color: theme.palette.text.primary,
                  "&:hover": { color: theme.palette.kaptur.purple },
                  transition: "color 0.3s ease",
                }}
              >
                Explore
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  cursor: "pointer",
                  color: theme.palette.text.primary,
                  "&:hover": { color: theme.palette.kaptur.purple },
                  transition: "color 0.3s ease",
                }}
              >
                Create
              </Typography>
            </FlexBetween>
          )}

          {/* Enhanced Search Bar */}
          {isNonMobileScreens && (
            <FlexBetween
              sx={{
                backgroundColor: theme.palette.mode === "dark" 
                  ? "rgba(255, 255, 255, 0.05)" 
                  : "rgba(0, 0, 0, 0.05)",
                borderRadius: "25px",
                gap: "1rem",
                padding: "0.5rem 1.5rem",
                border: `1px solid ${theme.palette.mode === "dark" 
                  ? "rgba(255, 255, 255, 0.1)" 
                  : "rgba(0, 0, 0, 0.1)"}`,
                transition: "all 0.3s ease",
                "&:focus-within": {
                  borderColor: theme.palette.kaptur.purple,
                  boxShadow: `0 0 0 3px ${theme.palette.kaptur.purple}20`,
                },
              }}
            >
              <InputBase 
                placeholder="Search Kaptur..." 
                sx={{
                  color: theme.palette.text.primary,
                  "& input::placeholder": {
                    color: theme.palette.text.secondary,
                    opacity: 0.7,
                  },
                }}
              />
              <IconButton
                sx={{
                  color: theme.palette.kaptur.purple,
                  "&:hover": {
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                  },
                }}
              >
                <Search />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>

        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
          <FlexBetween gap="1.5rem">
            <Tooltip title="Toggle theme">
              <IconButton 
                onClick={() => dispatch(setMode())}
                sx={{
                  color: theme.palette.text.primary,
                  "&:hover": {
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                  },
                }}
              >
                {theme.palette.mode === "dark" ? (
                  <LightMode sx={{ fontSize: "22px" }} />
                ) : (
                  <DarkMode sx={{ fontSize: "22px" }} />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title="Messages">
              <IconButton
                sx={{
                  color: theme.palette.text.primary,
                  "&:hover": {
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                  },
                }}
              >
                <Badge badgeContent={3} color="error">
                  <Message sx={{ fontSize: "22px" }} />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Notifications">
              <IconButton
                sx={{
                  color: theme.palette.text.primary,
                  "&:hover": {
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                  },
                }}
              >
                <Badge badgeContent={5} color="error">
                  <Notifications sx={{ fontSize: "22px" }} />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Help">
              <IconButton
                sx={{
                  color: theme.palette.text.primary,
                  "&:hover": {
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                  },
                }}
              >
                <Help sx={{ fontSize: "22px" }} />
              </IconButton>
            </Tooltip>

            {/* User Profile Dropdown */}
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: theme.palette.mode === "dark" 
                    ? "rgba(255, 255, 255, 0.05)" 
                    : "rgba(0, 0, 0, 0.05)",
                  borderRadius: "12px",
                  p: "0.5rem 1rem",
                  border: `1px solid ${theme.palette.mode === "dark" 
                    ? "rgba(255, 255, 255, 0.1)" 
                    : "rgba(0, 0, 0, 0.1)"}`,
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "2rem",
                    color: theme.palette.text.primary,
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: "transparent",
                  },
                  "& .MuiSelect-select": {
                    color: theme.palette.text.primary,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Avatar 
                    src={user.picturePath} 
                    sx={{ width: 32, height: 32, mr: 1 }}
                  />
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            sx={{
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: "rgba(139, 92, 246, 0.1)",
              },
            }}
          >
            <Menu />
          </IconButton>
        )}

        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            sx={{
              background: theme.palette.background.default,
              borderLeft: `1px solid ${theme.palette.mode === "dark" 
                ? "rgba(255, 255, 255, 0.1)" 
                : "rgba(0, 0, 0, 0.1)"}`,
            }}
          >
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                sx={{
                  color: theme.palette.text.primary,
                  "&:hover": {
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                  },
                }}
              >
                <Close />
              </IconButton>
            </Box>

            {/* Mobile Search */}
            <Box p="1rem">
              <FlexBetween
                sx={{
                  backgroundColor: theme.palette.mode === "dark" 
                    ? "rgba(255, 255, 255, 0.05)" 
                    : "rgba(0, 0, 0, 0.05)",
                  borderRadius: "25px",
                  gap: "1rem",
                  padding: "0.5rem 1.5rem",
                  border: `1px solid ${theme.palette.mode === "dark" 
                    ? "rgba(255, 255, 255, 0.1)" 
                    : "rgba(0, 0, 0, 0.1)"}`,
                }}
              >
                <InputBase 
                  placeholder="Search Kaptur..." 
                  sx={{
                    color: theme.palette.text.primary,
                    "& input::placeholder": {
                      color: theme.palette.text.secondary,
                      opacity: 0.7,
                    },
                  }}
                />
                <IconButton
                  sx={{
                    color: theme.palette.kaptur.purple,
                  }}
                >
                  <Search />
                </IconButton>
              </FlexBetween>
            </Box>

            {/* Mobile Navigation Items */}
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              gap="1rem"
              p="1rem"
            >
              <FlexBetween
                gap="1rem"
                sx={{
                  width: "100%",
                  p: "1rem",
                  borderRadius: "12px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                  },
                }}
                onClick={() => navigate("/home")}
              >
                <Home sx={{ color: theme.palette.kaptur.purple }} />
                <Typography variant="body1">Home</Typography>
              </FlexBetween>

              <FlexBetween
                gap="1rem"
                sx={{
                  width: "100%",
                  p: "1rem",
                  borderRadius: "12px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                  },
                }}
              >
                <Explore sx={{ color: theme.palette.kaptur.blue }} />
                <Typography variant="body1">Explore</Typography>
              </FlexBetween>

              <FlexBetween
                gap="1rem"
                sx={{
                  width: "100%",
                  p: "1rem",
                  borderRadius: "12px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                  },
                }}
              >
                <Add sx={{ color: theme.palette.kaptur.pink }} />
                <Typography variant="body1">Create Post</Typography>
              </FlexBetween>

              <FlexBetween
                gap="1rem"
                sx={{
                  width: "100%",
                  p: "1rem",
                  borderRadius: "12px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                  },
                }}
                onClick={() => navigate(`/profile/${user._id}`)}
              >
                <Person sx={{ color: theme.palette.kaptur.accent }} />
                <Typography variant="body1">Profile</Typography>
              </FlexBetween>

              <Box sx={{ width: "100%", borderTop: `1px solid ${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`, pt: "1rem", mt: "1rem" }}>
                <FlexBetween
                  gap="1rem"
                  sx={{
                    width: "100%",
                    p: "1rem",
                    borderRadius: "12px",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "rgba(139, 92, 246, 0.1)",
                    },
                  }}
                  onClick={() => dispatch(setMode())}
                >
                  {theme.palette.mode === "dark" ? (
                    <LightMode sx={{ color: theme.palette.kaptur.purple }} />
                  ) : (
                    <DarkMode sx={{ color: theme.palette.kaptur.blue }} />
                  )}
                  <Typography variant="body1">
                    {theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}
                  </Typography>
                </FlexBetween>

                <FlexBetween
                  gap="1rem"
                  sx={{
                    width: "100%",
                    p: "1rem",
                    borderRadius: "12px",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "rgba(139, 92, 246, 0.1)",
                    },
                  }}
                  onClick={() => dispatch(setLogout())}
                >
                  <Typography variant="body1" color="error">Log Out</Typography>
                </FlexBetween>
              </Box>
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>
    </Box>
  );
};

export default Navbar;
