import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress, Tooltip
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from "../../assets/designlogin.jpg";
import { LightPurpleButton } from '../../components/buttonStyles';
import { registerUser } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import Popup from '../../components/Popup';

const defaultTheme = createTheme();

const AdminRegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [formData, setFormData] = useState({
        adminName: '',
        schoolName: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [toggle, setToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const role = "Admin";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: false }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { adminName, schoolName, email, password } = formData;

        let newErrors = {};
        if (!adminName) newErrors.adminName = "Name is required";
        if (!schoolName) newErrors.schoolName = "College/University name is required";
        if (!email) newErrors.email = "Email is required";
        if (!password) newErrors.password = "Password is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoader(true);
        dispatch(registerUser({ ...formData, role }, role));
    };

    useEffect(() => {
        if (status === 'success' || (currentUser && currentRole === 'Admin')) {
            navigate('/Admin/dashboard');
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            console.error(error);
        }
    }, [status, currentUser, currentRole, navigate, error, response]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <BoxWrapper>
                        <Typography variant="h4" fontWeight={600} color="#2c2143" gutterBottom>
                            Admin Registration
                        </Typography>
                        <Typography variant="body1" textAlign="center" color="textSecondary" mb={2}>
                            Create your college account to manage students, faculty, and more.
                        </Typography>

                        <form onSubmit={handleSubmit} noValidate>
                            <StyledTextField
                                label="Admin Name"
                                name="adminName"
                                value={formData.adminName}
                                onChange={handleInputChange}
                                error={Boolean(errors.adminName)}
                                helperText={errors.adminName}
                            />
                            <StyledTextField
                                label="College/University Name"
                                name="schoolName"
                                value={formData.schoolName}
                                onChange={handleInputChange}
                                error={Boolean(errors.schoolName)}
                                helperText={errors.schoolName}
                            />
                            <StyledTextField
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                            />
                            <StyledTextField
                                label="Password"
                                name="password"
                                type={toggle ? "text" : "password"}
                                value={formData.password}
                                onChange={handleInputChange}
                                error={Boolean(errors.password)}
                                helperText={errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setToggle(!toggle)}>
                                                {toggle ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <PasswordStrength password={formData.password} />

                            <FormControlLabel
                                control={<Checkbox color="primary" />}
                                label="Remember me"
                                sx={{ mt: 1 }}
                            />

                            <LightPurpleButton type="submit" fullWidth variant="contained">
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Register"}
                            </LightPurpleButton>

                            <Typography variant="body2" align="center" mt={2}>
                                Already have an account?{" "}
                                <StyledLink to="/Adminlogin">Log in</StyledLink>
                            </Typography>
                        </form>
                    </BoxWrapper>
                </Grid>

                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${bgpic})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
            </Grid>

            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
};

export default AdminRegisterPage;

// Styled Components
const BoxWrapper = styled(Box)`
    margin: 64px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledTextField = styled(TextField)`
    width: 100%;
    margin-bottom: 16px !important;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #7f56da;
    &:hover {
        text-decoration: underline;
    }
`;

// Password Strength Indicator (optional UX improvement)
const PasswordStrength = ({ password }) => {
    const getStrength = () => {
        if (password.length < 6) return "Weak";
        if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8) return "Strong";
        return "Moderate";
    };

    if (!password) return null;

    return (
        <Tooltip title="Password should be 8+ characters, include numbers and uppercase letters" arrow>
            <Typography
                variant="caption"
                color={getStrength() === "Strong" ? "green" : getStrength() === "Moderate" ? "orange" : "red"}
                mb={1}
                display="block"
            >
                Password Strength: {getStrength()}
            </Typography>
        </Tooltip>
    );
};
