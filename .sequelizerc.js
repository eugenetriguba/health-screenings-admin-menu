"use strict";

const path = require("path");

module.exports = {
    config: path.join(__dirname, "src/database/config.json"),
    "migrations-path": path.join(__dirname, "src/database/migrations"),
    "seeders-path": path.join(__dirname, "src/database/seeders"),
    "models-path": path.join(__dirname, "src/database/models"),
};
