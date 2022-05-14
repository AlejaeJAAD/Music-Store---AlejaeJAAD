const router = require("express").Router();

module.exports = (models) => {

    //Obtiene toda la informacion de album
    router.get("/", async (req, res)=> {
        const albums = await models.album.findAll({})
        return res.status(200).json({
            data: albums
        });
    });

    //Obtiene los albums del artista por id
    router.get("/:id", async (req, res)=> {
        try {
            const { params: { id }, body } = req
            models.artist.findByPk(id)
            .then(artist => {
                if (!artist) {
                    return res.status(404).json({
                        message: "El artista no existe"
                    })
                }
                artist.getAlbum()
                    .then(album => {
                        return res.status(200).json({
                            data: album
                        })
                    })
                })
        } catch (error) {
            return res.status(404).json({
                message: "No fue posible obtener albums de artista"
            })
        }
    });

    return router;
}