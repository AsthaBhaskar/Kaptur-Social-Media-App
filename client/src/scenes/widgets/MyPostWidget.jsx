import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
  Send,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import { API_BASE_URL } from "../../config";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return (
    <WidgetWrapper>
      {/* Header */}
      <Box mb="1.5rem">
        <Typography variant="h5" color={palette.text.primary} fontWeight="600" mb="1rem">
          Create a Post
        </Typography>
        <Typography variant="body2" color={palette.text.secondary}>
          Share your thoughts, photos, and moments with the Kaptur community
        </Typography>
      </Box>

      {/* Post Input Area */}
      <FlexBetween gap="1.5rem" mb="1.5rem">
        <Box
          sx={{
            border: "3px solid",
            borderColor: palette.kaptur.purple,
            borderRadius: "50%",
            p: "2px",
          }}
        >
          <UserImage image={picturePath} size="60px" />
        </Box>
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.mode === "dark" 
              ? "rgba(255, 255, 255, 0.05)" 
              : "rgba(0, 0, 0, 0.05)",
            borderRadius: "25px",
            padding: "1rem 1.5rem",
            border: `1px solid ${palette.mode === "dark" 
              ? "rgba(255, 255, 255, 0.1)" 
              : "rgba(0, 0, 0, 0.1)"}`,
            color: palette.text.primary,
            "& input::placeholder": {
              color: palette.text.secondary,
              opacity: 0.7,
            },
            "&:focus-within": {
              borderColor: palette.kaptur.purple,
              boxShadow: `0 0 0 3px ${palette.kaptur.purple}20`,
            },
          }}
        />
      </FlexBetween>

      {/* Image Upload Area */}
      {isImage && (
        <Box
          sx={{
            border: `2px dashed ${palette.kaptur.purple}`,
            borderRadius: "16px",
            mt: "1rem",
            p: "1.5rem",
            backgroundColor: "rgba(139, 92, 246, 0.05)",
            mb: "1.5rem",
          }}
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "rgba(139, 92, 246, 0.1)",
                    },
                    p: "1rem",
                    borderRadius: "12px",
                  }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <Box>
                      <ImageOutlined 
                        sx={{ 
                          fontSize: "48px", 
                          color: palette.kaptur.purple,
                          mb: "0.5rem",
                        }} 
                      />
                      <Typography 
                        variant="body1" 
                        color={palette.kaptur.purple}
                        fontWeight="500"
                      >
                        Drop an image here or click to browse
                      </Typography>
                    </Box>
                  ) : (
                    <FlexBetween>
                      <Typography variant="body1" color={palette.text.primary}>
                        {image.name}
                      </Typography>
                      <EditOutlined sx={{ color: palette.kaptur.purple }} />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <Tooltip title="Remove Image">
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{
                        color: palette.error.main,
                        "&:hover": {
                          backgroundColor: "rgba(244, 67, 54, 0.1)",
                        },
                      }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  </Tooltip>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      {/* Action Buttons */}
      <FlexBetween>
        <FlexBetween gap="2rem">
          <Tooltip title="Add Image">
            <FlexBetween 
              gap="0.5rem" 
              onClick={() => setIsImage(!isImage)}
              sx={{
                cursor: "pointer",
                p: "0.5rem 1rem",
                borderRadius: "20px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <ImageOutlined sx={{ color: palette.kaptur.purple }} />
              <Typography
                color={palette.kaptur.purple}
                variant="body2"
                fontWeight="500"
              >
                Image
              </Typography>
            </FlexBetween>
          </Tooltip>

          {isNonMobileScreens ? (
            <>
              <Tooltip title="Add GIF">
                <FlexBetween 
                  gap="0.5rem"
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
                  <GifBoxOutlined sx={{ color: palette.kaptur.blue }} />
                  <Typography color={palette.kaptur.blue} variant="body2" fontWeight="500">
                    GIF
                  </Typography>
                </FlexBetween>
              </Tooltip>

              <Tooltip title="Add Attachment">
                <FlexBetween 
                  gap="0.5rem"
                  sx={{
                    cursor: "pointer",
                    p: "0.5rem 1rem",
                    borderRadius: "20px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(236, 72, 153, 0.1)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <AttachFileOutlined sx={{ color: palette.kaptur.pink }} />
                  <Typography color={palette.kaptur.pink} variant="body2" fontWeight="500">
                    File
                  </Typography>
                </FlexBetween>
              </Tooltip>

              <Tooltip title="Add Audio">
                <FlexBetween 
                  gap="0.5rem"
                  sx={{
                    cursor: "pointer",
                    p: "0.5rem 1rem",
                    borderRadius: "20px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(6, 182, 212, 0.1)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <MicOutlined sx={{ color: palette.kaptur.accent }} />
                  <Typography color={palette.kaptur.accent} variant="body2" fontWeight="500">
                    Audio
                  </Typography>
                </FlexBetween>
              </Tooltip>
            </>
          ) : (
            <Tooltip title="More Options">
              <FlexBetween 
                gap="0.5rem"
                sx={{
                  cursor: "pointer",
                  p: "0.5rem 1rem",
                  borderRadius: "20px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <MoreHorizOutlined sx={{ color: mediumMain }} />
              </FlexBetween>
            </Tooltip>
          )}
        </FlexBetween>

        <Button
          disabled={!post}
          onClick={handlePost}
          variant="contained"
          startIcon={<Send />}
          sx={{
            background: post ? palette.kaptur.gradient : "rgba(139, 92, 246, 0.3)",
            color: "white",
            borderRadius: "25px",
            px: "2rem",
            py: "0.75rem",
            fontWeight: "600",
            textTransform: "none",
            boxShadow: post ? "0 4px 15px rgba(139, 92, 246, 0.4)" : "none",
            transition: "all 0.3s ease",
            "&:hover": {
              background: post ? palette.kaptur.gradientHover : "rgba(139, 92, 246, 0.3)",
              transform: post ? "translateY(-2px)" : "none",
              boxShadow: post ? "0 8px 25px rgba(139, 92, 246, 0.5)" : "none",
            },
            "&:disabled": {
              background: "rgba(139, 92, 246, 0.3)",
              color: "rgba(255, 255, 255, 0.5)",
            },
          }}
        >
          {post ? "Share Post" : "Post"}
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
