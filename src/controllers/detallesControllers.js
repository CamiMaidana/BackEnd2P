import { Detalles, Detalles } from "../models/models.js";

export const getDetalle = async(req,res) =>{
    const Detalles = await Detalles.findAll()
    res.json(Detalles)
}

export const postDetalle = async(req,res) =>{
    const {cantidad} = req.body
    const detalle = await Detalles.create({cantidad})
    res.json(detalle)
}
//PUT Detalle
export const putDetalle = async(req,res) =>{
    const {cantidad} = req.body
    const {id} = req.params
    const detalle = await Detalles.update({cantidad}, {where: {idproducto}})
    res.json(detalle)
}

//DELETE Detalle
export const deleteDetalle = async(req,res) =>{
    const {id} = req.params
    const detalle = await Detalles.destroy({where: {idproducto}})
    res.json(detalle)
}
