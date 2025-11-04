import { createUser } from "./services";

export const create = async(req, res) => {
    try {
        const data = req.body;

        const resSer = await createUser(data);
        return res.status(201).json({resSer})

    } catch (error) {
        return res.status(error.statusCode).json({err: error.message})
    }
}