/* ---- the seal (holoSeal) ------------------------------------------------------
   Builds the markup that seal.css draws, so a caller need not paste the SVG.
   The animation itself is all CSS; see the header of seal.css.

     var seal = holoSeal(host);          // appends a seal to host, plays it
     holoSeal(host, { size: 78 });       // the size, in px
     holoSeal.replay(seal);              // plays it again, returns the new one

   Not in the source: EyeWire II writes the markup in its Vue template and
   plays the seal once, when the success view mounts. The builder and replay
   are new, for pages that show it more than once. */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';

  function svgEl(name, attrs) {
    var el = document.createElementNS(NS, name);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }

  function build(opts) {
    var seal = document.createElement('div');
    seal.className = 'holoseal';
    seal.setAttribute('aria-hidden', 'true');
    if (opts && opts.size) seal.style.setProperty('--holoseal-size', opts.size + 'px');
    var svg = svgEl('svg', { viewBox: '0 0 96 96' });
    svg.appendChild(svgEl('circle', { 'class': 'holoseal-ticks', cx: 48, cy: 48, r: 44 }));
    svg.appendChild(svgEl('circle', { 'class': 'holoseal-arc', cx: 48, cy: 48, r: 37 }));
    svg.appendChild(svgEl('circle', { 'class': 'holoseal-ring', cx: 48, cy: 48, r: 29, pathLength: 100 }));
    svg.appendChild(svgEl('path', { 'class': 'holoseal-check', pathLength: 100, d: 'M34 49.5 44 59 63 38.5' }));
    seal.appendChild(svg);
    ['holoseal-wave', 'holoseal-wave holoseal-wave--2'].forEach(function (c) {
      var w = document.createElement('span');
      w.className = c;
      seal.appendChild(w);
    });
    return seal;
  }

  function holoSeal(host, opts) {
    var seal = build(opts);
    host.appendChild(seal);
    return seal;
  }

  /* A fresh copy in the same place. Every animation starts from its first
     frame because the elements are new; nothing is restarted in place. */
  holoSeal.replay = function (seal) {
    var fresh = seal.cloneNode(true);
    seal.parentNode.replaceChild(fresh, seal);
    return fresh;
  };

  window.holoSeal = holoSeal;
})();
