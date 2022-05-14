const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class album extends Model { }

module.exports = (sequelize) => 
    album.init(
        {
            AlbumId: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },  
            Title: {
                type: Sequelize.STRING
            }
        },
        { sequelize, modelName:'album' }
)