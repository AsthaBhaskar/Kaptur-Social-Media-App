import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";
import { Box, Typography, useTheme } from "@mui/material";
import { API_BASE_URL } from "../../config";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const theme = useTheme();

  const getPosts = async () => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `${API_BASE_URL}/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      {/* Header */}
      <Box 
        mb="2rem" 
        p="1.5rem" 
        sx={{
          background: theme.palette.mode === "dark" 
            ? "rgba(255, 255, 255, 0.03)" 
            : "rgba(0, 0, 0, 0.02)",
          borderRadius: "16px",
          border: `1px solid ${theme.palette.mode === "dark" 
            ? "rgba(255, 255, 255, 0.05)" 
            : "rgba(0, 0, 0, 0.05)"}`,
        }}
      >
        <Typography variant="h4" color={theme.palette.text.primary} fontWeight="600" mb="0.5rem">
          {isProfile ? "Your Posts" : "Latest Posts"}
        </Typography>
        <Typography variant="body1" color={theme.palette.text.secondary}>
          {isProfile 
            ? "Discover and manage your shared moments" 
            : "Stay updated with the latest from your network"
          }
        </Typography>
      </Box>

      {/* Posts List */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )}
      </Box>

      {/* Empty State */}
      {posts.length === 0 && (
        <Box 
          textAlign="center" 
          p="3rem"
          sx={{
            background: theme.palette.mode === "dark" 
              ? "rgba(255, 255, 255, 0.03)" 
              : "rgba(0, 0, 0, 0.02)",
            borderRadius: "16px",
            border: `1px solid ${theme.palette.mode === "dark" 
              ? "rgba(255, 255, 255, 0.05)" 
              : "rgba(0, 0, 0, 0.05)"}`,
          }}
        >
          <Typography variant="h6" color={theme.palette.text.secondary} mb="1rem">
            {isProfile ? "No posts yet" : "No posts available"}
          </Typography>
          <Typography variant="body2" color={theme.palette.text.secondary}>
            {isProfile 
              ? "Create your first post to get started!" 
              : "Be the first to share something amazing!"
            }
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PostsWidget;
