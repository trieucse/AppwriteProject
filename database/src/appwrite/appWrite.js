import { Account, Client, Databases } from "appwrite";

const client = new Client()
  .setEndpoint("http://127.0.0.1/v1")
  .setProject("639cdef0a5afa8ad7e48");

export const databases = new Databases(client);
export const account = new Account(client);
