import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    //   Link,
    Grid,
    Box,
    LockOutlinedIcon,
    Typography,
    Container,
    createTheme,
    ThemeProvider,
    IconButton, // Add this import
    InputAdornment, // Add this import
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import Loader from './../Loader/Loader';
import jwt_decode from "jwt-decode";
// Create a Material-UI theme
const theme = createTheme();

// Main sign-up component
function SignIn() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    const [apiResponse, setapiResponse] = useState();
    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        }
        // Add similar checks for other fields

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isFormValid = validateForm(); // Check form validity
        if (isFormValid) {
            setIsLoading(true);
            // Call the API here
            const apiEndpoint = "auth/signin";
            const apiUrl = process.env.REACT_APP_API_BASE_URL + apiEndpoint;
            axios
                .post(apiUrl, {
                    email: formData.email,
                    password: formData.password,
                })
                .then((response) => {
                    setIsLoading(false);
                    // Handle the API response
                    if (response.data.status == "200") {
                        console.log("inside 200")
                        setapiResponse(response.data);
                        localStorage.setItem("token", response.data.token);
                        // Clear the form fields
                        setFormData({
                            email: "",
                            password: ""
                        });
                        // Redirect to the home page
                     
                        const token_value = response.data.token;
                        var decoded = jwt_decode(token_value);
                        console.log("decoded", decoded);
                        if (decoded.role == "Admin") {
                            navigate("/product/upload")
                        }else{
                            navigate("/product")
                        }
                  
                    }
                })
                .catch((error) => {
                    setIsLoading(false);
                    // Handle errors if any
                    setapiResponse(error.response.data);
                    console.error("Error occurred:", error);
                });
        }
    };

    return (
        <ThemeProvider theme={theme}>
            {isLoading ? <Loader /> : null}
            <Container component="main" maxWidth="xs" style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", borderRadius: "10px", marginTop: "120px", marginBottom: "50px" }}>
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    </Avatar>
                    <Typography component="h1" variant="h5" style={{ fontSize: "24px", fontWeight: "bold" }}>
                        Sign In
                    </Typography>
                    {
                        apiResponse && (
                            <Typography component="h1" variant="h5" style={{ fontSize: "18px", fontWeight: "bold", paddingTop: "10px", color: apiResponse.error ? "red" : "green" }}>
                                {apiResponse.error || apiResponse.message}
                            </Typography>
                        )
                    }
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    InputLabelProps={{
                                        style: { fontSize: 18 }, // Adjust the label font size as needed
                                    }}
                                    InputProps={{
                                        style: { paddingTop: "0.4rem", fontSize: 16 }, // Adjust vertical alignment and input font size as needed
                                    }}
                                />
                                {errors.email && <span style={{ color: "red", fontSize: "12px" }}>{errors.email}</span>}
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    autoComplete="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    InputLabelProps={{
                                        style: { fontSize: 18 },
                                    }}
                                    InputProps={{
                                        style: { paddingTop: "0.4rem", fontSize: 16 }, 
                                        endAdornment: ( 
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {errors.password && <span style={{ color: "red", fontSize: "12px" }}>{errors.password}</span>}
                            </Grid>

                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} style={{ backgroundColor: "rgb(248, 77, 77)", height: "35px", fontWeight: "bold", fontSize: "16px" }}>
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default SignIn;
