"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const router = express_1.default.Router();
router.get('/uuids', (req, res) => {
    const uuids = Array.from({ length: 8 }, () => (0, uuid_1.v4)());
    res.json(uuids);
});
exports.default = router;
