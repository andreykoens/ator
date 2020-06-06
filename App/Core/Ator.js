
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

    // ------------------------------------------------------------------------------------------
    // GCODE EDITING

    issue(command) {
        this.gcode += command + "; "
    }

    comment(comment, newLine = true) {
        if (newLine) this.issue("")
        if (comment != "") this.issue(`(${comment})`)
    }

    // ------------------------------------------------------------------------------------------
    // UTILITY

    getFormatted() {
        return this.gcode.replace(/;/gm, ";\n")
    }

    log(opt) {
        switch (opt) {
            case 'last':
                lastLine = this.getFormatted().split("\n")[-2]
                console.log(lastLine)
            break;
            default:
                console.log(this.getFormatted())
            break;
        }
    }

    // ------------------------------------------------------------------------------------------
    // FILE

    export() {
        let gcode = this.getFormatted()
        let fileId = this.settings.fileName + this.settings.fileExtension
        fs.writeFileSync("public/"+fileId, gcode)
    }

    // ------------------------------------------------------------------------------------------
    // GRBL CONFIG

    getGRBL() {
        this.issue("$$")
    }

    setGRBL() {
        this.comment("GRBL Configuration")
        for (let [k, v] of Object.entries(this.grbl)) {
            this.issue(`$${k} = ${v}`)
        }
    }

    // ------------------------------------------------------------------------------------------
    // ATOR CONFIG

    setHome(position = "") {
        if (position == "") position = `X0 Y0 Z${this.settings.zClear}`
        this.issue(`G92 ${position} (Set Home)`)
    }

    setAbsolute() {
        this.issue(`G90 (Absolute coordinates)`)
    }

    setRelative() {
        this.issue(`G91 (Relative coordinates)`)
    }

    setMeasure(type = 'mm') {
        switch (type) {
            case 'in':
                this.issue(`G20 (Measures in Inches)`)
            break;
            default:
                this.issue(`G21 (Measures in Milimiters)`)
            break;
        }
    }

    setClear(z = "") {
        if (z != "") this.settings.zClear = z
    }

    setDraw(z = "") {
        if (z != "") this.settings.zDraw = z
    }

    // ------------------------------------------------------------------------------------------
    // TOOLING CONFIG

    setTool(tId = 'default') {
        this.settings.tActive = tId 
        this.setClear(this.tools.default.zClear)
        this.setDraw(this.tools.default.zDraw)
    }

    addTool(tool = {
        'id': 'temp',
        'zClear': 10,
        'zDraw': 1
    }) {
        this.tools[tool.id] = tool
    }

    // ------------------------------------------------------------------------------------------
    // PRIMARY OPERATIONS

    clear() {
        this.issue(`G00 Z${this.settings.zClear} F${this.settings.zF}`)
    }

    draw() {
        this.issue(`G00 Z${this.settings.zDraw} F${this.settings.zF}`)
    }

    fast(x, y) {
        this.issue(`G00 X${x} Y${y}`)
    }

    linear(x, y) {
        this.issue(`G01 X${x} Y${y} F${this.settings.f}`)
    }

    linearSequence(positions) {
        for (let [k, position] of Object.entries(positions)) {
            if (k == 0) {
                this.issue(`G01 ${position} F${this.settings.f}`)
            } else {
                this.issue(`${position}`)
            }
        }
    }

    // ------------------------------------------------------------------------------------------
    // SECONDARY OPERATIONS

    goTo(x, y, comment="") {
        if (comment != "") this.comment(comment)
        this.clear()
        this.fast(x, y)
    }

    goToRel(x, y, comment="") {
        if (comment != "") this.comment(comment)
        this.clear()
        this.setRelative()
        this.fast(x, y)
        this.setAbsolute()
    }

    lineTo(x, y, comment="") {
        if (comment != "") this.comment(comment)
        this.draw()
        this.linear(x, y)
    }

    lineFromTo(ax, ay, bx, by, comment="") {
        if (comment != "") this.comment(comment)
        this.goTo(ax, ay)
        this.draw()
        this.linear(bx, by)
    }

    rect(w, h, origin = {}, start="BOTTOM_LEFT", comment="") {
        if (comment != "") this.comment(comment)
        if (Object.keys(origin).length != 0) this.goTo(origin.x, origin.y)
        if (start == "CENTER") this.goToRel(-w/2, -h/2)
        this.draw()
        this.setRelative()
        let positions = ""
        switch (start) {
            case "TOP_LEFT": positions = [`X${w}`, `Y${-h}`, `X${-w}`, `Y${h}`]; break;
            case "TOP_CENTER": positions = [`X${w/2}`, `Y${-h}`, `X${-w}`, `Y${h}`, `X${w/2}`]; break;
            case "TOP_RIGHT": positions = [`Y${-h}`, `X${-w}`, `Y${h}`, `X${w}`]; break;
            case "CENTER_LEFT": positions = [`Y${h/2}`, `X${w}`, `Y${-h}`, `X${-w}`, `Y${h/2}`]; break;
            case "CENTER": positions = [`Y${h}`, `X${w}`, `Y${-h}`, `X${-w}`]; break;
            case "CENTER_RIGHT": positions = [`Y${-h/2}`, `X${-w}`, `Y${h}`, `X${w}`, `Y${-h/2}`]; break;
            case "BOTTOM_LEFT": positions = [`X${h}`, `Y${w}`, `X${-h}`, `Y${-w}`]; break;
            case "BOTTOM_CENTER": positions = [`X${-w/2}`, `Y${h}`, `X${w}`, `Y${-h}`, `X${-w/2}`]; break;
            case "BOTTOM_RIGHT": positions = [`Y${h}`, `X${-w}`, `Y${-h}`, `X${w}`]; break;
            default: positions = [`X${h}`, `Y${w}`, `X${-h}`, `Y${-w}`]; break;
        }
        this.linearSequence(positions)
        this.setAbsolute()
        if (start == "CENTER") this.goToRel(w/2, h/2)
    }

}

// Ator.prototype.export = () => {
//     const s = this.settings
//     fs.writeFileSync("public/test.gcode", s.fileName)
// }

module.exports = {
    Ator: Ator
}