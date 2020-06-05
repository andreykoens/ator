const fs = require('fs');
module.exports = () => {
    const s = this.settings
    fs.writeFileSync("public/test.gcode", s.fileName)
}