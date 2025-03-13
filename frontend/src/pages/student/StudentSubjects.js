import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectList } from "../../redux/sclassRelated/sclassHandle";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableHead,
  Typography,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";

import InsertChartIcon from "@mui/icons-material/InsertChart";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import TableChartIcon from "@mui/icons-material/TableChart";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";

import CustomBarChart from "../../components/CustomBarChart";
import { StyledTableCell, StyledTableRow } from "../../components/styles";

const StudentSubjects = () => {
  const dispatch = useDispatch();
  const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
  const { userDetails, currentUser, loading, error } = useSelector(
    (state) => state.user
  );

  const [subjectMarks, setSubjectMarks] = useState([]);
  const [selectedSection, setSelectedSection] = useState("table");

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getUserDetails(currentUser._id, "Student"));
    }
  }, [dispatch, currentUser?._id]);

  useEffect(() => {
    if (userDetails) {
      setSubjectMarks(userDetails.examResult || []);
    }
  }, [userDetails]);

  useEffect(() => {
    if (currentUser?.sclassName?._id) {
      dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
    }
  }, [dispatch, currentUser?.sclassName?._id]);

  const hasSubjects = useMemo(
    () => Array.isArray(subjectMarks) && subjectMarks.length > 0,
    [subjectMarks]
  );

  const handleSectionChange = (_, newSection) => {
    setSelectedSection(newSection);
  };

  const renderTableSection = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Subject Marks
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Subject</StyledTableCell>
                <StyledTableCell>Marks</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {subjectMarks.map((result, index) => {
                if (!result?.subName?.subName || result.marksObtained == null) {
                  return null;
                }
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{result.subName.subName}</StyledTableCell>
                    <StyledTableCell>{result.marksObtained}</StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderChartSection = () => (
    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
      <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
        <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
      </Card>
    </motion.div>
  );

  const renderClassDetailsSection = () => (
    <Container sx={{ textAlign: "center", mt: 3 }}>
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h5" gutterBottom>
            Class Details
          </Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>
            You are currently in Class{" "}
            <strong>{sclassDetails?.sclassName || "Not Available"}</strong>
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Subjects:
          </Typography>
          {subjectsList?.length ? (
            subjectsList.map((subject, index) => (
              <Typography key={index} variant="body1">
                {subject.subName} ({subject.subCode})
              </Typography>
            ))
          ) : (
            <Typography variant="body2">No subjects available.</Typography>
          )}
        </Card>
      </motion.div>
    </Container>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress size={50} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={3}>
        {error || "Something went wrong. Please try again later."}
      </Typography>
    );
  }

  return (
    <Box sx={{ pb: 8 }}>
      {hasSubjects ? (
        <>
          {selectedSection === "table" && renderTableSection()}
          {selectedSection === "chart" && renderChartSection()}

          <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0, borderRadius: "12px 12px 0 0" }} elevation={3}>
            <BottomNavigation
              value={selectedSection}
              onChange={handleSectionChange}
              showLabels
              sx={{ backgroundColor: "#2c2c2c", color: "white" }}
            >
              <BottomNavigationAction
                label="Table"
                value="table"
                icon={selectedSection === "table" ? <TableChartIcon sx={{ color: "white" }} /> : <TableChartOutlinedIcon sx={{ color: "gray" }} />}
              />
              <BottomNavigationAction
                label="Chart"
                value="chart"
                icon={selectedSection === "chart" ? <InsertChartIcon sx={{ color: "white" }} /> : <InsertChartOutlinedIcon sx={{ color: "gray" }} />}
              />
            </BottomNavigation>
          </Paper>
        </>
      ) : (
        renderClassDetailsSection()
      )}
    </Box>
  );
};

export default StudentSubjects;
