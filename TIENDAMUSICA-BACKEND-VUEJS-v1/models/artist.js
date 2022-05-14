const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class artist extends Model { }

module.exports = (sequelize) => 
    artist.init(
        {
            ArtistId: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },  
            Name: {
                type: Sequelize.STRING
            }
        },
        { sequelize, modelName:'artist' }
)