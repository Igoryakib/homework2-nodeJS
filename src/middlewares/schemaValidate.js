module.exports = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, {
            aboutEarly: false,
        });
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};