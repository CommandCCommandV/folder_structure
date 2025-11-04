import { Router } from "express";
import { validateMiddleware } from "./middlewares";
import { create } from "./controllers";


const userRoute = Router()

userRoute.post("/createuser", validateMiddleware, create)

export default userRoute