import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import { 
  Person, 
  Email, 
  Lock, 
  LocationOn, 
  Work, 
  PhotoCamera,
  Login,
  PersonAdd,
} from "@mui/icons-material";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:6001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:6001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="1.5rem"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ 
                    gridColumn: "span 2",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: palette.kaptur.purple,
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: palette.kaptur.purple,
                        borderWidth: "2px",
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <Person sx={{ color: palette.text.secondary, mr: 1 }} />
                    ),
                  }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ 
                    gridColumn: "span 2",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: palette.kaptur.purple,
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: palette.kaptur.purple,
                        borderWidth: "2px",
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <Person sx={{ color: palette.text.secondary, mr: 1 }} />
                    ),
                  }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ 
                    gridColumn: "span 4",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: palette.kaptur.blue,
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: palette.kaptur.blue,
                        borderWidth: "2px",
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <LocationOn sx={{ color: palette.text.secondary, mr: 1 }} />
                    ),
                  }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ 
                    gridColumn: "span 4",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: palette.kaptur.pink,
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: palette.kaptur.pink,
                        borderWidth: "2px",
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <Work sx={{ color: palette.text.secondary, mr: 1 }} />
                    ),
                  }}
                />
                
                {/* Profile Picture Upload */}
                <Box
                  gridColumn="span 4"
                  sx={{
                    border: `2px dashed ${palette.kaptur.purple}`,
                    borderRadius: "16px",
                    p: "1.5rem",
                    backgroundColor: "rgba(139, 92, 246, 0.05)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(139, 92, 246, 0.1)",
                      borderColor: palette.kaptur.purple,
                    },
                  }}
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        sx={{ 
                          textAlign: "center",
                          cursor: "pointer",
                          "&:hover": {
                            transform: "scale(1.02)",
                          },
                          transition: "transform 0.3s ease",
                        }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <Box>
                            <PhotoCamera 
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
                              Drop your profile picture here or click to browse
                            </Typography>
                          </Box>
                        ) : (
                          <FlexBetween>
                            <Typography 
                              variant="body1" 
                              color={palette.text.primary}
                            >
                              {values.picture.name}
                            </Typography>
                            <EditOutlinedIcon sx={{ color: palette.kaptur.purple }} />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ 
                gridColumn: "span 4",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: palette.kaptur.blue,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: palette.kaptur.blue,
                    borderWidth: "2px",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <Email sx={{ color: palette.text.secondary, mr: 1 }} />
                ),
              }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ 
                gridColumn: "span 4",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: palette.kaptur.pink,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: palette.kaptur.pink,
                    borderWidth: "2px",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <Lock sx={{ color: palette.text.secondary, mr: 1 }} />
                ),
              }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              startIcon={isLogin ? <Login /> : <PersonAdd />}
              sx={{
                m: "2rem 0",
                p: "1rem",
                background: palette.kaptur.gradient,
                color: "white",
                borderRadius: "16px",
                fontWeight: "600",
                textTransform: "none",
                fontSize: "1.1rem",
                boxShadow: "0 4px 15px rgba(139, 92, 246, 0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: palette.kaptur.gradientHover,
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(139, 92, 246, 0.5)",
                },
              }}
            >
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
            
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textAlign: "center",
                color: palette.kaptur.purple,
                cursor: "pointer",
                fontWeight: "500",
                transition: "all 0.3s ease",
                "&:hover": {
                  color: palette.kaptur.blue,
                  textDecoration: "underline",
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Sign In here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
