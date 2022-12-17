import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { account } from "../appwrite/appWriteConfig";
import { AppContext } from "../contexts/appContext";

function Login() {
  const { userInfo, setUserInfo } = useContext(AppContext);
  return (
    <Form className="container mt-5">
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
      <Form.Group className="mb-3 flex" controlId="formRedirect">
        <Link to={"/forgot"}>
          <Button variant="danger" className="me-3">
            Forgot Password
          </Button>
        </Link>
        <Link to={"/signup"}>
          <Button variant="success">Register</Button>
        </Link>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        onClick={async (e) => {
          e.preventDefault();
          try {
            await account.createEmailSession(userInfo.email, userInfo.password);
            document.location.href = "/home";
          } catch (err) {
            console.error(err);
          }
        }}
      >
        Submit
      </Button>
      <Button
        className="mx-3"
        onClick={async (e) => {
          e.preventDefault();
          try {
            await account.createOAuth2Session(
              "google",
              "http://127.0.0.1:3000/home/",
              "http://127.0.0.1:3000/",
              ["https://www.googleapis.com/auth/userinfo.email"]
            );
          } catch (err) {
            console.error(err.message);
          }
        }}
      >
        Google
      </Button>
    </Form>
  );
}

export default Login;
