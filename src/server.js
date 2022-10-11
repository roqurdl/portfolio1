import express from "express";

const app = express();

app.use(`/`, homePage);
export default app;
