
function to(ator, x, y, comment = "") {
    if (comment != "") this.comment(comment)
    ator.clear()
    ator.fast(x, y)
}

function toRel(ator, x, y, comment = "") {
    if (comment != "") this.comment(comment)
    ator.clear()
    ator.setRelative()
    ator.fast(x, y)
    ator.setAbsolute()
}

function toPlace(ator, place) {
    switch (place) {
        case "home":
            ator.clear()
            ator.fast(0, 0)
        break;
    }
}

module.exports = {
    to: to,
    toRel: toRel,
    toPlace: toPlace
}