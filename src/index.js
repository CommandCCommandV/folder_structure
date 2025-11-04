const express = require("express");;
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

module.exports = { prisma }

const app = express();
app.use(express.json());

app.post("/api/users", async (req, res) => {
    const { email, name } = req.body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
        return res.status(400).json({ error: "Valid email is required." });
    }
    if (!name || typeof name !== "string") {
        return res.status(400).json({ error: "Valid name is required." });
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists." });
        }

        const user = await prisma.user.create({ data: { email, name } });
        return res.status(200).json({ message: "User created", user });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ err: "Internal Server Error" });
    }
});


app.listen(3000, () => console.log("Server running at http://localhost:3000"));

module.exports = {app}