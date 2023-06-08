import {Productos} from "../models/models.js"

export const getProductos = async(req,res) =>{
    const Producto = await Productos.findAll()
    res.json(Producto)
}

export const postProductos = async(req,res) =>{
    const {nombre, idcategoria, precioventa} = req.body
    const productos = await Productos.create({nombre, idcategoria, precioventa})
    res.json(productos)
}
//PUT Productos
export const putProductos = async(req,res) =>{
    const {nombre, idcategoria, precioventa} = req.body
    const {id} = req.params
    const productos = await Productos.update({nombre, idcategoria, precioventa}, {where: {id}})
    res.json(productos)
}

//DELETE Productos
export const deleteProductos = async(req,res) =>{
    const {id} = req.params
    const productos = await Productos.destroy({where: {id}})
    res.json(productos)
}
