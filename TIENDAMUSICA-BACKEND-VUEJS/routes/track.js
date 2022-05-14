const router = require("express").Router();

module.exports = (models) => {

    //Obtiene todos los tracks
    router.get("/", async (req, res)=> {
        const tracks = await models.track.findAll({})
        return res.status(200).json({
            data: tracks
    
        });

    });

    //Obtiene los tracks del artista
    router.get("/:Artistid", async (req, res)=> {
        try {
            const { params: { Artistid } } = req
            const artist = await models.artist.findByPk(Artistid)
            if (!artist) {
                return res.status(404).json({
                    message: "El artista no existe"
                })
            }
            album = await artist.getAlbum()
            arrayTracks = Array()
            for (let index = 0; index < album.length; index++) {
                const track = await album[index].getTrack()
                console.log(album[index].dataValues)
                for (let index = 0; index < track.length; index++) {
                    arrayTracks.push(track[index].dataValues)                    
                }                
            }
            res.send(arrayTracks)
        } catch (error) {
            return res.status(404).json({
                message: "No se pudieron obtener los tracks del artista"
            })
        }
    });

    return router;
}