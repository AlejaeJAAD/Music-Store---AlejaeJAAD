const router = require("express").Router();

module.exports = (models) => {

    //Obtener todas las playlist
    router.get("/", async (req, res) => 
    {
        const playlist = await models.playlist.findAll({})
            return res.status(200).json({
                data: playlist
            });

    });

    //Obtiene todas las playlists donde se encuntra el track
    

    return router;

}