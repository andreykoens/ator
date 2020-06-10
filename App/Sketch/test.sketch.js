const Ator = require('../Core/Ator').Ator
const go = require('../Core/Methods/Go')
const line = require('../Core/Methods/Line')
const poly = require('../Core/Methods/Polygon')
const utils = require('../Core/Methods/Utils')

function Init(log = false) {
    console.log("Sketch started".gray)

    a = setup()
    draw(a)
    if (log) a.log()
    a.export()
}

function setup() {
    grbl = {
        130: 50,    // X max travel
        131: 40,    // Y max travel
        132: 100    // Z max travel
    }

    settings = {
        'fileName': 'test',
        'fileExtension': '.gcode',
        'f': 400,
        'zClear': 7,
        'zDraw': 2.75
    }

    tools = {}

    return new Ator(grbl, settings, tools)
}

function draw(a) {
    // ---
    // a.getGRBL()
    // a.setGRBL()

    a.setRelative()
    a.linear(-50, -50)

    // ---
    a.setAbsolute()
    a.setMeasure()
    a.setHome()
    a.clear()

    // ---
    utils.register(a, 1, 1, 3)

    // ---
    a.comment('Draw Square Testing')
    // let rt = {
    //     start: { x: 0, y: 25 },
    //     outer: { w: 50, h: 50 },
    //     inner: { w: 15, h: 15 },
    //     gutter: 10,
    //     origins: [
    //         [
    //             "BOTTOM_LEFT",
    //             "BOTTOM_CENTER",
    //             "BOTTOM_RIGHT",
    //         ],
    //         [
    //             "CENTER_LEFT",
    //             "CENTER",
    //             "CENTER_RIGHT",
    //         ],
    //         [
    //             "TOP_LEFT",
    //             "TOP_CENTER",
    //             "TOP_RIGHT"
    //         ]
    //     ]
    // }

    // rt.origins.forEach(
    //     (originSet, y) => {
    //         originSet.forEach(
    //             (origin, x) => {
    //                 poly.rect(
    //                     a,
    //                     rt.outer.w,
    //                     rt.outer.h,
    //                     {
    //                         x: rt.start.x + (x * rt.outer.w) + (x * rt.gutter),
    //                         y: rt.start.y + (y * rt.outer.h) + (y * rt.gutter)
    //                     },
    //                     "BOTTOM_LEFT"
    //                 )
    //                 go.toRel(a, rt.outer.w / 2, rt.outer.h / 2)
    //                 poly.rect(a, rt.inner.w, rt.inner.h, {}, origin)
    //             }
    //         )
    //     }
    // )

    // ---
    // randomLines = {
    //     start: { x: 0, y: 25 },
    //     outer: { w: 50, h: 50 },
    //     gutter: 10,
    //     lines: 50,
    //     margin: 5,
    //     qt: 3
    // }
    // rl = randomLines
    // for (i = 0; i < rl.qt; i++) {
    //     poly.rect(
    //         a,
    //         rl.outer.w,
    //         rl.outer.h,
    //         {
    //             x: rl.start.x + (i * rl.outer.w) + (i * rl.gutter),
    //             y: rl.start.y
    //         },
    //         "BOTTOM_LEFT"
    //     )
    //     let lines = rl.lines / (rl.qt-i)
    //     for (l = 0; l < lines; l++) {
    //         minX = (rl.start.x + (i * rl.outer.w) + (i * rl.gutter)) + rl.margin
    //         maxX = minX + rl.outer.w - (rl.margin * 2)
    //         minY = rl.start.y + rl.margin 
    //         maxY = minY + rl.outer.h - (rl.margin * 2)
    //         line.fromTo(
    //             a,
    //             Math.floor(Math.random() * (maxX - minX)) + minX, 
    //             Math.floor(Math.random() * (maxY - minY)) + minY, 
    //             Math.floor(Math.random() * (maxX - minX)) + minX,
    //             Math.floor(Math.random() * (maxY - minY)) + minY, 
    //         )
    //     }
    // }

    // ---
    randomRegisters = {
        start: { x: 0, y: 85 },
        outer: { w: 50, h: 50 },
        gutter: 10,
        registers: 50,
        margin: 5,
        qt: 3
    }
    rl = randomRegisters
    for (i = 0; i < rl.qt; i++) {
        poly.rect(
            a,
            rl.outer.w,
            rl.outer.h,
            {
                x: rl.start.x + (i * rl.outer.w) + (i * rl.gutter),
                y: rl.start.y
            },
            "BOTTOM_LEFT"
        )
        let registers = rl.registers / (rl.qt - i)
        for (l = 0; l < registers; l++) {
            minX = (rl.start.x + (i * rl.outer.w) + (i * rl.gutter)) + rl.margin + 5
            maxX = minX + rl.outer.w - (rl.margin * 2) - 5
            minY = rl.start.y + rl.margin +5
            maxY = minY + rl.outer.h - (rl.margin * 2) - 5
            utils.register(a, 
                Math.floor(Math.random() * (maxX - minX)) + minX,
                Math.floor(Math.random() * (maxY - minY)) + minY,
                Math.floor(Math.random() * 6) + 1,
            )
        }
    }


    // ---
    go.toPlace(a, "home")
}

module.exports = {
    Init: Init
}