
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

function toPlace() {

}

module.exports = {
    to: to,
    toRel: toRel,
    toPlace: toPlace
}