import mongoose from "mongoose";

mongoose.connect(`mongodb://127.0.0.1:27017/herse`);

const db = mongoose.connection;

const handleDbError = (error) => console.log(`DB error`, error);
const handleDbOpen = () => console.log(`DB is Connected.`);

db.on(`error`, handleDbError);
db.once(`open`, handleDbOpen);
