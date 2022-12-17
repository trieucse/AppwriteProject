import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AppContext } from "../contexts/appContext";
import { account } from "../appwrite/appWriteConfig";

function Register() {
  const { userInfo, setUserInfo } = useContext(AppContext);
  return (
    <Form className="container mt-5">
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter userid"
          onChange={(e) => {
            setUserInfo({
              ...userInfo,
              username: e.target.value,
            });
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => {
            setUserInfo({
              ...userInfo,
              email: e.target.value,
            });
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setUserInfo({
              ...userInfo,
              password: e.target.value,
            });
          }}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={async (e) => {
          e.preventDefault();
          await account.create(
            userInfo.username,
            userInfo.email,
            userInfo.password
          );
          await account.createEmailSession(userInfo.email, userInfo.password);
          await account.createVerification("http://localhost:3000/home");
          document.location.href = "/";
        }}
      >
        Submit
      </Button>
    </Form>
  );
}

export default Register;
