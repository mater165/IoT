const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];

const qs = document && document.querySelector.bind(document);

const qsAll = document && document.querySelectorAll.bind(document);

function unique(array) {
  return array.filter(function (element, position, array) {
    return array.indexOf(element) === position;
  });
}

function toggleClass($el, classString) {
  const patterns = [' ' + classString, classString + ' ', classString];
  const gotClass = patterns.some(pattern => {
    if (~$el.className.indexOf(pattern)) {
      $el.className = $el.className.replace(pattern, '');
      return true;
    }
    return false;
  });
  if (!gotClass) {
    $el.className = $el.className ? $el.className + ' ' + classString : classString;
  }
}

function timeZero(time) {
  return time < 10 ? '0' + time : time;
}

function parseDate(date) {
  const datum = new Date(date);
  return datum.getDate() + ' ' + MONTHS[datum.getMonth()] + ' ' + datum.getFullYear() + ' ' + timeZero(datum.getHours()) + ':' + timeZero(datum.getMinutes()) + ':' + timeZero(datum.getSeconds());
}

export {qs, qsAll, unique, toggleClass, parseDate};