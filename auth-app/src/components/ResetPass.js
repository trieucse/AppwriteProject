import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { account } from "../appwrite/appWriteConfig";

function ResetPass() {
  const [pass, setPass] = useState({
    old: "",
    new: "",
  });
  return (
    <Form className="container mt-5">
      <Form.Group className="mb-3" controlId="formOldPass">
        <Form.Label>Old Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Old Pass"
          onChange={(e) => {
            setPass({
              ...pass,
              old: e.target.value,
            });
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formNewPass">
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter New Pass"
          onChange={(e) => {
            setPass({
              ...pass,
              new: e.target.value,
            });
          }}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={async (e) => {
          e.preventDefault();
          await account.updatePassword(pass.new, pass.old);
          document.location.href = "/";
        }}
      >
        Save Password
      </Button>
    </Form>
  );
}

export default ResetPass;
