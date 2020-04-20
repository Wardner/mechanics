import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';

import customerRoutes from './routes/customer.routes';
import carRoutes from './routes/car.routes';
import serviceRoutes from './routes/service.routes';
import userRoutes from './routes/user.routes';
import teamRoutes from './routes/team.routes';
import loginRoutes from './routes/login.routes';
//Middleware para validar el token
import { tokenValidator } from './middlewares/auth.middleware';

const app = express();
createConnection()
    .then(connection => connection ?
        console.log(`Connected to DB: ${connection.options.database}`)
        : Error('Fail'));

//middlewares
app.use(cors());
app.use(morgan('dev'));
//Permite que manden json desde el FrontEnd
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use(userRoutes);
app.use(teamRoutes);
app.use(customerRoutes);
app.use(carRoutes);
app.use(serviceRoutes);
app.use(loginRoutes);

//Server Port
app.listen(process.env.PORT);
console.log('Server on Port', process.env.PORT);