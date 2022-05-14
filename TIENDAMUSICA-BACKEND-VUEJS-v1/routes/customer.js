const router = require("express").Router();

module.exports = (models) => {

    router.get("/", async (req, res)=> {
        const customers = await models.customer.findAll({})
        return res.status(200).json({
            data: customers
        });

    });

    //Obtener los clientes atendidos por el empleado acorde a cierto ID
    router.get("/:id", async (req, res)=> {
        try {
            const { params: { id }, body } = req
            models.employee.findByPk(id)
            .then(employee => {
                if (!employee) {
                    return res.status(404).json({
                        message: "El empleado no existe"
                    })
                }
                employee.getCustomer()
                    .then(employess => {
                        return res.status(200).json({
                            data: employess,
                            message: "Se obtuvieron los clientes atentidos por cierto empleado"
                        })
                    })
                })
        } catch (error) {
            return res.status(404).json({
                message: "Error"
            })
        }
    });

    //Obtiene los generos de musica del cliente
    router.get("/:id/genres", async (req, res)=> {
        try {
            const { params: { id }, body } = req
            genreArray = Array()
            const customer = await models.customer.findByPk(id)
            const invoice = await customer.getInvoice()
            
            for (let index = 0; index < invoice.length; index++) {
                var invoice_item = await invoice[index].getInvoice_item();
                for (let index = 0; index < invoice_item.length; index++) {
                    const trackId = invoice_item[index].dataValues.TrackId
                    
                    track = await models.track.findByPk(trackId)
                    console.log(track.dataValues)
                    const id = track.dataValues.GenreId
                    const genre = await models.genre.findByPk(id)
                    
                    if (!genreArray.includes(genre)) {
                        genreArray.push(genre)
                    }
                }
            }
                return res.status(200).json({
                    data: genreArray,
                    message: "Se obtuvo el genero de musica del cliente"
                })
        } catch (error) {
            return res.status(404).json({
                message: "Error"
            })
        }
    });     

    //Obtiene todos los tracks comprados por el cliente
    router.get("/:id/tracks", async (req, res)=> {
        try {
            const { params: { id }, body } = req
            tracksArray = Array()
            const customer = await models.customer.findByPk(id)
            const invoice = await customer.getInvoice()
            
            for (let index = 0; index < invoice.length; index++) {
                var invoice_item = await invoice[index].getInvoice_item();
                for (let index = 0; index < invoice_item.length; index++) {
                    const trackId = invoice_item[index].dataValues.TrackId
                    
                    track = await models.track.findByPk(trackId)
                    if (!tracksArray.includes(track)) {
                        tracksArray.push(track.dataValues)
                    }
                }
            }
            return res.status(200).json({
                data: tracksArray,
                message: "Se obtuvieron los tracks comprados por el cliente"
            })
        } catch (error) {
            return res.status(404).json({
                message: "Error"
        })
        }
    });    

    return router;
}