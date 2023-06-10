import express from "express";
import {getClientes, postClientes, putClientes, deleteClientes, getClienteById} from "../controllers/clienteControllers.js"
const router = express.Router()

router.get("/", getClientes)  //al pasar asi pasa la funcion entera si pasa como getClientes(), pasa el resultado de la funcion 
router.post("/", postClientes)
router.put("/:id", putClientes)
router.delete("/:id", deleteClientes)
router.get("/:id", getClienteById)

export default router
