import {utilities} from './..';

const API_KEY  = 'd45a7c14c88f48f5937a8fc3254378ad';

function isThingInfoRequest(thingId) {
    var xmlhttp = new XMLHttpRequest();
    return new Promise((resolve) => {
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
                if (xmlhttp.status == 200) {
                    resolve(JSON.parse(xmlhttp.response).state.properties);
                }
                else if (xmlhttp.status == 400) {
                    alert('There was an error 400');
                }
                else {
                    alert('something else other than 200 was returned');
                }
            }
        };
        xmlhttp.open("GET", `https://api.disruptive-technologies.com/v1/things/${thingId}`, true);
        xmlhttp.setRequestHeader("authorization", "ApiKey d45a7c14c88f48f5937a8fc3254378ad");
        xmlhttp.setRequestHeader("cache-control", "no-cache");
        xmlhttp.send();
    });
}

function isCleaningInterval() {
    const startTime = '8:00 AM';
    const endTime   = '7:00 PM';
    const now       = new Date();
    const startDate = dateObj(startTime);
    const endDate   = dateObj(endTime);
    return now < endDate && now > startDate;
}

function dateObj(d) {
    const parts = d.split(/:|\s/);
    const date  = new Date();
    if (parts.pop().toLowerCase() == 'pm') parts[0] = (+parts[0]) + 12;
    date.setHours(+parts.shift());
    date.setMinutes(+parts.shift());
    return date;
}

function timeDifference(previous) {
    //const msPerMinute = 60 * 1000;
    const elapsed = new Date().getTime() - previous;
    return Math.round(elapsed/1000)
}

function addIconAndText($iconTextArea, className, text) {
    /*if($iconTextArea.firstElementChild) {
        $iconTextArea.innerHTML = '';
    } else {
        let iconText = document.createElement('div');
        iconText.classList.add(className);
        iconText.innerText = text;
        $iconTextArea.appendChild(iconText);
    }*/
    if (className && text) {
        $iconTextArea.innerHTML = `<div class="${className}">${text}</div>`;
    } else {
        $iconTextArea.innerHTML = '';
    }
}

function watchCleaning($roomArea) {
    const esDoor = new EventSource('https://api.disruptive-technologies.com/v1/subscribe?apikey=' + API_KEY + '&thing_ids=206871429');
    esDoor.onmessage = function (data) {
        const result = JSON.parse(data.data).result;
        const now    = new Date();
        const doorIsClosed = result.state_changed.object_present;
        if (isCleaningInterval() && !doorIsClosed) {
            console.log('-----------> The door is open in a cleaning interval, saving the start time ' + now.getTime());
            localStorage.setItem('opened', new Date().getTime());
            //$roomArea.querySelector('.mn_js-door').innerText = 'Dörren är öppen';
            addIconAndText($roomArea.querySelector('.mn_js-door'), 'mn_room__door-open', 'Dörren är öppen');
        } else if (doorIsClosed) {
            //$roomArea.querySelector('.mn_js-door').innerText = 'Dörren är stängd';
            addIconAndText($roomArea.querySelector('.mn_js-door'), 'mn_room__door-closed', 'Dörren är stängd');
            const lastOpened = localStorage.getItem('opened');
            isThingInfoRequest('206877446').then((result) => {
                const windowIsClosed = result.object_present;
                //$roomArea.querySelector('.mn_js-window').innerText = 'Fönstret är ' + (windowIsClosed ? 'stängt' : 'öppet');
                addIconAndText($roomArea.querySelector('.mn_js-window'), 'mn_room__clean-my-room', 'Fönstret är ' + (windowIsClosed ? 'stängt' : 'öppet'));
                if (lastOpened) {
                    if (timeDifference(lastOpened) > 5 && windowIsClosed) {
                        localStorage.removeItem('opened');
                        //$roomArea.querySelector('.mn_js-cleaned').innerText = 'Rummet är städat';
                        addIconAndText($roomArea.querySelector('.mn_js-cleaned'), 'mn_room__clean-my-room', 'Rummet är städat');
                        addIconAndText($roomArea.querySelector('.mn_js-clean-my-room'), null, null);
                        //$roomArea.querySelector('.mn_js-clean-my-room').innerHTML = '';
                    }
                }
            }); 
        }
    };
    esDoor.onerror = function (e) {
    console.log("An error occurred: ", e);
    };
}

function watchDoorBroken($roomArea) {
    const esDoor = new EventSource('https://api.disruptive-technologies.com/v1/subscribe?apikey=' + API_KEY + '&thing_ids=206871429');        
    let clock;
    let sec = 0;
    esDoor.onmessage = function (data) {
        const result = JSON.parse(data.data).result;
        if (!result.state_changed.object_present) {
            console.log("-----------> The door is open, start counting and hope it's not broken");
            clock = setInterval(() => {
                sec = sec + 1;
                console.log('Sekunder: ' + sec);
                if (sec > 10) {
                    window.clearInterval(clock);
                    addIconAndText($roomArea.querySelector('.mn_js-door'), 'mn_room__clean-my-room', 'Dörren är trasig');
                    //$roomArea.querySelector('.mn_js-door').innerText = 'Dörren är trasig';
                }
            }, 1000);
        } else {
            sec = 0;
            window.clearInterval(clock);
        }
    };
    esDoor.onerror = function (e) {
    console.log("An error occurred: ", e);
    };
}

function watchCleanMyRoom($roomArea) {
    let $cleanMyRoomArea = $roomArea.querySelector('.mn_js-clean-my-room');
    let es = new EventSource('https://api.disruptive-technologies.com/v1/subscribe?apikey=' + API_KEY + '&thing_ids=' + $cleanMyRoomArea.getAttribute('thing-id'));
    es.onmessage = function (response) {
        console.log(JSON.parse(response.data));
        addIconAndText($cleanMyRoomArea, 'mn_room__clean-my-room', 'Städa mitt rum');
    };
    es.onerror = function (e) {
        console.log('Webstep, we got a problem!', e);
    }
}

function watchRoomTemp($roomArea) {
    let $roomTemp = $roomArea.querySelector('.mn_js-room-temp');
    var es = new EventSource('https://api.disruptive-technologies.com/v1/subscribe?apikey=' + API_KEY + '&thing_ids=' + $roomTemp.getAttribute('thing-id'));
    es.onmessage = function (response) {
        console.log(JSON.parse(response.data));
        $roomTemp.innerText = '(' + JSON.parse(response.data).result.state_changed.temperature + '°C)';
    };
    es.onerror = function (e) {
        console.log('Webstep, we got a problem!', e);
    }
}

class Room {
  constructor($room) {
    this.$room = $room;
  }

  init() {
    if (this.$room) {
        isThingInfoRequest('206877446').then(result => addIconAndText(this.$room.querySelector('.mn_js-window'), 'mn_room__clean-my-room', 'Fönstret är ' + (result.object_present ? 'stängt' : 'öppet'))); 
        isThingInfoRequest('206871429').then(result => addIconAndText(this.$room.querySelector('.mn_js-door'), 'mn_room__door-closed', 'Dörren är ' + (result.object_present ? 'stängt' : 'öppet'))); 
        isThingInfoRequest('206857986').then((result) => {
            let $roomTemp = this.$room.querySelector('.mn_js-room-temp');
            $roomTemp.innerText = '(' + result.temperature + '°C)';
        }); 
        watchRoomTemp(this.$room);
        watchCleanMyRoom(this.$room);
        watchDoorBroken(this.$room);
        watchCleaning(this.$room);
    }
  }
}

export default Room;