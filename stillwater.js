(function(){
  var sw=document.getElementById('stillwater'); if(!sw) return;
  var NS='http://www.w3.org/2000/svg';
  function trees(svg,n,seed,minH,maxH){
    svg.setAttribute('viewBox','0 0 1000 100'); var d='M0 100 L0 60 ',x=0,r=seed;
    function rnd(){r=(r*9301+49297)%233280;return r/233280}
    while(x<1000){var w=18+rnd()*34,h=minH+rnd()*(maxH-minH);d+='L'+x+' '+(100-h)+' Q'+(x+w/2)+' '+(100-h-8)+' '+(x+w)+' '+(100-h*.8)+' ';x+=w}
    d+='L1000 100Z'; var p=document.createElementNS(NS,'path'); p.setAttribute('d',d); svg.appendChild(p);
  }
  trees(sw.querySelector('.sw-trees-far'),0,7,25,55);
  trees(sw.querySelector('.sw-trees-near'),0,3,30,70);
  // estrelas
  var cv=sw.querySelector('.sw-sky-canvas'),ctx=cv.getContext('2d'),stars=[];
  function size(){cv.width=cv.clientWidth;cv.height=cv.clientHeight;stars=[];for(var i=0;i<120;i++)stars.push([Math.random(),Math.random()*.6,Math.random()*1.4+.3,Math.random()*6])}
  function draw(t){ctx.clearRect(0,0,cv.width,cv.height);stars.forEach(function(s){ctx.globalAlpha=.4+.6*Math.abs(Math.sin(t/1200+s[3]));ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(s[0]*cv.width,s[1]*cv.height,s[2],0,7);ctx.fill()});
    if(!reduce) requestAnimationFrame(draw)}
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  size();addEventListener('resize',size);requestAnimationFrame(draw);
  var items=[].slice.call(sw.querySelectorAll('[data-in]'));
  function upd(){
    var r=sw.getBoundingClientRect(),total=sw.offsetHeight-innerHeight,p=Math.min(1,Math.max(0,-r.top/total));
    sw.style.setProperty('--p',p);
    sw.style.setProperty('--night',Math.min(1,Math.max(0,(p-.3)/.55)).toFixed(3));
    sw.style.setProperty('--rise',Math.min(1,p*3).toFixed(3));
    items.forEach(function(el){
      var a=parseFloat(el.dataset.in),b=el.dataset.out?parseFloat(el.dataset.out):null,o;
      var f=.025;
      if(p<a) o=0; else if(p<a+f) o=(p-a)/f; else if(b===null||p<b) o=1; else if(p<b+f) o=1-(p-b)/f; else o=0;
      el.style.opacity=o.toFixed(3); el.style.transform='translateY('+((1-o)*14)+'px)';
    });
    sw.classList.toggle('eyes-on',p>.54&&p<.66);
    sw.classList.toggle('done',p>.9);
  }
  addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
})();
