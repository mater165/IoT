import {components, utilities} from './../src/js';
require('./main.scss');
const {qs, qsAll} = utilities;

//Print
components.print.init();

//Thing Handler
[].forEach.call(
    document.querySelectorAll('.mn_js-thing-handler'), 
    thingHandler => new components.thingHandler(thingHandler).init());