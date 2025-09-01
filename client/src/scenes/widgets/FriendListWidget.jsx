import { Box, Typography, useTheme, Avatar, Chip } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state";
import { People, Add } from "@mui/icons-material";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:6001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      {/* Header */}
      <Box mb="2rem">
        <FlexBetween mb="1rem">
          <Box display="flex" alignItems="center" gap="0.75rem">
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
              <People sx={{ color: "white", fontSize: "20px" }} />
            </Box>
            <Typography
              color={palette.text.primary}
              variant="h5"
              fontWeight="600"
            >
              Friends
            </Typography>
          </Box>
          <Chip 
            label={`${friends.length}`}
            size="small"
            sx={{
              background: palette.kaptur.gradient,
              color: "white",
              fontWeight: "600",
            }}
          />
        </FlexBetween>
        
        <Typography 
          variant="body2" 
          color={palette.text.secondary}
          sx={{ lineHeight: 1.5 }}
        >
          Connect with your network and discover new people
        </Typography>
      </Box>

      {/* Friends List */}
      <Box display="flex" flexDirection="column" gap="1rem">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))
        ) : (
          <Box 
            textAlign="center" 
            p="2rem"
            sx={{
              backgroundColor: palette.mode === "dark" 
                ? "rgba(255, 255, 255, 0.02)" 
                : "rgba(0, 0, 0, 0.02)",
              borderRadius: "12px",
              border: `1px solid ${palette.mode === "dark" 
                ? "rgba(255, 255, 255, 0.05)" 
                : "rgba(0, 0, 0, 0.05)"}`,
            }}
          >
            <Avatar
              sx={{
                width: 48,
                height: 48,
                backgroundColor: palette.kaptur.purple,
                margin: "0 auto 1rem",
              }}
            >
              <People />
            </Avatar>
            <Typography 
              variant="h6" 
              color={palette.text.secondary} 
              mb="0.5rem"
            >
              No friends yet
            </Typography>
            <Typography 
              variant="body2" 
              color={palette.text.secondary}
              sx={{ lineHeight: 1.5 }}
            >
              Start connecting with people to build your network
            </Typography>
          </Box>
        )}
      </Box>

      {/* Add Friends CTA */}
      {friends.length > 0 && (
        <Box 
          mt="1.5rem"
          p="1rem"
          sx={{
            backgroundColor: palette.mode === "dark" 
              ? "rgba(139, 92, 246, 0.05)" 
              : "rgba(139, 92, 246, 0.05)",
            borderRadius: "12px",
            border: `1px solid ${palette.mode === "dark" 
              ? "rgba(139, 92, 246, 0.1)" 
              : "rgba(139, 92, 246, 0.1)"}`,
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: palette.mode === "dark" 
                ? "rgba(139, 92, 246, 0.1)" 
                : "rgba(139, 92, 246, 0.1)",
              transform: "translateY(-2px)",
            },
          }}
        >
          <Add sx={{ 
            color: palette.kaptur.purple, 
            fontSize: "24px",
            mb: "0.5rem",
          }} />
          <Typography 
            variant="body2" 
            color={palette.kaptur.purple}
            fontWeight="500"
          >
            Find More Friends
          </Typography>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default FriendListWidget;
