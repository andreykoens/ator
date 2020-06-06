const line = require('./Line')

function calibrate(ator, val){
    return (ator.settings.calibration * val).toFixed(3)
}

function register(ator, x, y, side){
    ator.comment('Draw Register')
    line.fromTo(a, x-(side/2), y+(side/2), x+(side/2), y-(side/2))
    line.fromTo(a, x-(side/2), y-(side/2), x+(side/2), y+(side/2))
}

module.exports = {
    calibrate: calibrate,
    register: register
}