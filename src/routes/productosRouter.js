import express from "express";
import {getProductos, postProductos, putProductos, deleteProductos} from "../controllers/productosControllers.js"
const router = express.Router()

router.get("/", getProductos)  //al pasar asi pasa la funcion entera si pasa como getProductos(), pasa el resultado de la funcion 
router.post("/", postProductos)
router.put("/:id", putProductos)
router.delete("/:id", deleteProductos)

export default router
