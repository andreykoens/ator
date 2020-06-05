
const grblDefault = require("./Config/GrblDefault")
const settingsDefault = require("./Config/SettingsDefault")
const toolsDefault = require("./Config/ToolsDefault")

const fs = require('fs');

class Ator {
    constructor(grbl, settings, tools) {
        this.gcode = ''
        
        this.grbl = { 
            ...grblDefault, 
            ...grbl 
        }
        this.settings = { 
            ...settingsDefault, 
            ...settings
        }
        this.tools = { 
            ...toolsDefault, 
            ...tools
        }
    }
}

// Ator.prototype.export = () => {
//     const s = this.settings
//     fs.writeFileSync("public/test.gcode", s.fileName)
// }

module.exports = {
    Ator: Ator
}