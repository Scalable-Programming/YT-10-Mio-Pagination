import { config } from "./../config";
import { Movie } from "./types";
import { Collection, Document, MongoClient } from "mongodb";

interface MovieSchema extends Movie, Document {}

const client = new MongoClient(config.mongoUrl);
client.connect();

let collection: Collection<MovieSchema>;

export const getCollection = () => {
  if (collection) {
    return collection;
  }

  const db = client.db(config.mongoDatabaseName);

  collection = db.collection("movies");

  return collection;
};
