"use strict";

const path = require("path");

module.exports = {
    config: path.join(__dirname, "app/database/config.json"),
    "migrations-path": path.join(__dirname, "app/database/migrations"),
    "seeders-path": path.join(__dirname, "app/database/seeders"),
    "models-path": path.join(__dirname, "app/database/models")
};
