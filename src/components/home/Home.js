import { useEffect, useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import {
  getAllCoursesByStudent,
  getAllStudents,
} from "../../database/sqlQueries";

const Home = () => {
  const [selectedStudentName, setSelectedStudentName] = useState("");
  const [allStudentNames, setAllStudentNames] = useState([]);
  const [courseData, setCourseData] = useState([]);

  const handleChange = (event) => {
    setSelectedStudentName(event.target.value);
  };

  useEffect(() => {
    const resolvePromise = async () => {
      setAllStudentNames(await getAllStudents());
    };

    resolvePromise();
  }, []);

  useEffect(() => {
    const resolvePromise = async () => {
      setCourseData(await getAllCoursesByStudent(selectedStudentName));
    };

    resolvePromise();
  }, [selectedStudentName]);

  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      justify="center"
      spacing={2}
    >
      <Grid item xs={12}>
        <Typography component="h1" variant="h1">
          Office Hours
        </Typography>
      </Grid>

      <Grid item>
        <FormControl variant="filled">
          <InputLabel htmlFor="filled-name">Name</InputLabel>
          <Select
            native
            value={selectedStudentName}
            onChange={handleChange}
            inputProps={{
              name: "Name",
              id: "filled-age-native-simple",
            }}
          >
            <option aria-label="None" value="" />
            {allStudentNames.map((student) => {
              return <option value={student.name}>{student.name}</option>;
            })}
          </Select>
        </FormControl>
      </Grid>

      <Grid item>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Course Number</TableCell>
                <TableCell align="right">TA Name</TableCell>
                <TableCell align="right">Day of Week</TableCell>
                <TableCell align="right">Start Time</TableCell>
                <TableCell align="right">End Time</TableCell>
                <TableCell align="right">Room Info</TableCell>
                <TableCell align="right">Meeting Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courseData.map((row, index) => {
                Object.entries(row).forEach(([key, value]) => {
                  if (key === "course_num" && value == null) {
                    row["course_num"] = "Not enrolled in any courses.";
                  }
                });

                const {
                  course_num,
                  TA_Name,
                  day,
                  start_time,
                  end_time,
                  room_information,
                  Link,
                } = row;

                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {course_num}
                    </TableCell>
                    <TableCell align="right">{TA_Name}</TableCell>
                    <TableCell align="right">{day}</TableCell>
                    <TableCell align="right">{start_time}</TableCell>
                    <TableCell align="right">{end_time}</TableCell>
                    <TableCell align="right">{room_information}</TableCell>
                    <TableCell align="right">{Link}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export { Home };
