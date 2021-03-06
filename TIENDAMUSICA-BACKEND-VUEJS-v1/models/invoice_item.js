const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class invoices_items extends Model { }

module.exports = (sequelize) => 
    invoices_items.init(
        {
            InvoiceItemId: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },  
            UnitPrice: {
                type: Sequelize.NUMBER
            },
            Quantity:{
                type: Sequelize.INTEGER
            }
        },{ sequelize, modelName:'invoice_item' }
)