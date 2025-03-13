import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Box, Container, CircularProgress, Backdrop, Typography, Button } from '@mui/material';
import { AccountCircle, School, Group, EmojiEvents, Star, Info } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import CountUp from 'react-countup';
const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";
  const { status, currentUser, currentRole } = useSelector(state => state.user);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (visitor === "guest") {
      const credentials = {
        Admin: { email: "yogendra@12", password },
        Student: { rollNum: "1", studentName: "Dipesh Awasthi", password },
        Teacher: { email: "tony@12", password }
      };
      
      setLoader(true);
      dispatch(loginUser(credentials[user], user));
    } else {
      navigate(`/${user}login`);
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser) {
      navigate(`/${currentRole}/dashboard`);
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <Container>
        <Header>
          <Typography variant="h4" gutterBottom>
            Welcome to Karpagam College OF Engineering
          </Typography>
          <Typography variant="subtitle1">Please select your role to continue</Typography>
        </Header>

        <Grid container spacing={3} justifyContent="center">
          {[{
            role: "Admin",
            icon: <AccountCircle fontSize="large" />,
            desc: "Manage courses, faculty, and student data efficiently."
          }, {
            role: "Student",
            icon: <School fontSize="large" />,
            desc: "Access course materials, track assignments, and view grades."
          }, {
            role: "Teacher",
            icon: <Group fontSize="large" />,
            desc: "Create courses, assignments, and manage student progress."
          }].map(({ role, icon, desc }) => (
            <Grid item xs={12} sm={6} md={4} key={role}>
              <StyledPaper elevation={5} onClick={() => navigateHandler(role)}>
                <IconWrapper>{icon}</IconWrapper>
                <StyledTypography>{role}</StyledTypography>
                <Typography variant="body2" className="role-desc">{desc}</Typography>
                <Button variant="outlined" color="primary">Proceed</Button>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>

        {/* Showcase Section */}
        <ShowcaseSection>
          <Typography variant="h5" gutterBottom>Special Features</Typography>
          <FeatureBox>
            <EmojiEvents fontSize="large" />
            <Typography variant="body1">Achievements & Badges</Typography>
            <Data start={0} end={500} duration={2} suffix="+"/>
          </FeatureBox>
          <FeatureBox>
            <Star fontSize="large" />
            <Typography variant="body1">Top Performers</Typography>
            <Data start={0} end={50} duration={2} suffix="+"/>
          </FeatureBox>
          <FeatureBox>
            <Info fontSize="large" />
            <Typography variant="body1">Latest Announcements</Typography>
            <Data start={0} end={3} duration={5} suffix="+"/>
          </FeatureBox>
        </ShowcaseSection>
      </Container>
      
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
      
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

// Styled Components
const StyledContainer = styled.div`
  background: linear-gradient(to bottom, #3a1c71, #2a5298);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  color: white;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
  background-color: #1f1f38;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  border-radius: 10px;
  border: 2px solid transparent;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: #2c2c6c;
    color: white;
    border-color: #6a5acd;
    transform: scale(1.05);
  }

  .role-desc {
    margin: 10px 0;
    font-size: 14px;
  }
`;

const IconWrapper = styled(Box)`
  margin-bottom: 10px;
  color: #6a5acd;
  transition: transform 0.2s;
  
  ${StyledPaper}:hover & {
    transform: rotate(10deg);
  }
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
`;

const ShowcaseSection = styled.div`
  margin-top: 3rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  display: flex;
  gap: 100px;
  justify-content: center;
  align-items: center;
  color: white;
`;

const FeatureBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
    color: #ffd700;
  }
`;
const Data = styled(CountUp)`
  font-size: 5px
  color:rgb(255, 255, 255);

  &:hover {
    transform: scale(1.1);
    color: #ffd700;
  }
`;