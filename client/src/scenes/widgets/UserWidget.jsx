import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  Visibility,
  TrendingUp,
  Twitter,
  LinkedIn,
} from "@mui/icons-material";
import { Box, Typography, IconButton, Tooltip, useTheme } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      {/* Profile Header with Gradient Background */}
      <Box
        sx={{
          background: palette.kaptur.gradient,
          borderRadius: "16px 16px 0 0",
          p: "2rem",
          mb: "1.5rem",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "16px 16px 0 0",
          },
        }}
      >
        <FlexBetween
          gap="1rem"
          onClick={() => navigate(`/profile/${userId}`)}
          sx={{ cursor: "pointer", position: "relative", zIndex: 1 }}
        >
          <FlexBetween gap="1rem">
            <Box
              sx={{
                border: "4px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "50%",
                p: "2px",
              }}
            >
              <UserImage image={picturePath} size="80px" />
            </Box>
            <Box>
              <Typography
                variant="h4"
                color="white"
                fontWeight="600"
                sx={{
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  mb: "0.5rem",
                }}
              >
                {firstName} {lastName}
              </Typography>
              <Typography 
                color="rgba(255, 255, 255, 0.9)" 
                variant="body1"
                sx={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)" }}
              >
                {friends.length} friends
              </Typography>
            </Box>
          </FlexBetween>
          <Tooltip title="Manage Account">
            <IconButton
              sx={{
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              <ManageAccountsOutlined />
            </IconButton>
          </Tooltip>
        </FlexBetween>
      </Box>

      {/* Location and Occupation */}
      <Box p="1.5rem" sx={{ backgroundColor: "rgba(139, 92, 246, 0.05)", borderRadius: "12px", mb: "1.5rem" }}>
        <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
          <Box
            sx={{
              backgroundColor: palette.kaptur.purple,
              borderRadius: "50%",
              p: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LocationOnOutlined sx={{ color: "white", fontSize: "20px" }} />
          </Box>
          <Typography color={medium} variant="body1">{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <Box
            sx={{
              backgroundColor: palette.kaptur.blue,
              borderRadius: "50%",
              p: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WorkOutlineOutlined sx={{ color: "white", fontSize: "20px" }} />
          </Box>
          <Typography color={medium} variant="body1">{occupation}</Typography>
        </Box>
      </Box>

      {/* Stats Section */}
      <Box p="1.5rem" sx={{ backgroundColor: "rgba(59, 130, 246, 0.05)", borderRadius: "12px", mb: "1.5rem" }}>
        <Typography variant="h6" color={main} fontWeight="600" mb="1rem">
          Profile Analytics
        </Typography>
        
        <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
          <Box
            sx={{
              backgroundColor: palette.kaptur.pink,
              borderRadius: "50%",
              p: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Visibility sx={{ color: "white", fontSize: "20px" }} />
          </Box>
          <Box flex={1}>
            <Typography color={medium} variant="body2">Profile Views</Typography>
            <Typography color={main} fontWeight="600" variant="h6">
              {viewedProfile}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap="1rem">
          <Box
            sx={{
              backgroundColor: palette.kaptur.accent,
              borderRadius: "50%",
              p: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TrendingUp sx={{ color: "white", fontSize: "20px" }} />
          </Box>
          <Box flex={1}>
            <Typography color={medium} variant="body2">Post Impressions</Typography>
            <Typography color={main} fontWeight="600" variant="h6">
              {impressions}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Social Profiles */}
      <Box p="1.5rem" sx={{ backgroundColor: "rgba(236, 72, 153, 0.05)", borderRadius: "12px" }}>
        <Typography variant="h6" color={main} fontWeight="600" mb="1rem">
          Social Profiles
        </Typography>

        <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
          <Box
            sx={{
              backgroundColor: "#1DA1F2",
              borderRadius: "50%",
              p: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Twitter sx={{ color: "white", fontSize: "20px" }} />
          </Box>
          <Box flex={1}>
            <Typography color={main} fontWeight="600" variant="body1">
              Twitter
            </Typography>
            <Typography color={medium} variant="body2">Social Network</Typography>
          </Box>
          <Tooltip title="Edit Twitter">
            <IconButton
              size="small"
              sx={{
                color: main,
                "&:hover": {
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                },
              }}
            >
              <EditOutlined sx={{ fontSize: "18px" }} />
            </IconButton>
          </Tooltip>
        </Box>

        <Box display="flex" alignItems="center" gap="1rem">
          <Box
            sx={{
              backgroundColor: "#0077B5",
              borderRadius: "50%",
              p: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LinkedIn sx={{ color: "white", fontSize: "20px" }} />
          </Box>
          <Box flex={1}>
            <Typography color={main} fontWeight="600" variant="body1">
              LinkedIn
            </Typography>
            <Typography color={medium} variant="body2">Professional Network</Typography>
          </Box>
          <Tooltip title="Edit LinkedIn">
            <IconButton
              size="small"
              sx={{
                color: main,
                "&:hover": {
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                },
              }}
            >
              <EditOutlined sx={{ fontSize: "18px" }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
