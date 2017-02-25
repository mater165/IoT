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

export {qs, qsAll, unique, toggleClass};