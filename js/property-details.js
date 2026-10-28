(function(){
  const root=document.querySelector('#detail-content');if(!root)return;
  const all=window.HAVENSTONE_PROPERTIES||[],params=new URLSearchParams(location.search),home=all.find(item=>item.id===params.get('id'))||all[0];
  if(!home){root.innerHTML='<section class="empty-state"><h1>Home not found</h1><a class="button button-green" href="properties.html">Browse homes</a></section>';return;}
  document.title=home.title+' | Havenstone Realty';
  const photo=id=>'https://images.unsplash.com/'+id+'?auto=format&fit=crop&w=1400&q=85';
  const rent=home.status==='Rent',price=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(home.price)+(rent?' / month':'');
  const similar=all.filter(item=>item.id!==home.id&&item.status===home.status).slice(0,3);
  const saved = JSON.parse(localStorage.getItem('havenstone-favorites') || '[]').includes(home.id);
  root.innerHTML = `
    <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a> / <a href="properties.html">Homes</a> / ${home.city}</nav>
    <div class="detail-gallery">
      <img src="${photo(home.image)}" alt="Main view of ${home.title}">
      <img src="${photo('photo-1600607687920-4e2a09cf159d')}" alt="Interior detail of ${home.title}" loading="lazy">
      <img src="${photo('photo-1600566753086-00f18fb6b3ea')}" alt="Living space at ${home.title}" loading="lazy">
      <button class="gallery-button" type="button">View photographs ↗</button>
    </div>
    <section class="detail-heading"><div><p class="eyebrow">${home.status} · ${home.type} · Ref. ${home.id.toUpperCase()}</p><h1>${home.title}</h1><p>${home.address}</p></div><div class="detail-actions"><p class="property-price">${price}</p><button class="favorite-button detail-save" type="button" aria-label="${saved ? 'Remove from' : 'Add to'} saved homes" aria-pressed="${saved}" data-favorite="${home.id}">${saved ? '♥' : '♡'}</button></div></section>
    <div class="detail-columns"><div>
      <div class="detail-facts"><span>${home.beds} bedrooms</span><span>${home.baths} bathrooms</span><span>${home.area.toLocaleString()} sq ft</span><span>${home.type}</span></div>
      <h2>A little about this home</h2><p class="detail-description">${home.description}</p>
      <h2>Considered details</h2><ul class="feature-list">${home.features.map(feature => `<li>${feature}</li>`).join('')}</ul>
      <h2>Floor plan</h2><div class="map-placeholder" role="img" aria-label="Floor plan demonstration placeholder"><span>Floor plan</span><small>Available on request</small></div>
    </div><aside class="agent-card"><p class="eyebrow">A local conversation</p><h3>Maya Bennett</h3><p>Havenstone Property Advisor · Illustrative profile</p><a href="tel:+17185550148">+1 (718) 555-0148</a>
      <form class="demo-form"><label>Your email<input type="email" required placeholder="you@example.com"></label><label>Message<textarea rows="3" required placeholder="Interested in this home..."></textarea></label><button class="button button-green">Request details ↗</button><p class="form-feedback" aria-live="polite">Demo inquiry only; nothing is sent.</p></form>
    </aside></div>
    <section class="section section-pad"><div class="section-heading"><div><p class="eyebrow">Keep looking</p><h2>More homes to consider.</h2></div></div><div class="property-grid">${similar.map(window.havenstonePropertyCard).join('')}</div></section>`;
  const gallery=root.querySelector('.detail-gallery'),modal=document.createElement('div');modal.className='gallery-modal';modal.hidden=true;modal.innerHTML='<button type="button" aria-label="Close gallery">Close ×</button><img alt="Expanded property photograph">';document.body.append(modal);
  gallery.addEventListener('click',event=>{if(event.target.closest('img')||event.target.closest('.gallery-button')){const selected=event.target.closest('img')||gallery.querySelector('img');modal.querySelector('img').src=selected.src;modal.hidden=false;document.body.classList.add('no-scroll');}});
  function close(){modal.hidden=true;document.body.classList.remove('no-scroll');}modal.querySelector('button').addEventListener('click',close);modal.addEventListener('click',event=>{if(event.target===modal)close();});document.addEventListener('keydown',event=>{if(event.key==='Escape')close();});
})();