import prisma from "../../db/db.config"

export const createUser = async(data) => {
    const {name, email} = data;

    const findUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (findUser) {
        const err = new Error("User Already Exist")
        err.statusCode = 409
        throw err
    }

    const user = await prisma.user.create({
        data: {
            name,
            email
        }
    })

    return user

}