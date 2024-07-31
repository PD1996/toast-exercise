import React, { useRef, useEffect } from "react";

import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

import { Container, Box, Typography } from "@mui/material";

import Header from "./Header";
import Content from "./Content";

import { onMessage } from "./service/mockServer";

function App() {
  const toast = useRef(null);

  useEffect(() => {
    onMessage(showToast);
  }, []);

  const showToast = (formSubmission) => {
    toast.current.show({
      severity: "success",
      summary: "New Form Submission",
      sticky: true,
      content: () => (
        <Box sx={{ flex: 1 }}>
          <Typography variant='subtitle1' gutterBottom>
            <strong>New submission</strong>
          </Typography>
          <Typography variant='body1' gutterBottom>
            {`${formSubmission.data.firstName} ${formSubmission.data.lastName}`}
          </Typography>
          <Typography variant='body2' sx={{ mb: 2 }}>
            {formSubmission.data.email}
          </Typography>
          <Button severity='success'>Like</Button>
        </Box>
      ),
    });
  };

  return (
    <>
      <Header />
      <Container>
        <Content />
        <Toast ref={toast} position='bottom-right' />
      </Container>
    </>
  );
}

export default App;
