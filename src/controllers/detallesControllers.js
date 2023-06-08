import { Detalles } from "../models/models.js";

export const getDetalle = async(req,res) =>{
    const Detalle = await Detalles.findAll()
    res.json(Detalle)
}

export const postDetalle = async(req,res) =>{
    const {cantidad} = req.body
    const detalle = await Detalles.create({cantidad})
    res.json(detalle)
}
//PUT Detalle
export const putDetalle = async(req,res) =>{
    const {cantidad} = req.body
    const {idproducto} = req.params
    const detalle = await Detalles.update({cantidad}, {where: {idproducto}})
    res.json(detalle)
}

//DELETE Detalle
export const deleteDetalle = async(req,res) =>{
    const {idproducto} = req.params
    const detalle = await Detalles.destroy({where: {idproducto}})
    res.json(detalle)
}
