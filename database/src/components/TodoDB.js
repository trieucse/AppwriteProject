import React, { useState, useEffect } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { account, databases } from "../appwrite/appWrite";
import { ID, Permission, Role } from "appwrite";
function getDB(formTodo) {
  return async () =>
    databases.createDocument(
      "639e23056e4e6ade2750",
      "639e2325ec55b98a2030",
      ID.unique(),
      {
        todoTitle: formTodo.todoTitle,
        todoEmail: formTodo.todoEmail,
      },
      [Permission.read(Role.any()), Permission.write(Role.any())]
    );
}
function TodoDB() {
  const [formTodo, setTodo] = useState({
    todoTitle: "",
    todoEmail: "",
  });
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    var user;
    account.getSession("current").then((data) => {
      user = data;
      if (Object.keys(user).length > 0) {
        databases
          .listDocuments("639e23056e4e6ade2750", "639e2325ec55b98a2030")
          .then((data) => {
            setTodos(data);
          });
      }
    });
  }, []);
  return (
    <div className="container mt-5">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter your todo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Todo"
            onChange={(e) => {
              setTodo({
                ...formTodo,
                todoTitle: e.target.value,
              });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter your Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              setTodo({
                ...formTodo,
                todoEmail: e.target.value,
              });
            }}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            const user = await account.getSession("current");
            if (Object.keys(user).length > 0) {
              console.log("Added");
              await getDB(formTodo)();
            } else {
              await account.createAnonymousSession();
              console.log("Added");
              await getDB(formTodo)();
            }
          }}
        >
          Enter Todo
        </Button>
      </Form>
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>Todo</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {todos?.documents?.length > 0 &&
            todos?.documents.map((data) => {
              return (
                <>
                  <tr>
                    <td>{data.todoTitle}</td>
                    <td>{data.todoEmail}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={async (e) => {
                          await databases.deleteDocument(
                            "639e23056e4e6ade2750",
                            "639e2325ec55b98a2030",
                            data.$id
                          );
                          databases
                            .listDocuments(
                              "639e23056e4e6ade2750",
                              "639e2325ec55b98a2030"
                            )
                            .then((data) => {
                              setTodos(data);
                            });
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default TodoDB;
