"use client";

import { useEffect, useState } from 'react';
import Image from "next/image";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import dotenv from 'dotenv'
import axios from 'redaxios'

dotenv.config();

const baseUrl: string = process.env.baseUrl!;

type has = {
  id: number,
  fk_user: number,
  fk_module: number,
  nbrOfPoints: number,
  created_at: Date,
  Updated_at: Date
};

type student = {
  id_user: number,
  useName: string,
  useEmail: string,
  useSurname: string,
  useIsTeacher: boolean,
  fk_class: number
}

type module = {
  id_module: number,
  modNumber: number,
  modType: string,
  modTeacher: string,
  modYear: number,
  modTrimester: number
}

const rows = [
  { studentId: 1, name: "pk88yte", points: 100 },
  { studentId: 2, name: "pk88yte", points: 150 },
  { studentId: 3, name: "pk88yte", points: 200 },
  { studentId: 4, name: "pk88yte", points: 250 },
  { studentId: 5, name: "pk88yte", points: 300 },
];

const modules = [
  { id: 1, name: "I347" },
  { id: 2, name: "I320" },
  { id: 3, name: "I164" },
  { id: 4, name: "I254" },
  { id: 5, name: "I236" },
];

export default function Home() {
  // Module and students state
  const [module, setModule] = useState<number>(0);
  const [has, setHas] = useState<has[]>([]);
  const [studentsDetails, setStudentsDetails] = useState<student[]>([])
  const [modules, setModules] = useState<module[]>([])

  // Fetch students when the component mounts
  useEffect(() => {
    const fetchHas = async () => {
      await axios.get<has[]>(`${baseUrl}/api/module/1/students`)
      .then((result) => {
        setHas(result.data);
      }).catch((err) =>{
        console.error('Error fetching students: ' + err)
      })
    };

    const fetchStudents = async () => {
      has.forEach(async (student) => {
        await axios.get<student[]>(`${baseUrl}/api/student/${student.fk_user}`)
        .then((result) => {
          setStudentsDetails(result.data)
        }).catch((err) =>{
          console.error('Error fetching students: ' + err)
        })
      }) 
    }

    const fetchModules = async() => {
      has.forEach(async (module) => {
        await axios.get<module[]>(`${baseUrl}/api/module/${module.fk_module}`)
        .then((result) => {
          setModules(result.data)
        }).catch((err) =>{
          console.error('Error fetching students: ' + err)
        })
      }) 
    }

    fetchHas();
    fetchStudents();
    fetchModules();
  }, []);

  return (
    <main>
      <div className="highScore pt-28 w-full text-center m-auto">

        <Box sx={{ maxWidth: 150 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Modules</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Module"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#23304d",
            width: "50%",
            display: "block"
          }}
        >
          <Table>
            <TableHead
              sx={{ borderBottomColor: "darkgray", borderBottomWidth: "5px" }}
            >
              <TableRow sx={{ bgcolor: "#475b87" }}>
                <TableCell
                  sx={{ fontSize: "18px", color: "white", width: "20%" }}
                >
                  Place
                </TableCell>

                <TableCell
                  sx={{
                    borderLeftColor: "darkgray",
                    borderLeftWidth: "2px",
                    fontSize: "18px",
                    color: "white",
                    width: "40%",
                  }}
                >
                  Nom
                </TableCell>
                <TableCell
                  sx={{
                    borderLeftColor: "darkgray",
                    borderLeftWidth: "2px",
                    fontSize: "18px",
                    color: "white",
                    width: "40%",
                  }}
                >
                  Points Totaux
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {has.length > 0 ? (
                has.map((student, index) => (
                  <TableRow key={student.fk_user}>
                    <TableCell sx={{ color: "white" }}>{index + 1}</TableCell>
                    <TableCell
                      sx={{
                        borderBottomColor: "darkgray",
                        borderLeftColor: "darkgray",
                        borderLeftWidth: "2px",
                        color: "white",
                      }}
                    >
                      {student.fk_user}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottomColor: "darkgray",
                        borderLeftColor: "darkgray",
                        borderLeftWidth: "2px",
                        color: "white",
                      }}
                    >
                      {student.nbrOfPoints}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} sx={{ color: "white" }}>
                    No students available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </main>
  );
}