const router = require("express").Router();

module.exports = (models) => {

    router.get("/", async (req, res)=> {
        const artist = await models.artist.findAll({})
            return res.status(200).json({
                data: artist
        });
    });

    return router;
}