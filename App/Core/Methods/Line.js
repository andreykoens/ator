const go = require('./Go')

function to(ator, x, y, comment = "") {
    if (comment != "") ator.comment(comment)
    ator.draw()
    ator.linear(x, y)
}

function fromTo(ator, ax, ay, bx, by, comment = "") {
    if (comment != "") ator.comment(comment)
    go.to(ator, ax, ay)
    ator.draw()
    ator.linear(bx, by)
}

module.exports = {
    to: to,
    fromTo: fromTo
}