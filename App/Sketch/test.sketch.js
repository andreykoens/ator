const Ator = require('../Core/Ator').Ator
const go = require('../Core/Methods/Go')
const line = require('../Core/Methods/Line')
const poly = require('../Core/Methods/Polygon')
const utils = require('../Core/Methods/Utils')

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
    utils.register(a, 0, 0, 10)
    
    // ---
    a.comment('Draw Square Testing')
    let rt = {
        start: {x:0, y:25},
        outer: {w:50, h:50},
        inner: {w:15, h:15},
        gutter: 10,
        origins: [
            [
                "BOTTOM_LEFT",
                "BOTTOM_CENTER",
                "BOTTOM_RIGHT",
            ],
            [
                "CENTER_LEFT",
                "CENTER",
                "CENTER_RIGHT",
            ],
            [
                "TOP_LEFT",
                "TOP_CENTER",
                "TOP_RIGHT"
            ]
        ]
    }
    
    rt.origins.forEach(
        (originSet, y) => {
            originSet.forEach(
                (origin, x) => {
                    poly.rect(
                        a,
                        rt.outer.w,
                        rt.outer.h,
                        {
                            x: rt.start.x + (x * rt.outer.w) + (x * rt.gutter),
                            y: rt.start.y + (y * rt.outer.h) + (y * rt.gutter)
                        },
                        "BOTTOM_LEFT"
                    )
                    go.toRel(a, rt.outer.w / 2, rt.outer.h / 2)
                    poly.rect(a, rt.inner.w, rt.inner.h, {}, origin)
                }
            )
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