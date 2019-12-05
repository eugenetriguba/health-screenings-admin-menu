const path = require("path");
const merge = require("webpack-merge");
const base = require("./webpack.base.config");

module.exports = env => {
    return merge(base(env), {
        entry: {
            background: "./app/background.js",
            auth: "./app/renderers/auth.js",
            home: "./app/renderers/home.js",
            waitlist: "./app/renderers/waitlist.js",
            screenings: "./app/renderers/screenings.js",
            settings: "./app/renderers/settings.js"
        },

        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "../temp"),
        }
    });
};
