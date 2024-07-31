import React, { useRef, useEffect, useState } from "react";

import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

import { Container, Box, Typography } from "@mui/material";

import Header from "./Header";
import Content from "./Content";

import {
  onMessage,
  saveLikedFormSubmission,
  fetchLikedFormSubmissions,
} from "./service/mockServer";

function App() {
  const newSubmissionToast = useRef(null);
  const responseToast = useRef(null);
  const [likedSubmissions, setLikedSubmissions] = useState([]);

  useEffect(() => {
    onMessage(showToast);

    fetchLikedFormSubmissions().then((response) => {
      setLikedSubmissions(response.formSubmissions);
    });
  }, []);

  const showToast = (formSubmission) => {
    newSubmissionToast.current.show({
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
          <Button
            severity='success'
            onClick={() => handleLikedSubmission(formSubmission)}
          >
            Like
          </Button>
        </Box>
      ),
    });
  };

  const handleLikedSubmission = (formSubmission) => {
    saveLikedFormSubmission(formSubmission)
      .then(() => {
        setLikedSubmissions((prev) => [...prev, formSubmission]);
        newSubmissionToast.current.clear();
        showSuccessToast("Saved liked submission successfully!");
      })
      .catch((error) => {
        console.error("Failed to save liked submission:", error);
        showErrorToast("Failed to like submission. Please try again.");
      });
  };

  const showSuccessToast = (message) => {
    responseToast.current.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 3000,
    });
  };

  const showErrorToast = (message) => {
    responseToast.current.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 5000,
    });
  };

  return (
    <>
      <Header />
      <Container>
        <Content likedSubmissions={likedSubmissions} />
        <Toast ref={newSubmissionToast} position='bottom-right' />
        <Toast ref={responseToast} position='top-left' />
      </Container>
    </>
  );
}

export default App;
