const router = require("express").Router();

module.exports = (models) => {

    router.get("/", async (req, res)=> {
        const genres = await models.genre.findAll({})
        return res.status(200).json({
            data: genres,
        });
        
    });

    return router;
}