const core = require('../Core/Ator')
const Ator = core.Ator

function Init() {
    console.log("Sketch init".magenta)

    grbl = {
        130: 50,    // X max travel
        131: 40,    // Y max travel
        132: 100    // Z max travel
    }

    settings = {
        'fileName': 'test',
        'fileExtension': '.gcode',
        'f': 400,
        'zClear': 2
    }

    tools = {}

    a = new Ator(grbl, settings, tools)

    // ---
    a.getGRBL()
    a.setGRBL()
    
    // ---
    a.setAbsolute()
    a.setMeasure()
    a.setHome()
    a.clear()

    // ---
    a.comment('Draw Register')
    a.lineFromTo(-1.25, 1.25, 1.25, -1.25)
    a.lineFromTo(-1.25, -1.25, 1.25, 1.25)
    
    // ---
    a.comment('Draw Square Testing')
    let rt = {
        start: {x:0, y:2},
        outer: {w:5, h:5},
        inner: {w:1.5, h:1.5},
        gutter: 1,
        origins: [
            "BOTTOM_LEFT",
            "BOTTOM_CENTER",
            "BOTTOM_RIGHT",
            "CENTER_LEFT",
            "CENTER",
            "CENTER_RIGHT",
            "TOP_LEFT",
            "TOP_CENTER",
            "TOP_RIGHT"
        ]
    }
    
    rt.origins.forEach(
        (origin, i) => {
            a.rect(
                rt.outer.w, 
                rt.outer.h, 
                {
                    x: rt.start.x + (i * rt.outer.w) + (i * rt.gutter),
                    // y: rt.start.y + (i * rt.outer.h) + (i * rt.gutter)
                    y: 0
                },
                "BOTTOM_LEFT"
            )
            a.goToRel(rt.outer.w/2, rt.outer.h/2)
            a.rect(rt.inner.w, rt.inner.h, {}, origin)
        }
    )
    
    // ---
    a.log()
    
    // ---
    a.export()
}

module.exports = {
    Init: Init
}