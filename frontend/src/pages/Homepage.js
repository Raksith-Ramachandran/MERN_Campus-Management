import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';
import CountUp from 'react-countup';
const Homepage = () => {
    return (
        <StyledContainer>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                    <StyledImage src={Students} alt="students" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledContent>
                        <StyledTitle>Karpagam College Of Engineering</StyledTitle>
                        <StyledSubtitle>Your Gateway to Excellence</StyledSubtitle>
                        <StyledText>
                            <b>Why Choose Us?</b>
                        </StyledText>
                        <StyledList>
                            <li><b>World-Class Education:</b> Learn from top educators in modern facilities.</li>
                            <li><b>Wide Range of Courses:</b> Choose from cutting-edge programs like:
                                <ul>
                                    <li>Computer Science & Engineering</li>
                                    <li>Web Development & Design</li>
                                    <li>Electronics and Communication Engineering</li>
                                    <li>Electrical and Electronics Engineering</li>
                                    <li>Data Science & AI</li>
                                    <li>Mechanical & Civil Engineering</li>
                                </ul>
                            </li>
                            <li><b>State-of-the-Art Campus:</b> Experience top-tier labs, libraries, and recreational spaces.</li>
                            <li><b>Career Growth:</b> Industry partnerships provide hands-on training & job opportunities.</li>
                        </StyledList>
                        <StyledBox>
                            <StyledLink to="/choose">
                                <LightPurpleButton variant="contained" fullWidth>
                                    Login
                                </LightPurpleButton>
                            </StyledLink>
                            <StyledText>
                                Don't have an account? <Link to="/Adminregister" style={{ color: "#550080" }}>Sign up</Link>
                            </StyledText>
                        </StyledBox>
                    </StyledContent>
                </Grid>
            </Grid>

            {/* Statistics Section */}
            <StatsSection>
                <StatItem>
                <Data start={0} end={90000} duration={4} suffix="+"/>
                    <StatText>Students Enrolled</StatText>
                </StatItem>
                <StatItem>
                <Data start={0} end={150} duration={2} suffix="+"/>
                    <StatText>Degree Programs</StatText>
                </StatItem>
                <StatItem>
                <Data start={0} end={93} duration={2} suffix="%"/>
                    <StatText>Employment Rate</StatText>
                </StatItem>
            </StatsSection>

            {/* Testimonials Section */}
            <TestimonialSection>
                <TestimonialTitle>What Our Students Say ?</TestimonialTitle>
                <TestimonialGrid>
                    <TestimonialCard>
                        <p><i>"Karpagam College Of Engineering transformed my career. The faculty and resources are top-notch!"</i></p>
                        <strong>- Raksith C R, ECE</strong>
                    </TestimonialCard>
                    <TestimonialCard>
                        <p><i>"The hands-on learning and industry partnerships gave me a real edge in my field."</i></p>
                        <strong>- Avanthika M, ECE</strong>
                    </TestimonialCard>
                </TestimonialGrid>
            </TestimonialSection>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #f3e7ff, #e3f2fd);
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 500px;
  display: block;
  margin: auto;
`;

const StyledContent = styled.div`
  padding: 40px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StyledTitle = styled.h1`
  font-size: 2.5rem;
  color: #252525;
  font-weight: bold;
  margin-bottom: 8px;
`;

const StyledSubtitle = styled.h2`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 16px;
`;

const StyledText = styled.p`
  font-size: 1rem;
  color: #444;
  margin-bottom: 16px;
`;

const StyledList = styled.ul`
  font-size: 1rem;
  color: #444;
  margin-bottom: 20px;
  padding-left: 20px;
  text-align: left;

  li {
    margin-bottom: 10px;
  }

  ul {
    margin-top: 5px;
    padding-left: 20px;
    list-style-type: circle;
  }
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

const StatsSection = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 40px 0;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 40px;
  border-radius: 12px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.h2`
  font-size: 2rem;
  color: #550080;
  font-weight: bold;
`;

const StatText = styled.p`
  font-size: 1rem;
  color: #444;
`;

const TestimonialSection = styled.div`
  margin-top: 40px;
  padding: 30px;
  padding-left: 10px;
  padding-right: 1px;
  background: #f9f9f9;
  border-radius: 12px;
  text-align: center;
  width: 100%;
`;

const TestimonialTitle = styled.h2`
  font-size: 2rem;
  color: #252525;
  margin-bottom: 20px;
`;

const TestimonialGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const TestimonialCard = styled.div`
  background: #fff;
  padding: 2px;
  border:0.5px solid #110;
  border-radius: 10px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
  width: 45%;
  min-width: 250px;
`;
const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color:  #550080;
  font-weight: bold;
`;
