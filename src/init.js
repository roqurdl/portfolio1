import app from "./server";
const PORT = 5000;
function handleListen() {
  console.log(`http://localhost:${PORT}`);
}
app.listen(PORT, handleListen);
