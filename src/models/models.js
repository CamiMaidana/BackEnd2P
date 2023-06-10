import Sequelize from "sequelize";

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite3"
})

export const Restaurante = sequelize.define("Restaurante", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: Sequelize.STRING
    },
    direccion: {
        type: Sequelize.STRING
    },
})

export const Cliente = sequelize.define("Cliente", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cedula:{
        type: Sequelize.STRING,
        unique: true,
    },
    nombre: {
        type: Sequelize.STRING
    },
    apellido: {
        type: Sequelize.STRING
    },
})

export const Mesas = sequelize.define("Mesas",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre:{
        type: Sequelize.STRING,
    },
    idRestaurante:{
        type: Sequelize.INTEGER,
    },
    posicionX:{
        type: Sequelize.INTEGER,
    },
    posicionY:{
        type: Sequelize.INTEGER,
    },
    piso:{
        type: Sequelize.INTEGER,
    },
    capacidad:{
        type: Sequelize.INTEGER,
    },
})

export const Reservas = sequelize.define("Reservas",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idRestaurante: {
        type: Sequelize.INTEGER,
    },
    idMesa:{
        type: Sequelize.INTEGER,
    },
    fecha:{
        type: Sequelize.DATE,
    },
    horario:{
        type: Sequelize.STRING,
    },
    idCliente:{
        type: Sequelize.INTEGER,
    },
    capacidad:{
        type: Sequelize.INTEGER,
    },
})


export const Categoria = sequelize.define("Categoria", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: Sequelize.STRING
    },
})

export const Productos = sequelize.define("Producto", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: Sequelize.STRING
    },
    idcategoria: {
        type: Sequelize.INTEGER,
        references: {
            model: Categoria,
            key: 'id'
        }
    },
    precioventa: {
        type: Sequelize.INTEGER,
    },
})

export const Cabecera = sequelize.define("Cabecera", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idmesa: {
        type: Sequelize.INTEGER,
    },
    idcliente: {
        type: Sequelize.INTEGER,
        references: {
            model: Cliente,
            key: 'id'
        }
    },
    estado: {
        type: Sequelize.STRING
    },
    total: {
        type: Sequelize.INTEGER,
    },
    fechainicio: {
        type: Sequelize.DATEONLY
    },
    horainicio: {
        type: Sequelize.INTEGER,
    },
    fechafin: {
        type: Sequelize.DATEONLY
    },
    horafin: {
        type: Sequelize.INTEGER,
    },
})

export const Detalles = sequelize.define("Detalles", {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idcabecera:{
        type: Sequelize.INTEGER,
        references: {
            model: Cabecera,
            key: 'id'
        }
    },
    idproducto: {
        type: Sequelize.INTEGER,
        references: {
            model: Productos,
            key: 'id'
        }
    },
    cantidad: {
        type: Sequelize.INTEGER,
    },
});

