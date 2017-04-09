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

function updateTowelInfo($poolArea, thingId, hasTowels) {
    let $towelArea = $poolArea.querySelector('.mn_js-towels');
    let $towelPile = $towelArea.querySelector('div[data-thing-id="' + thingId + '"]');
    if (!$towelPile) {
        $towelPile = document.createElement('div');
        $towelPile.setAttribute('data-thing-id', thingId);
        $towelArea.appendChild($towelPile);
    } 
    let text = hasTowels ? ' har handdukar' : ' saknar handdukar';
    $towelPile.innerHTML = `${thingId + text}`;
}

function watchTowels($poolArea) {
    const esDoor = new EventSource('https://api.disruptive-technologies.com/v1/subscribe?apikey=' + API_KEY + '&thing_ids=206848899&thing_ids=206851841&thing_ids=206878213');
    esDoor.onmessage = function (data) {
        const result = JSON.parse(data.data).result;
        const hasTowels = result.state_changed.object_present;
        updateTowelInfo($poolArea, result.thing_id, hasTowels);
    };
    esDoor.onerror = function (e) {
    console.log("An error occurred: ", e);
    };
}

/*function watchTowels($poolArea) {
    let $towels = $poolArea.querySelector('.mn_js-towels');
    let thingIds = $towels.getAttribute('thing-id').split(',');
    let es = new EventSource('https://api.disruptive-technologies.com/v1/subscribe?apikey=' + API_KEY + thingIds.forEach(thingId => ''));//'&thing_ids=' + $towels.getAttribute('thing-id'));
    es.onmessage = function (response) {
        console.log(JSON.parse(response.data));
        
    };
    es.onerror = function (e) {
        console.log('Webstep, we got a problem!', e);
    }
}*/

class Pool {
  constructor($pool) {
    this.$pool = $pool;
  }

  init() {
    if (this.$pool) {
        ['206848899', '206851841', '206878213'].forEach((thingId) => {
            isThingInfoRequest(thingId).then(result => updateTowelInfo(this.$pool, thingId, result.object_present)); 
        });
        watchTowels(this.$pool);
    }
  }
}

export default Pool;