import httpServer from "./server";

const PORT = 5000;
function handleListen() {
  console.log(`http://localhost:${PORT}`);
}
httpServer.listen(PORT, handleListen);
