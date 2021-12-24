const { dirname } = require('path');
console.log("require.main.filename", require.main.filename)
exports.APP_DIR = dirname(require.main.filename);