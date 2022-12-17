import React, { useEffect, useState } from "react";
import { account, storage } from "../appwrite/appWrite";
import { Button, Card, Form } from "react-bootstrap";
import { ID, Permission, Role } from "appwrite";
function storeImage(element) {
  return () =>
    storage.createFile(
      "639e0a4de1f94c604975",
      ID.unique(),
      element.files[0],
      [Permission.read(Role.any()), Permission.write(Role.any())],
      (progress) => {}
    );
}

function FileUpload() {
  const [images, setImages] = useState({
    files: [],
  });
  useEffect(() => {
    storage.listFiles("639e0a4de1f94c604975").then((data) => {
      setImages(data);
    });
  }, []);
  return (
    <>
      <Form className="container mt-5">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Upload file</Form.Label>
          <Form.Control type="file" className="upload" />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            const element = document.querySelector(".upload");
            const user = await account.getSession("current");
            if (user) {
              await storeImage(element)();
              console.log("Uploaded");
            } else {
              await account.createAnonymousSession();
              await storeImage(element)();
              console.log("Uploaded");
            }
          }}
        >
          Submit
        </Button>
      </Form>
      <div className="d-flex gap-4 flex-wrap mt-5 container">
        {images.files.map((file) => {
          const image = storage.getFilePreview(
            "639e0a4de1f94c604975",
            file.$id
          );
          const download = storage.getFileDownload(
            "639e0a4de1f94c604975",
            file.$id
          );
          return (
            <>
              <Card style={{ width: "18rem" }} key={Math.random()}>
                <Card.Img variant="top" src={image.href} />
                <Card.Body>
                  <Card.Title>{file.name}</Card.Title>
                  <Card.Text>{file.name + file.mimeType}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      document.location.href = download.href;
                    }}
                  >
                    Download
                  </Button>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </div>
    </>
  );
}

export default FileUpload;
