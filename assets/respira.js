// Breathing guide of the topic pages: the counts of the app's lesson (one count, one second).
// <figure class="guia" data-ritmo="in:4,arriba:7,out:8" data-ciclos="4">. No motion with «Reducir movimiento».
(function () {
  var N = { in: ['Inspira', ''], arriba: ['Mantén', 'con el aire dentro'], out: ['Suelta', ''], abajo: ['Mantén', 'con el aire fuera'] };
  var T = { in: 1, arriba: 1, out: .58, abajo: .58 };
  document.querySelectorAll('.guia').forEach(function (g) {
    var fases = g.getAttribute('data-ritmo').split(',').map(function (x) { x = x.split(':'); return { k: x[0], s: +x[1] }; });
    var ciclos = +g.getAttribute('data-ciclos');
    function q(c) { return g.querySelector(c); }
    var circ = q('.guia__circulo'), nom = q('.guia__nombre'), sub = q('.guia__sub'), cic = q('.guia__ciclo'), voz = q('.guia__voz'), btn = q('.guia__boton');
    var reposo = [nom.textContent, sub.textContent, cic.textContent], t = null, ciclo, fase, cuenta;
    function pon() { var x = N[fases[fase].k][1]; sub.textContent = (x ? x + ' · ' : '') + cuenta; }
    function entra() {
      var f = fases[fase];
      cuenta = 1;
      circ.style.transitionDuration = f.s + 's';
      circ.style.transform = 'scale(' + T[f.k] + ')';
      nom.textContent = N[f.k][0] + ' ' + f.s;
      pon();
      cic.textContent = 'Ciclo ' + ciclo + ' de ' + ciclos;
      voz.textContent = N[f.k][0] + ' ' + f.s + (N[f.k][1] ? ', ' + N[f.k][1] : '');
    }
    function tic() {
      cuenta++;
      if (cuenta <= fases[fase].s) return pon();
      if (++fase === fases.length) { fase = 0; ciclo++; }
      if (ciclo > ciclos) return para(true);
      entra();
    }
    function para(fin) {
      clearInterval(t); t = null;
      circ.style.transitionDuration = '1.2s'; circ.style.transform = '';
      nom.textContent = fin ? 'Hecho' : reposo[0];
      sub.textContent = fin ? ciclos + ' ciclos' : reposo[1];
      cic.textContent = reposo[2];
      voz.textContent = fin ? 'Hecho, ' + ciclos + ' ciclos' : 'Parado';
      btn.textContent = fin ? 'Otra vez' : 'Empezar';
    }
    btn.hidden = false;
    btn.addEventListener('click', function () {
      if (t) return para(false);
      ciclo = 1; fase = 0; entra(); t = setInterval(tic, 1000); btn.textContent = 'Parar';
    });
  });
})();
