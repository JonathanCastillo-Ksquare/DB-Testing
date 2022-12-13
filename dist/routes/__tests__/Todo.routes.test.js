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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("../../app"));
const models_1 = require("../../models");
const supertest_1 = __importDefault(require("supertest"));
const configDBs_1 = __importDefault(require("../../models/configDBs"));
describe('Todo routes', () => {
    let testDB;
    // teasegura que se ejecuta antes que las pruebas se ejecuten
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        testDB = (0, models_1.startSequelize)(configDBs_1.default.test.database, configDBs_1.default.test.password, configDBs_1.default.test.host, configDBs_1.default.test.username);
        yield testDB.sync({ force: true });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testDB.close();
    }));
    it('[POST] /todos - should return 201 after its creation', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/todos')
            .send({ description: 'Unit testing with Jest and Supertest' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
            id: 1
        });
    }));
    it('[POST] /todos - should return 400 after receiving incorrect body', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/todos')
            .send({});
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({
            message: 'No description'
        });
    }));
});
