import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
//import indexRoutes from './routes/index.js';
import authRoute from './routes/auth.js';
import dashboardRoutes from "./routes/dashboard.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
//app.use('/api', indexRoutes);
console.log("✅ Auth route file loaded successfully!");
app.use('/api/auth', authRoute);
app.use('/api/dashboard', dashboardRoutes);

app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// 6. Centralized error handler
app.use((err, req, res, next) => {
    console.error(err); // log full error on server
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ success: false, message });
});

export default app;