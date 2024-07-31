import React, { useRef, useEffect } from "react";

import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

import Container from "@mui/material/Container";

import Header from "./Header";
import Content from "./Content";

import { onMessage } from "./service/mockServer";

function App() {
  const toast = useRef(null);

  useEffect(() => {
    onMessage(showToast);
  });

  const showToast = () => {
    toast.current.show({
      severity: "success",
      summary: "New Form Submission",
      sticky: true,
      content: (props) => (
        <div
          className='flex flex-column align-items-left'
          style={{ flex: "1" }}
        >
          <div className='font-medium text-lg my-3 text-900'>
            {props.message.summary}
          </div>
          <Button
            className='p-button-sm flex'
            label='Like'
            severity='success'
          ></Button>
        </div>
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
