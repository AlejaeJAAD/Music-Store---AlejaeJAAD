const router = require("express").Router();

module.exports = (models) => {

    router.get("/", async (req, res)=> {
        const invoices_items = await models.invoice_item.findAll({})
        return res.status(200).json({
            data: invoices_items
    
        });

    });

    return router;
}