import { config } from "./../config";
import { Comment } from "./types";
import { Collection, Document, MongoClient } from "mongodb";

interface CommentSchema extends Comment, Document {}

const client = new MongoClient(config.mongoUrl);
client.connect();

let collection: Collection<CommentSchema>;

export const getCollection = () => {
  if (collection) {
    return collection;
  }

  const db = client.db(config.mongoDatabaseName);

  collection = db.collection("comments");

  return collection;
};
