const db = require('../configs/db.config');


class Alumno{
    constructor({id, nombre, apellidoPaterno, apellidoMaterno, matricula, deleted, createdAt, updatedAt, deletedAt}) {
        this.id = id;
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.matricula = matricula;
        this.deleted = deleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
    static async getAll({offset, limit}) {
        const connection = await db.createConnection();
        let query = "SELECT id, nombre, apellidoPaterno, apellidoMaterno, matricula, deleted, createdAt, updatedAt, deletedAt FROM alumno WHERE deleted = 0 ORDER BY createdAt DESC";

        if (offset >= 0 && limit) {
            query += ` LIMIT ${offset}, ${limit}`;
        }

        const [rows] = await connection.query(query);
        connection.end();

        return rows;
    }

    static async getById(id) {
        const connection = await db.createConnection();
        const [rows] = await connection.execute("SELECT id, nombre, apellidoPaterno, apellidoMaterno, matricula, deleted, createdAt, updatedAt, deletedAt FROM alumno WHERE id = ? AND deleted = 0", [id]);
        connection.end();

        if (rows.length > 0) {
            const row = rows[0];
            return new Alumno({
                id: row.id, 
                nombre: row.nombre, 
                apellidoPaterno: row.apellidoPaterno, 
                apellidoMaterno: row.apellidoMaterno, 
                matricula: row.matricula, 
                deleted: row.deleted, 
                createdAt: row.createdAt, 
                updatedAt: row.updatedAt, 
                deletedAt: row.deletedAt});
        }

        return null;
    }

    static async create ({nombre, apellidoPaterno, apellidoMaterno, matricula}) {
        const connection = await db.createConnection();
        const [result] = await connection.execute("INSERT INTO alumno(nombre, apellidoPaterno, apellidoMaterno, matricula) VALUES (?,?,?,?)", [nombre, apellidoPaterno, apellidoMaterno, matricula]);
        connection.end();
        return result.insertId;
    }

    static async updateById(id, { nombre, matricula }) {
        const connection = await db.createConnection();

        const updatedAt = new Date();
        const [result] = await connection.execute("UPDATE usuarios SET nombre = ?, matricula = ?, updatedAt = ? WHERE id = ?", [nombre, matricula, updatedAt, id]);

        if (result.affectedRows == 0) {
            throw new Error("no se actualizó el usuario");
        }

        return
    }

    static async deleteLogicoById (id) {
        const connection = await db.createConnection();
        const deletedAt = new Date();
        const [result] = await connection.execute("UPDATE alumno SET deleted = 1, deletedAt = ? WHERE id = ?", [deletedAt, id]);
        connection.end();
        return result.affectedRows;
    }

    static async count () {
        const connection = await db.createConnection();
        const [rows] = await connection.execute("SELECT COUNT(*) AS total FROM alumno WHERE deleted = 0");
        connection.end();
        return rows[0].total;
    }


}

module.exports = Alumno;