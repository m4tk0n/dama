const root=document.querySelector('#app-view');
const versions=JSON.parse(root.dataset.assets||'{}');
const routes={
  home:{html:'pages/home.html',htmlVersion:versions.homeHtml,module:'./screens/home.js',moduleVersion:versions.homeJs},
  create:{html:'pages/create.html',htmlVersion:versions.createHtml,module:'./screens/create.js',moduleVersion:versions.createJs},
  game:{html:'pages/game.html',htmlVersion:versions.gameHtml,module:'./screens/game.js',moduleVersion:versions.gameJs},
  rooms:{html:'pages/rooms.html',htmlVersion:versions.roomsHtml,module:'./screens/rooms.js',moduleVersion:versions.roomsJs},
  online:{html:'pages/online.html',htmlVersion:versions.onlineHtml,module:'./screens/online.js',moduleVersion:versions.onlineJs},
  rules:{html:'pages/rules.html',htmlVersion:versions.rulesHtml,module:'./screens/rules.js',moduleVersion:versions.rulesJs},
  login:{html:'pages/login.html',htmlVersion:versions.loginHtml,module:'./screens/login.js',moduleVersion:versions.loginJs}
};
const pageCache=new Map();
const state={};
let currentRoute='home';

async function navigate(name,nextState={},updateHistory=true){
  const route=routes[name];
  if(!route)return;
  currentRoute=name;
  Object.assign(state,nextState);
  root.setAttribute('aria-busy','true');
  try{
    let markup=pageCache.get(name);
    if(!markup){
      const response=await fetch(route.html+'?v='+encodeURIComponent(route.htmlVersion||'0'),{cache:'default'});
      if(!response.ok)throw new Error('HTTP '+response.status);
      markup=await response.text();
      pageCache.set(name,markup);
    }
    if(currentRoute!==name)return;
    root.innerHTML=markup;
    const module=await import(route.module+'?v='+encodeURIComponent(route.moduleVersion||'0'));
    if(currentRoute!==name)return;
    await module.mount({navigate,root,state,versions});
    if(updateHistory)history.pushState({screen:name},'','?screen='+encodeURIComponent(name));
    window.scrollTo({top:0,behavior:'instant'});
  }catch(error){
    console.error('Načtení obrazovky selhalo:',name,error);
    root.innerHTML='<section class="screen"><div class="content-panel"><h1>Obrazovku se nepodařilo načíst</h1><p>Zkontrolujte připojení a zkuste to znovu.</p><button class="button button-primary" type="button" data-screen="home">Zpět na úvod</button></div></section>';
  }finally{
    root.removeAttribute('aria-busy');
  }
}

document.addEventListener('click',event=>{
  const button=event.target.closest('[data-screen]');
  if(!button)return;
  event.preventDefault();
  navigate(button.dataset.screen);
});
window.addEventListener('popstate',event=>{
  navigate(event.state?.screen||'home',{},false);
});
navigate('home',{},false);
