import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  LocationOn,
  MoreVert,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme, Tooltip, Menu, MenuItem } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";
import { API_BASE_URL } from "../../config";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();

  const patchLike = async () => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <WidgetWrapper>
      {/* Post Header */}
      <Box mb="1.5rem">
        <FlexBetween>
          <Friend
            friendId={postUserId}
            name={name}
            subtitle={location}
            userPicturePath={userPicturePath}
          />
          <Box>
            <Tooltip title="More options">
              <IconButton
                onClick={handleMenuOpen}
                sx={{
                  color: palette.text.secondary,
                  "&:hover": {
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                  },
                }}
              >
                <MoreVert />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{
                "& .MuiPaper-root": {
                  backgroundColor: palette.background.paper,
                  border: `1px solid ${palette.mode === "dark" 
                    ? "rgba(255, 255, 255, 0.1)" 
                    : "rgba(0, 0, 0, 0.1)"}`,
                  borderRadius: "12px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <MenuItem onClick={handleMenuClose}>Report Post</MenuItem>
              <MenuItem onClick={handleMenuClose}>Copy Link</MenuItem>
              <MenuItem onClick={handleMenuClose}>Save Post</MenuItem>
            </Menu>
          </Box>
        </FlexBetween>
      </Box>

      {/* Post Content */}
      <Box mb="1.5rem">
        <Typography 
          color={palette.text.primary} 
          variant="body1" 
          sx={{ 
            mt: "1rem", 
            mb: "1rem",
            lineHeight: 1.6,
          }}
        >
          {description}
        </Typography>
        
        {location && (
          <FlexBetween 
            gap="0.5rem" 
            sx={{ 
              color: palette.text.secondary,
              mb: "1rem",
            }}
          >
            <LocationOn sx={{ fontSize: "18px" }} />
            <Typography variant="body2">{location}</Typography>
          </FlexBetween>
        )}

        {picturePath && (
          <Box
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              border: `1px solid ${palette.mode === "dark" 
                ? "rgba(255, 255, 255, 0.05)" 
                : "rgba(0, 0, 0, 0.05)"}`,
            }}
          >
            <img
              width="100%"
              height="auto"
              alt="post"
              style={{ display: "block" }}
              src={`${API_BASE_URL}/assets/${picturePath}`}
            />
          </Box>
        )}
      </Box>

      {/* Post Actions */}
      <Box 
        sx={{
          borderTop: `1px solid ${palette.mode === "dark" 
            ? "rgba(255, 255, 255, 0.1)" 
            : "rgba(0, 0, 0, 0.1)"}`,
          pt: "1rem",
        }}
      >
        <FlexBetween>
          <FlexBetween gap="2rem">
            {/* Like Button */}
            <Tooltip title={isLiked ? "Unlike" : "Like"}>
              <FlexBetween 
                gap="0.5rem"
                onClick={patchLike}
                sx={{
                  cursor: "pointer",
                  p: "0.5rem 1rem",
                  borderRadius: "20px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: isLiked 
                      ? "rgba(244, 67, 54, 0.1)" 
                      : "rgba(139, 92, 246, 0.1)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <IconButton 
                  sx={{ 
                    p: 0,
                    color: isLiked ? palette.error.main : palette.text.secondary,
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {isLiked ? (
                    <FavoriteOutlined sx={{ fontSize: "20px" }} />
                  ) : (
                    <FavoriteBorderOutlined sx={{ fontSize: "20px" }} />
                  )}
                </IconButton>
                <Typography 
                  variant="body2" 
                  color={isLiked ? palette.error.main : palette.text.secondary}
                  fontWeight="500"
                >
                  {likeCount}
                </Typography>
              </FlexBetween>
            </Tooltip>

            {/* Comment Button */}
            <Tooltip title="Add Comment">
              <FlexBetween 
                gap="0.5rem"
                onClick={() => setIsComments(!isComments)}
                sx={{
                  cursor: "pointer",
                  p: "0.5rem 1rem",
                  borderRadius: "20px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <IconButton 
                  sx={{ 
                    p: 0,
                    color: palette.text.secondary,
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <ChatBubbleOutlineOutlined sx={{ fontSize: "20px" }} />
                </IconButton>
                <Typography 
                  variant="body2" 
                  color={palette.text.secondary}
                  fontWeight="500"
                >
                  {comments.length}
                </Typography>
              </FlexBetween>
            </Tooltip>
          </FlexBetween>

          {/* Share Button */}
          <Tooltip title="Share Post">
            <IconButton
              sx={{
                color: palette.text.secondary,
                p: "0.5rem 1rem",
                borderRadius: "20px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(6, 182, 212, 0.1)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <ShareOutlined sx={{ fontSize: "20px" }} />
            </IconButton>
          </Tooltip>
        </FlexBetween>
      </Box>

      {/* Comments Section */}
      {isComments && (
        <Box 
          mt="1rem"
          sx={{
            borderTop: `1px solid ${palette.mode === "dark" 
              ? "rgba(255, 255, 255, 0.1)" 
              : "rgba(0, 0, 0, 0.1)"}`,
            pt: "1rem",
          }}
        >
          <Typography 
            variant="h6" 
            color={palette.text.primary} 
            fontWeight="600" 
            mb="1rem"
          >
            Comments ({comments.length})
          </Typography>
          
          {comments.length > 0 ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {comments.map((comment, i) => (
                <Box 
                  key={`${name}-${i}`}
                  sx={{
                    p: "1rem",
                    backgroundColor: palette.mode === "dark" 
                      ? "rgba(255, 255, 255, 0.03)" 
                      : "rgba(0, 0, 0, 0.02)",
                    borderRadius: "12px",
                    border: `1px solid ${palette.mode === "dark" 
                      ? "rgba(255, 255, 255, 0.05)" 
                      : "rgba(0, 0, 0, 0.05)"}`,
                  }}
                >
                  <Typography 
                    variant="body2" 
                    color={palette.text.primary}
                    sx={{ lineHeight: 1.5 }}
                  >
                    {comment}
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Box 
              textAlign="center" 
              p="2rem"
              sx={{
                color: palette.text.secondary,
                backgroundColor: palette.mode === "dark" 
                  ? "rgba(255, 255, 255, 0.02)" 
                  : "rgba(0, 0, 0, 0.02)",
                borderRadius: "12px",
              }}
            >
              <Typography variant="body2">
                No comments yet. Be the first to comment!
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
