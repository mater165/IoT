const utilities = require('./index');

describe('toggleClass', function () {
  let $el;
  beforeEach(function () {
    $el = document.createElement('div');
    document.body.appendChild($el);
  });
  afterEach(() => {
    document.body.removeChild($el);
  });
  it('Add first class', function () {
    utilities.toggleClass($el, 'pretty');
    expect($el.className).toBe('pretty');
  });
  it('Add another class', function () {
    $el.className = 'super';
    utilities.toggleClass($el, 'pretty');
    expect($el.className).toBe('super pretty');
  });
  it('Remove only class', function () {
    $el.className = 'super';
    utilities.toggleClass($el, 'super');
    expect($el.className).toBe('');
  });
  it('Remove first class', function () {
    $el.className = 'super duper awesome';
    utilities.toggleClass($el, 'super');
    expect($el.className).toBe('duper awesome');
  });
  it('Remove middle class', function () {
    $el.className = 'super duper awesome';
    utilities.toggleClass($el, 'duper');
    expect($el.className).toBe('super awesome');
  });
  it('Remove last class', function () {
    $el.className = 'super duper awesome';
    utilities.toggleClass($el, 'awesome');
    expect($el.className).toBe('super duper');
  });
});