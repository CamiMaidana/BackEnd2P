import { Cabecera, Detalles, Mesas} from "../models/models.js";

export const getCabeceraMesaAbierta = async (req, res) => {
    const id_mesa = await Mesas.findAll();
    try {
      //logOperation('Obtener cabecera abierta desde mesa');
      const consumoCabeceras = await Cabecera.findAll({
        where: {
          id_mesa,
          estado: "ABIERTO"
        },
        include: [
          {
            model: Detalles
          }
        ]
      });
      res.json(consumoCabeceras);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno en el servidor" });
    }
  }
  

export const getCabecera = async(req,res) =>{
    const Cabeceras = await Cabecera.findAll()
    res.json(Cabeceras)
}

export const postCabecera = async(req,res) =>{
    const {idmesa,idcliente,estado, total,fechainicio,horainicio,fechafin,horafin} = req.body
    const cabecera = await Cabecera.create({idmesa,idcliente,estado, total,fechainicio,horainicio,fechafin,horafin})
    res.json(cabecera)
}


//PUT Cabecera
export const putCabecera = async(req,res) =>{
    const {idcliente,estado, total,fechainicio,horainicio,fechafin,horafin} = req.body
    const {idmesa} = req.params
    const cabecera = await Cabecera.update({idcliente,estado, total,fechainicio,horainicio,fechafin,horafin}, {where: {idmesa}})
    res.json(cabecera)
}


export const deleteCabecera = async(req,res) =>{
    const {idmesa} = req.params
    const cabecera = await Cabecera.destroy({where: {idmesa}})
    res.json(cabecera)
}
