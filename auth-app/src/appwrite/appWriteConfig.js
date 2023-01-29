import { Client, Account } from "appwrite";
const client = new Client();
client.setEndpoint("http://127.0.0.1/v1").setProject("63d4fc36bf4512b2ff42");
export const account = new Account(client);
