import { io } from "./server";
import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const MONGO_URL = `mongodb://127.0.0.1:27017/herse`;

mongoose.connect(MONGO_URL);

const db = mongoose.connection;

const mongoClient = new MongoClient(MONGO_URL, {
  useUnifiedTopology: true,
});

export const mongoDbConnect = async () => {
  await mongoClient.connect();

  const mongoCollection = mongoClient.db(DB).collection(COLLECTION);

  await mongoCollection.createIndex(
    { createdAt: 1 },
    { expireAfterSeconds: 3600, background: true }
  );
  io.adapter(
    createAdapter(mongoCollection, {
      addCreatedAtField: true,
    })
  );
};

const handleDbError = (error) => console.log(`DB error`, error);
const handleDbOpen = () => console.log(`DB is Connected.`);

db.on(`error`, handleDbError);
db.once(`open`, handleDbOpen);
