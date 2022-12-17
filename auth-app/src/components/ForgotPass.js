import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { account } from "../appwrite/appWriteConfig";

function ForgotPass() {
  const [userEmail, setUserEmail] = useState("");
  return (
    <Form className="container mt-5">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={async (e) => {
          e.preventDefault();
          await account.createRecovery(
            userEmail,
            "http://127.0.0.1:3000/reset"
          );
        }}
      >
        Reset Password
      </Button>
    </Form>
  );
}

export default ForgotPass;
