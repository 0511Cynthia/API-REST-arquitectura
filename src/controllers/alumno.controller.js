const Alumno = require('../models/alumno.model');

const create = async (req, res) => {
    try {
        const {nombre, apellidoPaterno, apellidoMaterno, matricula} = req.body;
        await Alumno.create({nombre, apellidoPaterno, apellidoMaterno, matricula});

        return res.status(201).json({
            message: "alumno creado exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al crear el alumno",
            error: error.message
        });
    }
}

const getById = async (req, res) => {
    try {
        const idAlumno = req.params.id;
        const alumno = await Alumno.getById(idAlumno);

        if (!alumno) {
            return res.status(404).json({
                message: `alumno no encontrado`
            });
        }

        return res.status(200).json({
            id : alumno.id,
            nombre: alumno.nombre,
            apellidoPaterno: alumno.apellidoPaterno,
            apellidoMaterno: alumno.apellidoMaterno,
            matricula: alumno.matricula,
            deleted: alumno.deleted,
            createdAt: alumno.createdAt,
            updatedAt: alumno.updatedAt,
            deletedAt: alumno.deletedAt
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrio un error al encontrar al alumno",
        });
    }
}

const index = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const offset = (page - 1) * limit;

        const alumnos = await Alumno.getAll({offset, limit});

        let response = {
            message: "alumnos obtenidos exitosamente",
            data: alumnos
        };

        if (page && limit) {
            const totalAlumnos = await Alumno.count();
            response = {
                ...response,
                total: totalAlumnos,
                totalPages: Math.ceil(totalAlumnos / limit),
                currentPage: page
            };
        }

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener los alumnos",
            error: error.message
        });
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const datos_actualizar = {
            nombre: req.body.nombre,
            matricula: req.body.matricula
        }

        await Producto.updateById(id, datos_actualizar);

        return res.status(200).json({
            message: "el producto se actualizó correctamente"
        })
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al actualizar el producto",
            error: error.message
        })
    }
}

const logicDelete = async (req, res) => {
    try {
        const idAlumno = req.params.id
        const alumno = await Alumno.deleteLogicoById(idAlumno)
        if (!alumno) {
            return res.status(404).json({
                message: `alumno no encontrado`
            });
        }

        return res.status(200).json({
            message: "alumno eliminado exitosamente"
        })
    } catch (error) {
        return res.status(500).json({
            message: "ocurrio un error al eliminar alumno",
            error: error.message
        })
    }
}

module.exports = {
    create,
    index,
    getById,
    update,
    logicDelete
}