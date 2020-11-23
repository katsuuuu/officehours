import { useEffect, useState } from "react";
import * as mysql from "mysql";
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

import { getAllStudents } from "../../database/sqlQueries";

const Home = () => {
  // TODO: set up a .env file with the info required
  //const db = mysql.createConnection(process.env.DB_HOST);

  const [selectedStudentName, setSelectedStudentName] = useState("");
  const [allStudentNames, setAllStudentNames] = useState([]);
  const [courseData, setCourseData] = useState([]);

  const handleChange = (event) => {
    setSelectedStudentName(event.target.value);
  };

  // useEffect(() => {
  // // TODO: implement this then uncomment
  //   setAllStudentNames(getAllStudents(db));
  // }, [db]);

  // useEffect(() => {
  //   // Use procedure to query this
  // }, [db, selectedStudentName]);

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
          Office hours
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
              name: "age",
              id: "filled-age-native-simple",
            }}
          >
            <option aria-label="None" value="" />
            {allStudentNames.map((student) => {
              return <option value={student}>{student}</option>;
            })}
          </Select>
        </FormControl>
      </Grid>

      <Grid item>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Most Left Column</TableCell>
                <TableCell align="right">More Columns</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courseData.map((row) => (
                <TableRow key={row.name}>
                  {/* <TableCell component="th" scope="row">
                {row.NAME2}
                </TableCell>
                <TableCell align="right">{row.NAME}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export { Home };
