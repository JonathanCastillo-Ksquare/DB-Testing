"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const admin = __importStar(require("firebase-admin"));
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // los JWT viajan en un header llamado Authorization, tiene un schema y unos parametros, en especial el Bearer, aqui se pasa el token, el header tiene que tener authorization, sino existe no mandaron el token y no estan autorizados
    //No authorization header
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send({ error: 'No auth' });
    }
    //No correct scheme(Bearer)
    if (!authorization.startsWith("Bearer")) {
        return res.status(401).send({ error: 'No auth' });
    }
    //Check if the token is valid
    const splittedtoken = authorization.split("Bearer ");
    if (splittedtoken.length !== 2) {
        return res.status(401).send({ error: 'No auth' });
    }
    //Verify if firebase detects the token because we did not create this token, firebase made the token
    const token = splittedtoken[1];
    try {
        const decodedToken = yield admin.auth().verifyIdToken(token);
        res.locals = Object.assign(Object.assign({}, res.locals), { email: decodedToken.email, uid: decodedToken.uid, role: decodedToken.role });
        return next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).send({ error: 'No auth' });
    }
    // si todo esto pasa nuestro usuairo esta correctamente autenticado y tiene derecho a acceder a los recursos
});
exports.isAuthenticated = isAuthenticated;
