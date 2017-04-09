import {components, utilities} from './../src/js';
require('./main.scss');
const {qs, qsAll} = utilities;

//Print
components.print.init();

//Thing Handler
[].forEach.call(
    document.querySelectorAll('.mn_js-thing-handler'), 
    thingHandler => new components.thingHandler(thingHandler).init());

//Handle room
[].forEach.call(
    document.querySelectorAll('.mn_js-room'), 
    $room => new components.room($room).init());

//Handle pool
[].forEach.call(
    document.querySelectorAll('.mn_js-pool'), 
    $pool => new components.pool($pool).init());