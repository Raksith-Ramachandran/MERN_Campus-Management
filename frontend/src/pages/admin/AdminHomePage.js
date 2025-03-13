import { Container, Grid, Paper, Button, IconButton, Typography, Divider } from '@mui/material';
import { Add, Notifications, People, School, Class, MonetizationOn, HomeWork } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import CountUp from 'react-countup';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';
import SeeNotice from '../../components/SeeNotice';

// Admin Home Page
const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector(state => state.student);
    const { sclassesList } = useSelector(state => state.sclass);
    const { teachersList } = useSelector(state => state.teacher);
    const { currentUser } = useSelector(state => state.user);

    const adminID = currentUser?._id;

    useEffect(() => {
        if (adminID) {
            dispatch(getAllStudents(adminID));
            dispatch(getAllSclasses(adminID, "Sclass"));
            dispatch(getAllTeachers(adminID));
        }
    }, [adminID, dispatch]);

    // Memoized Values
    const numberOfStudents = useMemo(() => studentsList?.length || 0, [studentsList]);
    const numberOfClasses = useMemo(() => sclassesList?.length || 0, [sclassesList]);
    const numberOfTeachers = useMemo(() => teachersList?.length || 0, [teachersList]);

    // Dashboard Stats
    const stats = [
        { title: "Total Students", value: numberOfStudents, icon: <People color="primary" />, duration: 2.5 },
        { title: "Total Classes", value: numberOfClasses, icon: <Class color="secondary" />, duration: 3 },
        { title: "Total Teachers", value: numberOfTeachers, icon: <School color="success" />, duration: 2.5 },
        { title: "Fees Collection", value: 34110035, icon: <MonetizationOn color="action" />, duration: 2.5, prefix: "₹" },
        { title: "Hostel Fees", value: 2245000, icon: <HomeWork color="warning" />, duration: 2.5, prefix: "₹" }
    ];

    // Recent Activities
    const recentActivities = [
        { id: 1, message: "New student enrolled in Class EC-2 year" },
        { id: 2, message: "Fees collected from 20 students" },
        { id: 3, message: "New notice posted for Semester exams" },
       
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Dashboard Statistics */}
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <StatCard {...stat} />
                    </Grid>
                ))}

                {/* Quick Actions */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h6" gutterBottom>Quick Actions</Typography>
                        <Button variant="contained" startIcon={<Add />} sx={{ mb: 1 }} fullWidth>
                            Add New Student
                        </Button>
                        <Button variant="contained" startIcon={<Add />} sx={{ mb: 1 }} fullWidth color="secondary">
                            Add New Teacher
                        </Button>
                        <Button variant="contained" startIcon={<Notifications />} fullWidth color="success">
                            Post a Notice
                        </Button>
                    </Paper>
                </Grid>

                {/* Recent Activities */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Recent Activities</Typography>
                        <Divider sx={{ mb: 2 }} />
                        {recentActivities.map(activity => (
                            <Typography key={activity.id} sx={{ mb: 1 }}>🔹 {activity.message}</Typography>
                        ))}
                    </Paper>
                </Grid>

                {/* Notices Section */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <SeeNotice />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

// Reusable Statistic Card
const StatCard = ({ title, value, icon, duration, prefix }) => (
    <StyledPaper>
        <IconButton size="large">{icon}</IconButton>
        <Title>{title}</Title>
        <Data start={0} end={value} duration={duration} prefix={prefix || ''} />
    </StyledPaper>
);

// Styled Components
const StyledPaper = styled(Paper)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  height: 180px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Title = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 8px;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: #2e7d32;
  font-weight: bold;
`;

export default AdminHomePage;
