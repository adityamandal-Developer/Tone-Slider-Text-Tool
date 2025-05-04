import express from 'express';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors"
import dotenv from 'dotenv'
import chalk from 'chalk'
import morgan from 'morgan'
import helmet from 'helmet'

import { options } from './utils/swagger-options.js';
import textTone from './routes/core.js'
import { globalErrorHandler } from './utils/error-handler.js';
import { customFormat } from './utils/morgan.config.js';
import { limiter } from './utils/rate-limiter.js';

dotenv.config()

const PORT = process.env.PORT || 8080;
const specs = swaggerJsdoc(options);

const app = express();

/**
 * @Configuratinos
**/
app.set('trust proxy', 1);

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan(customFormat))
app.use(limiter)
/**
 * @Routes
**/
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

app.use("/api/v1", textTone)

app.use(globalErrorHandler);

app.listen(PORT, '0.0.0.0', () => {
    console.log(chalk.cyan(`Server is running on PORT ${PORT} 🚀`))
})

