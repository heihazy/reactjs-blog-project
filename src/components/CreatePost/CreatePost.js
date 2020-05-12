import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
const Create = () => {
  const sentPopup = () => (
    <div>
      <Popover id="send-post">
        <Popover.Title as="h3">Post Sent</Popover.Title>
        <Popover.Content>Thank you for sharing</Popover.Content>
      </Popover>
    </div>
  );

  return (
    <Container>
      <h2>Join the community by writing your story below</h2>
      <Form style={{ width: "50%", paddingLeft: "2rem", paddingTop: "2rem" }}>
        <Form.Group controlId="formBasicName">
          <Form.Label style={{ fontSize: "1.5rem" }}>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label style={{ fontSize: "1.5rem" }}>Email</Form.Label>
          <Form.Control type="text" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label style={{ fontSize: "1.5rem" }}>
            Write content here
          </Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>
        <Button
          onClick={() => (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={sentPopup}
            ></OverlayTrigger>
          )}
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Create;
