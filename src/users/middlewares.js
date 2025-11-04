export const validateMiddleware = (req, res, next) => {
    const {name, email} = req.body;

    if (!email || typeof email != 'string' || !email.includes('@')) {
        return res.json({status: 400, "message": "Valid Email is required"})
    }

    if (!name) {
        return res.json({status: 400, message: "Feild is required"})
    }

    next()

}