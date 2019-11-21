const merge = require("webpack-merge");
const jetpack = require("fs-jetpack");
const base = require("./webpack.base.config");

// Test files will still be found if they're scattered in project.
// Here we're searching for them and generating entry file for webpack.

const srcDir = jetpack.cwd("tests/unit");
const tempDir = jetpack.cwd("temp");
const entryFilePath = tempDir.path("specs_entry.js");

const entryFileContent = srcDir
  .find({ matching: "*.spec.js" })
  .reduce((fileContent, path) => {
    const normalizedPath = path.replace(/\\/g, "/");
    return `${fileContent}import "../tests/unit/${normalizedPath}";\n`;
  }, "");

jetpack.write(entryFilePath, entryFileContent);

module.exports = env => {
  return merge(base(env), {
    entry: entryFilePath,
    output: {
      filename: "specs.js",
      path: tempDir.path()
    }
  });
};
