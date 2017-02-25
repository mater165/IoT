function print() {
  window.print();
}
function init() {
  [].forEach.call(
      document.querySelectorAll('.mn_js-print'),
      btn => btn.addEventListener('click', print, false));
}
export default {init};