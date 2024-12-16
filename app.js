import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swagger.js';
import cors from 'cors';
import routes from './routes/index.js';
import allPages from "./routes/pages/allPages.js";
import path from "path";
import {serveFolderIndex} from "./models/folderService.js";

const app = express();

const allowedOrigins = ['https://7bf0-102-0-17-52.ngrok-free.app', 'http://localhost:3000',
    'http://localhost:5000', 'http://127.0.0.1:5500', 'http://localhost:63342', 'http://localhost:3001'];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            console.error(`Blocked by CORS: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/kenf/management/', routes);
app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/api/kenf/management/pages/:folder/:title?', (req, res) => {
    const folderName = req.params.folder;

    serveFolderIndex(folderName, res);
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'http://localhost';

app.listen(PORT, () => {
    console.log(`Server is running on ${HOST}:${PORT}`);
    console.log(`Swagger docs available at ${HOST}:${PORT}/api-docs`);
});
