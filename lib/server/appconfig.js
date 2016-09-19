'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var config = exports.config = {
    port: process.env.PORT || 3000,
    database: {
        name: process.env.DATABASE_NAME || '',
        username: process.env.DATABASE_USER || '',
        password: process.env.DATABASE_PASS || ''
    }
};