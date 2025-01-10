import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { CustomizationModal } from "../components";

const Personalization = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Launch static backdrop modal
      </Button>

      <CustomizationModal show={show} setShow={setShow} />
    </>
  );
};

export default Personalization;
