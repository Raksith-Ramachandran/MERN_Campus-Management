import React, { useEffect, useState, useMemo } from 'react';
import { Container, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';

import SubjectIcon from '../../assets/subjects.svg';
import AssignmentIcon from '../../assets/assignment.svg';
import AttendanceIcon from '../../assets/Attendance.png'; //

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser?.sclassName?._id;

    useEffect(() => {
        if (currentUser?._id) {
            dispatch(getUserDetails(currentUser._id, "Student"));
        }
    }, [dispatch, currentUser?._id]);

    useEffect(() => {
        if (classID) {
            dispatch(getSubjectList(classID, "ClassSubjects"));
        }
    }, [dispatch, classID]);

    useEffect(() => {
        if (userDetails?.attendance) {
            setSubjectAttendance(userDetails.attendance);
        }
    }, [userDetails]);

    const numberOfSubjects = subjectsList?.length || 0;

    const overallAttendancePercentage = useMemo(() => calculateOverallAttendancePercentage(subjectAttendance), [subjectAttendance]);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;
    const totalClasses = subjectAttendance.reduce((acc, subj) => acc + subj.totalClasses, 0);
    const totalAttended = Math.round((overallAttendancePercentage / 100) * totalClasses);
    const totalMissed = totalClasses - totalAttended;

    const requiredClassesFor75 = Math.max(0, Math.ceil((0.75 * totalClasses - totalAttended)));

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Subjects Count */}
                <Grid item xs={12} sm={6} md={3}>
                    <StyledPaper>
                        <img src={SubjectIcon} alt="Subjects" />
                        <Title>Total Subjects</Title>
                        <Data start={0} end={numberOfSubjects} duration={2.5} />
                    </StyledPaper>
                </Grid>

                {/* Assignments Count */}
                <Grid item xs={12} sm={6} md={3}>
                    <StyledPaper>
                        <img src={AssignmentIcon} alt="Assignments" />
                        <Title>Total Assignments</Title>
                        <Data start={0} end={15} duration={4} />
                    </StyledPaper>
                </Grid>

                {/* Attendance Chart */}
                <Grid item xs={12} md={4} lg={3}>
                    <ChartContainer>
                        {loading ? (
                            <CircularProgress />
                        ) : subjectAttendance.length > 0 ? (
                            <CustomPieChart data={chartData} />
                        ) : (
                            <Typography variant="h6">No Attendance Data</Typography>
                        )}
                    </ChartContainer>
                </Grid>

                {/* Attendance Insights */}
                <Grid item xs={12} sm={6} md={3}>
                    <StyledPaper>
                        <img src={AttendanceIcon} alt="Attendance" />
                        <Title>Attendance Days</Title>
                        <Data start={0} end={totalAttended} duration={2} />
                        <Typography variant="caption" color="error">Missed: {totalMissed}</Typography>
                        <Typography variant="caption" color="warning">
                            {requiredClassesFor75 > 0 ? `Attend ${requiredClassesFor75} more to reach 75%` : "Good Attendance!"}
                        </Typography>
                    </StyledPaper>
                </Grid>

                {/* Notices Section */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <SeeNotice />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default StudentHomePage;

// Styled Components
const ChartContainer = styled.div`
  padding: 2px;
  display: flex;
  flex-direction: column;
  height: 240px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 220px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

const Title = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: green;
  font-weight: bold;
`;
