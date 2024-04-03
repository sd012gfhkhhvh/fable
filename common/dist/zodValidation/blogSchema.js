"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostInput = exports.createPostInput = void 0;
const zod_1 = require("zod");
exports.createPostInput = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
exports.updatePostInput = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    id: zod_1.z.string(),
});
