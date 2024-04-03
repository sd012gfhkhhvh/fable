"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSigninInput = exports.userSignupInput = void 0;
const zod_1 = require("zod");
exports.userSignupInput = zod_1.z.object({
    name: zod_1.z.string().max(20).optional(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.userSigninInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
