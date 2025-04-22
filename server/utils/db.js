import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://sakkapoltssi:Asdfg12345@cluster0.rymzgvj.mongodb.net/";

export const client = new MongoClient(connectionString, {});

export const db = client.db("auth");

export async function checkConnection() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  } finally {
    await client.close();
  }
}