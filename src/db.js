require(`dotenv`).config();
import { io } from "./server";
import mongoose from "mongoose";
import { MongoClient } from "mongodb";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const mongoClient = new MongoClient(process.env.DB_URL, {
  useUnifiedTopology: true,
});

export const mongoDbConnect = async () => {
  await mongoClient.connect();

  const mongoCollection = mongoClient.db(db).collection(`mongoAdapter`);

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
