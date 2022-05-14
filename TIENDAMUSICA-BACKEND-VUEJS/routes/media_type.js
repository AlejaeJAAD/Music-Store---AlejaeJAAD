const router = require("express").Router();

module.exports = (models) => {

    router.get("/", async (req, res)=> {
        const mediaTypes = await models.media_type.findAll({})
        return res.status(200).json({
            data: mediaTypes,
        
        });

    });

    return router;
}