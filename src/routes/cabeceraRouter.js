import express from "express";
import {getCabecera,postCabecera, putCabecera, deleteCabecera} from "../controllers/cabeceraControllers.js" 
const router = express.Router()

router.get("/", getCabecera)  //al pasar asi pasa la funcion entera si pasa como getCabecera(), pasa el resultado de la funcion 
router.post("/", postCabecera)
router.put("/:id", putCabecera)
router.delete("/:id", deleteCabecera)

export default router
