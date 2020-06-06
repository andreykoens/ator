const colors = require('colors');
const path = require('path');

const Sketch = require('./Sketch/test.sketch').Init

Build = () => {
    console.clear()
    console.log('App started'.gray)
    Sketch()
}

module.exports = {
    Build: Build
}