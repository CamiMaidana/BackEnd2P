import express from "express";
import {getCabecera,postCabecera, putCabecera, deleteCabecera} from "../controllers/cabeceraControllers.js" 
const router = express.Router()

router.get("/", getCabecera)  //al pasar asi pasa la funcion entera si pasa como getCabecera(), pasa el resultado de la funcion 
router.post("/", postCabecera)
router.put("/:idmesa", putCabecera)
router.delete("/:idmesa", deleteCabecera)

export default router
