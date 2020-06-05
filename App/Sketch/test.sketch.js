const core = require('../Core/Ator')
const Ator = core.Ator

function Init() {
    console.log("Sketch init".magenta)
    a = new Ator()
}

module.exports = {
    Init: Init
}