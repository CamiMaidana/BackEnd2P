import express from "express"
import bodyParser from 'body-parser';
import cors from "cors"
import {sequelize} from "./src/models/models.js"
import RestauranteRouter from "./src/routes/restaurantesRouter.js"
import ClienteRouter from "./src/routes/clienteRouter.js"
import MesasRouter from "./src/routes/mesasRouter.js" 
import ReservasRouter from "./src/routes/reservasRouter.js"

const app = express()
await sequelize.sync()


app.use(cors({
    origin: '*'
}));

app.use(express.json());//Permite al servidor el uso de JSON
app.use(bodyParser.json());
app.use( bodyParser.urlencoded({ extended: false }) );


app.use("/Restaurante", RestauranteRouter)
app.use("/Cliente",ClienteRouter)
app.use("/Mesas",MesasRouter)
app.use("/Reservas",ReservasRouter)

const PORT = 3000
app.listen(PORT,()=>{//Hacer correr el servidor
    console.log(`Server is running on port ${PORT}`)
})
 