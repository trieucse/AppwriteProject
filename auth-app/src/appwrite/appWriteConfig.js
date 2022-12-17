import { Client, Account } from "appwrite";
const client = new Client();
client
  .setEndpoint("http://127.0.0.1/v1")
  .setProject("639cdef0a5afa8ad7e48");
export const account = new Account(client);