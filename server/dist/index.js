"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use((0, cookie_parser_1.default)());
// CORS setup
const allowedOrigin = process.env.CLIENT_URL || '*';
console.log('Allowed Origin:', allowedOrigin);
app.use((0, cors_1.default)());
// app.use(cors({
//   origin: allowedOrigin,
//   credentials: true,
// }));
// Routes
app.use('/api/v1', routes_1.default);
app.get('/test', (req, res) => {
    res.send('Server is running');
});
// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
