require("dotenv").config();
const express = require("express");

const authRouter = require("./routes/auth.route");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/", authRouter);

app.listen(PORT, () => {
  console.log(`server listening on PORT: ${PORT} 🚀`);
});