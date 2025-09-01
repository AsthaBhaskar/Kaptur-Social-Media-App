import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import FriendListWidget from "../widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: theme.palette.mode === "dark" 
          ? "linear-gradient(135deg, #0A0B1E 0%, #1A1B2E 100%)" 
          : "#ffffff",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="space-between"
        sx={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <Box 
          flexBasis={isNonMobileScreens ? "28%" : undefined}
          sx={{
            position: "sticky",
            top: "100px",
            height: "fit-content",
          }}
        >
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "40%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box 
            flexBasis="28%"
            sx={{
              position: "sticky",
              top: "100px",
              height: "fit-content",
            }}
          >
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
