const colors = require('colors');
const path = require('path');

const Sketch = require('./Sketch/test.sketch').Init

Build = () => {
    console.log('App init'.magenta)
    Sketch()
}

module.exports = {
    Build: Build
}