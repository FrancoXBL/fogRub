import express from "express";
const app = express();
import { crearArchivosDiarios } from "./utils/excelUtils.js";

import articleRoutes from '../src/routes/article.routes.js'
import ventasRoutes from '../src/routes/ventas.routes.js'
import clientRoutes from '../src/routes/client.routes.js'
import gastosRoutes from '../src/routes/gastos.routes.js'
import userRoutes from '../src/routes/user.routes.js'

crearArchivosDiarios()

app.use(express.json());

app.use('/api', articleRoutes)
app.use('/api', clientRoutes)
app.use('/api', ventasRoutes)
app.use('/api', gastosRoutes)
app.use('/api', userRoutes)

app.listen(3500);

console.log(`Server on port 3500`);