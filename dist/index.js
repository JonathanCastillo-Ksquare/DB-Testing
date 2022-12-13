"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Iniciar mi base de datos y mi servidor de express
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const models_1 = require("./models");
const app_1 = __importDefault(require("./app"));
const configDBs_1 = __importDefault(require("./models/configDBs"));
// Variables de entorno
const PORT = process.env.PORT;
const envRunning = process.env.ENVIRONMENT === 'testing' ? configDBs_1.default.test : configDBs_1.default.dev;
app_1.default.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sequelize = (0, models_1.startSequelize)(envRunning.database, envRunning.password, envRunning.host, envRunning.username);
        yield sequelize.sync({ force: process.env.ENVIRONMENT === 'testing' });
        console.log('DB and express server are up and running');
    }
    catch (error) {
        console.log(error);
        process.abort();
    }
}));
