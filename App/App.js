const colors = require('colors');
const path = require('path');

const sketch = require('./Sketch/test.sketch')
const Sketch = sketch.Init

init = () => {
    console.log('App init'.magenta)
    Sketch()
}

init()