const colors = require('colors');
const path = require('path');
const SerialPort = require("serialport")

const Sketch = require('./Sketch/test.sketch').Init

Build = () => {
    console.clear()
    console.log('App started'.gray)
    Sketch()

    SerialPort.list().then((ports, err) => {
        console.log(ports)
    })

    // let port = new SerialPort("/dev/COM4", {
    //     baudRate: 115200
    // })
    
    // stream.on("open", function(){
    //     console.log('open')
    //     stream.on('data', function(data){
    //         console.log(data)
    //     })
    // })
}

module.exports = {
    Build: Build
}