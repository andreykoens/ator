
function calibrate(ator, val){
    return (ator.settings.calibration * val).toFixed(3)
}

module.exports = {
    calibrate: calibrate
}