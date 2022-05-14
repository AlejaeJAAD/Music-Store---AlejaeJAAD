const router = require("express").Router();

module.exports = (models) => {

    //Obtiene todos los empleados
    router.get("/", async (req, res)=> {
        const employees = await models.employee.findAll({})
        return res.status(200).json({
            data: employees
        })
    });

    //Agrega un empleado nuevo
    router.post("/", async (req, res)=> {
        try {
            body = req.body
            if (!body.FirstName || !body.LastName || !body.Title ||!body.BirthDate || !body.HireDate ||  !body.Address) {
                return res.status(404).json({
                    message: "Informacion no valida",
                })
            }
            if (body.ReportsTo) {
                const jefe = await models.employee.findByPk(body.ReportsTo)
                if (!jefe) {
                    return res.status(404).json({
                        message: "El jefe no existe",
                    })
                }
            }
            const nuevoEmpleado = await models.employee.create(body)
            if (nuevoEmpleado) {
                return res.status(200).json({
                    data: nuevoEmpleado,
                    message: "Se agrego un empleado nuevo",
                })
            }
            else {
                return res.status(404).json({
                    message: "No se pudo agregar"
                })
            }
        } catch (error) {
            return res.status(404).json({
                data: null,
                message: "Error",
                error : error
            })
        }
    });

    //Actualiza datos del empleado
    router.put("/:id", async (req, res)=> {
        try {
            const { params: { id }, body } = req
            models.employee.findByPk(id).then(employee => {
                if (!employee) {
                    return res.status(404).json({
                        message: "El empleado no existe"
                    })
                }
                employee.update(req.body).then(employee => {
                        return res.status(204).json({
                            data: employee,
                            message: "Informacion de empleado actualizada con exito"
                        })
                    })
                })
        } catch (error) {
            return res.status(404).json({
                message: "Error"
            })
        }
    });

    //Elimina un empleado
    router.delete('/:id', async (req, res) => {
        const employees = await models.employee.findAll({})
        //console.log(employees, 'EMPLEADOS PA')
        try {
            const { params: { id }, body } = req
            models.employee.findByPk(id).then(employee => {
                console.log(id, 'ID USER')
                if (!employee) {
                    return res.status(404).json({
                        message: "El empleado no existe"
                    })
                }
                employee.destroy(req.body).then(employee => {
                    return res.status(204).json({
                        data: employee,
                        message: "Empleado eliminado con"
                    })
                })
            })
        } catch (error) {
            return res.status(404).json({
                message: "Error"
            })
        }
    });

    //Obtiene los subordinados de un empleado
    router.get("/:id", async (req, res)=> {
        try {
            const { params: { id }, body } = req
            models.employee.findByPk(id).then(employee => {
                if (!employee) {
                    return res.status(404).json({
                        message: "El empleado no existe"
                    })
                }
                employee.getEmployee().then(employess => {
                        return res.status(200).json({
                            data: employess,
                            message: "Empleados obtenidos con exito"
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