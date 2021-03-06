const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class employees extends Model { }

module.exports = (sequelize) => 
    employees.init(
        {
            EmployeeId: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },  
            LastName: {
                type: Sequelize.STRING
            },
            FirstName: {
                type: Sequelize.STRING
            },
            Title: {
                type: Sequelize.STRING
            },
            BirthDate: {
                type: Sequelize.DATE
            },
            HireDate: {
                type: Sequelize.DATE
            },
            Address: {
                type: Sequelize.STRING
            },
	    City: {
		type: Sequelize.STRING
	    }
        },
        { sequelize, modelName:'employee' }
)