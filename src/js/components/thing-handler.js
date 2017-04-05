const HIDDEN_ATTRIBUTE = 'hidden';

/*function handlePopupColor($popupOverlay, isBlue) {
  if (isBlue) {
    $popupCloseButton.classList.add('ps_info-popup__close-btn--blue');
  }
}*/

function makeAjaxRequest (method, url, token) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('authorization', 'ApiKey ' + token);
    xhr.setRequestHeader('accept', 'text/json');
    xhr.setRequestHeader('cache-control', 'no-cache');
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}

function getAllThings() {
  makeAjaxRequest('GET', 'https://api.disruptive-technologies.com/v1/things', 'd45a7c14c88f48f5937a8fc3254378ad')
    .then(function (things) {
      console.log(things);
    })
    .catch(function (err) {
      console.error('Webstep, we got a problem!', err.statusText);
    });
}

class ThingHandler {
  constructor($button) {
    this.$button = $button;
  }

  init() {
    if (this.$button) {
      this.$button.addEventListener('click', this._handleButtonClick.bind(this), false);
    }
  }

  _handleButtonClick() {
    getAllThings();
  }
}

export default ThingHandler;