const components = require('./index');
const initPrint = components.print.init;

describe('print', function() {
  let $wrapper;
  beforeEach(function() {
    $wrapper = document.createElement('div');

    $wrapper.innerHTML = `<button class="mn_js-print">Skriv ut</button>`;

    document.body.appendChild($wrapper);

    initPrint();
  });

  afterEach(function() {
    document.body.removeChild($wrapper);
  });

  it('prints on click', function() {
    spyOn(window, 'print');

    document.querySelector('.mn_js-print').click();

    expect(window.print).toHaveBeenCalled();
  });
});