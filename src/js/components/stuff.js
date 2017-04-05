//---------------------- js - En instans
const flowIndicator = {
  _generateIndicatorHtml: function() {
    const nrOfPagesParam = this.$flowIndicator.getAttribute('data-ps_flow-indicator-nrofsteps');

  $listItemElements += `<li ${listItemClass}>
	<div class="ps_flow-indicator__indicator-circle-outer">Smurf</div>
  </li>`;

    return $listElement;
  },

  init: function($flowIndicator) {
    if ($flowIndicator) {
      this.$flowIndicator = $flowIndicator;
    }
  }
};

export default flowIndicator;

//---------------------- js - Flera instanser
const HIDDEN_ATTRIBUTE = 'hidden';

function handlePopupColor($popupOverlay, isBlue) {
  if (isBlue) {
    $popupCloseButton.classList.add('ps_info-popup__close-btn--blue');
  }
}

class InfoPopup {
  constructor($button) {
    this.$button = $button;
  }

  init() {
    if (this.$button) {
      this.$button.addEventListener('click', this._handleInfoButtonClick.bind(this), false);
    }
  }

  _handleInfoButtonClick() {
    handlePopupColor($popupOverlay, this.isBlue);
  }
}

export default InfoPopup;








// asynchronous operation
function cookBurger (type) { ... }

// regular operation
function makeMilkshake (type) { ... }

// order function which returns promise
function order (type) {
  return new Promise(function(resolve, reject) {
    var burger = cookBurger(type)
    burger.ready = function (err, burger) {
      if (err) {
        return reject(Error('Error while cooking'))
      }
      return resolve(burger)
    }
  })
}

order('JakeBurger')
  .then( burger => {
    const milkshake = makeMilkshake('vanilla')
    return { burger: burger, shake: milkshake }
  })
  .then( foodItems => {
    console.log('BURGER PARTY !', foodItems)
  })
  .catch( err => {
    console.log(err)
  })






var req = new XMLHttpRequest();

req.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    var response = JSON.parse(this.responseText);
    var things   = response.things;
    console.log("Response:", this.responseText);
  }
});

req.open("GET", "https://api.disruptive-technologies.com/v1/things");
req.setRequestHeader("authorization", "ApiKey <token>");
req.setRequestHeader("accept", "text/json");
req.setRequestHeader("cache-control", "no-cache");

req.send(null);