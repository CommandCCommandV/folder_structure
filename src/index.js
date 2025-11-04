const express = require("express");
const { default: userRoute } = require("./users/routes");

const app = express();
app.use(express.json());

app.use(userRoute)


app.listen(3000, () => console.log("Server running at http://localhost:3000"));

module.exports = {app}