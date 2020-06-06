const go = require('./Go')
const c = require('./Utils').calibrate

function rect(ator, w, h, origin = {}, start = "BOTTOM_LEFT", comment = "") {
    if (comment != "") this.comment(comment)
    if (Object.keys(origin).length != 0) go.to(ator, origin.x, origin.y)
    if (start == "CENTER") go.toRel(ator, -w / 2, -h / 2)
    ator.draw()
    ator.setRelative()
    let positions = ""
    switch (start) {
        case "TOP_LEFT":
            positions = [
                `X${c(ator, w)}`,
                `Y${c(ator, -h)}`,
                `X${c(ator, -w)}`,
                `Y${c(ator, h)}`
            ]
            break;
        case "TOP_CENTER":
            positions = [
                `X${c(ator, w / 2)}`,
                `Y${c(ator, -h)}`,
                `X${c(ator, -w)}`,
                `Y${c(ator, h)}`,
                `X${c(ator, w / 2)}`
            ]
            break;
        case "TOP_RIGHT":
            positions = [
                `Y${c(ator, -h)}`,
                `X${c(ator, -w)}`,
                `Y${c(ator, h)}`,
                `X${c(ator, w)}`
            ]
            break;
        case "CENTER_LEFT":
            positions = [
                `Y${c(ator, h / 2)}`,
                `X${c(ator, w)}`,
                `Y${c(ator, -h)}`,
                `X${c(ator, -w)}`,
                `Y${c(ator, h / 2)}`
            ]
            break;
        case "CENTER":
            positions = [
                `Y${c(ator, h)}`,
                `X${c(ator, w)}`,
                `Y${c(ator, -h)}`,
                `X${c(ator, -w)}`
            ]
            break;
        case "CENTER_RIGHT":
            positions = [
                `Y${c(ator, -h / 2)}`,
                `X${c(ator, -w)}`,
                `Y${c(ator, h)}`,
                `X${c(ator, w)}`,
                `Y${c(ator, -h / 2)}`
            ]
            break;
        case "BOTTOM_LEFT":
            positions = [
                `X${c(ator, h)}`,
                `Y${c(ator, w)}`,
                `X${c(ator, -h)}`,
                `Y${c(ator, -w)}`
            ]
            break;
        case "BOTTOM_CENTER":
            positions = [
                `X${c(ator, -w / 2)}`,
                `Y${c(ator, h)}`,
                `X${c(ator, w)}`,
                `Y${c(ator, -h)}`,
                `X${c(ator, -w / 2)}`
            ]
            break;
        case "BOTTOM_RIGHT":
            positions = [
                `Y${c(ator, h)}`,
                `X${c(ator, -w)}`,
                `Y${c(ator, -h)}`,
                `X${c(ator, w)}`
            ]
            break;
        default:
            positions = [
                `X${c(ator, h)}`,
                `Y${c(ator, w)}`,
                `X${c(ator, -h)}`,
                `Y${c(ator, -w)}`
            ]
            break;
    }
    ator.linearSequence(positions)
    ator.setAbsolute()
    if (start == "CENTER") go.toRel(ator, w / 2, h / 2)
}

module.exports = {
    rect: rect
}