const router = require("express").Router();

module.exports = (models) => {

    //Obtiene todas las facturas
    router.get("/", async (req, res)=> {
        const invoices = await models.invoice.findAll({})
        return res.status(200).json({
            data: invoices
        });

    });

    //Obtiene las facturas de un cliente a corde de cierto ID
    router.get("/:idCustomer", async (req, res)=> {
        try {
            const { params: { idCustomer }, body } = req
            models.customer.findByPk(idCustomer)
            .then(customer => {
                if (!customer) {
                    return res.status(404).json({
                        message: "No existe el cliente"
                })
                }
                customer.getInvoice()
                    .then(invoices => {
                        return res.status(200).json({
                            data: invoices,
                            message: "Se obtuvieron las facturas del cliente"
                    })
                    })
                })
        } catch (error) {
            return res.status(404).json({
                message: "Error"
        })
        }
    });

    //Obtiene todos los items de esa factura
    router.get("/items/:id", async (req, res)=> {
        try {
            const { params: { id }, body } = req
            models.invoice.findByPk(id)
            .then(invoice => {
                if (!invoice) {
                    return res.status(404).json({
                        message: "La factura no existe"
                })
                }
                console.log(invoice)
                invoice.getInvoice_item()
                    .then(items => {
                        return res.status(200).json({
                            data: items,
                            message: "Se obtuvo informacion de la factura"
                    })
                    })
                })
        } catch (error) {
            return res.status(404).json({
                message: "Error"
        })
        }
    });

    return router;
}