import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { account } from "../appwrite/appWriteConfig";

function Home() {
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    try {
      const getUserDetails = async () => {
        const user = await account.get();
        setUserDetails(user);
      };
      getUserDetails();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const secret = urlParams.get("secret");

  if (userId) {
    account
      .updateVerification(userId, secret)
      .then(() => {
        console.log("verified");
        document.location.href = "/home";
      })
      .catch((e) => {
        console.log(e);
      });
  }
  if (Object.keys(userDetails).length > 0) {
    return (
      <>
        <h1>Home</h1>
        <h2>Welcome {userDetails.$id}</h2>
        <Button
          onClick={async () => {
            try {
              await account.deleteSession("current");
              document.location.href = "/";
            } catch (err) {
              console.error("Error deleting session");
            }
          }}
        >
          Logout
        </Button>
      </>
    );
  } else {
    return (
      <>
        <h2 className="text-center my-3">
          Please login first to see the homepage
        </h2>
        <button
          className="btn btn-dark text-center flex justify-center"
          onClick={() => (document.location.href = "/")}
        >
          Login
        </button>
      </>
    );
  }
}
export default Home;
