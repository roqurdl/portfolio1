import "dotenv/config";
import "./db";
import "./models/Product";
import "./models/Stylist";
import "./models/User";
import "./models/Live";
import httpServer from "./server";

const PORT = 5000;
function handleListen() {
  console.log(`http://localhost:${PORT}`);
}

httpServer.listen(PORT, handleListen);
