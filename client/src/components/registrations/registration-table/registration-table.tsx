"use client";
import ControlField from "@/components/form/controller-field/control-field";
import UseRegistrations from "@/hooks/use-registrations";
import { IRegistrations, RegistrationFilters } from "@/type/registration.type";
import { useDebounce } from "@/utils/debounce";
import {
  Avatar,
  Box,
  Chip,
  FormLabel,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

export default function RegistrationsTable({ eventId }: { eventId: number }) {
  const { data, setFilters } = UseRegistrations(eventId);
  const [search, setSearch] = useState<string>("");

  const searchData = () => {
    setFilters({ search });
  };
  const debounce = useDebounce(searchData, 500);

  useEffect(() => {
    debounce()
  }, [search, debounce]);
  return (
    <Box sx={{ marginTop: "2rem" }}>
      <TableContainer component={Paper} sx={{p : 4}}>
        
        <Typography className="styleLetters">REGISTERED USERS</Typography>
        <Box>
          <TextField
            placeholder="search"
            onChange={(e) => setSearch(e.target.value)}
            sx={{mt:3}}
          />
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Registration Id</TableCell>

              <TableCell>username</TableCell>

              <TableCell>email</TableCell>

              <TableCell>status</TableCell>

              <TableCell>Registered At</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item) => (
              <TableRow key={item.registrationId}>
                <TableCell>{item.registrationId}</TableCell>
                <TableCell>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ alignItems: "center" }}
                  >
                    <Avatar src={item.avatar ?? ""}>
                      {item.username.charAt(0)}
                    </Avatar>
                    <Typography>{item.username}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>{item.email}</TableCell>

                <TableCell>
                  <Chip label={item.status} />
                </TableCell>

                <TableCell>{item.createdAt.slice(0, 10)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination />
      </TableContainer>
    </Box>
  );
}
