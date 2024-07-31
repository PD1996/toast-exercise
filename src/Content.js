import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function Content({ likedSubmissions }) {
  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant='h4'>Liked Form Submissions</Typography>
      {likedSubmissions.length === 0 ? (
        <Typography variant='body1' sx={{ fontStyle: "italic", marginTop: 1 }}>
          {/* TODO: display "loading" text while the data is loading */}
          No liked submissions yet.
        </Typography>
      ) : (
        <DataTable value={likedSubmissions} stripedRows>
          <Column field='data.firstName' header='First Name' />
          <Column field='data.lastName' header='Last Name' />
          <Column field='data.email' header='Email' />
        </DataTable>
      )}
    </Box>
  );
}
