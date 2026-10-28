(function(){
  const form=document.querySelector('#property-filters');if(!form)return;
  const grid=document.querySelector('#listing-grid'),count=document.querySelector('#result-count'),empty=document.querySelector('.empty-state'),more=document.querySelector('#load-more');
  const params=new URLSearchParams(location.search);['location','max','type','beds','baths'].forEach(key=>{const control=form.elements[key],value=params.get(key);if(control&&value)control.value=value;});
  let visible=6,results=[];
  function update(){const values=new FormData(form),locationTerm=(values.get('location')||'').trim().toLowerCase(),max=Number(values.get('max'))||Infinity,type=values.get('type')||'',beds=Number(values.get('beds'))||0,baths=Number(values.get('baths'))||0;
    results=window.HAVENSTONE_PROPERTIES.filter(home=>home.city.toLowerCase().includes(locationTerm)||home.address.toLowerCase().includes(locationTerm)||home.title.toLowerCase().includes(locationTerm)).filter(home=>home.price<=max&&home.beds>=beds&&home.baths>=baths&&(!type||home.status===type||home.type===type));
    if(values.get('sort')==='low')results.sort((a,b)=>a.price-b.price);if(values.get('sort')==='high')results.sort((a,b)=>b.price-a.price);
    grid.innerHTML=results.slice(0,visible).map(window.havenstonePropertyCard).join('');count.textContent=results.length+' '+(results.length===1?'home':'homes')+' to explore';empty.hidden=results.length!==0;more.hidden=results.length<=visible;
  }
  form.addEventListener('input',()=>{visible=6;update();});form.addEventListener('change',()=>{visible=6;update();});
  document.querySelectorAll('.clear-filters').forEach(button=>button.addEventListener('click',()=>{form.reset();history.replaceState(null,'',location.pathname);visible=6;update();}));
  more.addEventListener('click',()=>{visible+=6;update();});update();
})();