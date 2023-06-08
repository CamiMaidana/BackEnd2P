import express from "express";
import {getDetalle,postDetalle, putDetalle, deleteDetalle} from "../controllers/detallesControllers.js" 
const router = express.Router()

router.get("/", getDetalle)  //al pasar asi pasa la funcion entera si pasa como getDetalle(), pasa el resultado de la funcion 
router.post("/", postDetalle)
router.put("/:idproducto", putDetalle)
router.delete("/:idproducto", deleteDetalle)

export default router
