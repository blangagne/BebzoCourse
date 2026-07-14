
const $=s=>document.querySelector(s);
const normalize=s=>String(s).trim().toLocaleLowerCase("fr").normalize("NFD").replace(/[\u0300-\u036f]/g,"");
const esc=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const jsesc=s=>String(s).replaceAll("\\","\\\\").replaceAll("'","\\'");
const categoryColors={"Fruits":"#f7b32b","Légumes":"#46c37b","Viandes & poissons":"#ff5d73","Produits laitiers":"#58a6ff","Féculents":"#d5a35c","Sauces & conserves":"#ff884d","Épices":"#c77dff","Boissons":"#39c6d6","Snacks":"#e68ac7","Maison":"#8c7cff","Hygiène":"#64d8cb","Sans catégorie":"#7e8a9d"};
const aisleByCategory={"Fruits":"Fruits & légumes","Légumes":"Fruits & légumes","Viandes & poissons":"Boucherie & poissonnerie","Produits laitiers":"Produits frais","Féculents":"Épicerie","Sauces & conserves":"Épicerie","Épices":"Épicerie","Boissons":"Boissons","Snacks":"Snacks","Maison":"Entretien","Hygiène":"Hygiène"};
const months=["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const seasonalByMonth={"1":{"vegetables":["Ail","Betterave","Carotte","Céleri-branche","Céleri-rave","Chou","Chou blanc","Chou de Bruxelles","Chou frisé","Chou rouge","Courge","Crosne","Endive","Épinard","Frisée","Mâche","Navet","Oignon","Panais","Poireau","Pomme de terre de conservation","Salsifi","Topinambour"],"fruits":["Amande sèche","Citron","Clémentine","Kaki","Kiwi","Mandarine","Orange","Pamplemousse","Physalis","Poire","Pomme"],"grains":["Lentille"]},"2":{"vegetables":["Ail","Betterave","Carotte","Céleri-rave","Chou blanc","Chou de Bruxelles","Chou frisé","Chou rouge","Crosne","Endive","Épinard","Frisée","Mâche","Navet","Oignon","Panais","Poireau","Pomme de terre de conservation","Radis","Salsifi","Topinambour"],"fruits":["Amande sèche","Citron","Clémentine","Kiwi","Mandarine","Orange","Pamplemousse","Physalis","Poire","Pomme"],"grains":["Lentille"]},"3":{"vegetables":["Ail","Asperge","Betterave","Blette","Carotte","Céleri-rave","Chou","Chou de Bruxelles","Chou-fleur","Crosne","Endive","Épinard","Frisée","Navet","Oignon","Panais","Poireau","Pomme de terre de conservation","Radis","Salsifi","Topinambour"],"fruits":["Amande sèche","Citron","Kiwi","Orange","Pamplemousse","Poire","Pomme"],"grains":["Lentille"]},"4":{"vegetables":["Ail","Artichaut","Asperge","Betterave","Blette","Carotte","Chou-fleur","Concombre","Endive","Épinard","Frisée","Laitue","Navet","Oignon","Petit pois","Poireau","Pomme de terre primeur","Radis"],"fruits":["Amande sèche","Citron","Pamplemousse","Poire","Pomme"],"grains":[]},"5":{"vegetables":["Ail","Artichaut","Asperge","Aubergine","Betterave","Blette","Carotte","Chou-fleur","Concombre","Courgette","Épinard","Laitue","Navet","Oignon","Petit pois","Pomme de terre primeur","Radis"],"fruits":["Amande sèche","Cerise","Fraise","Pamplemousse","Rhubarbe","Tomate"],"grains":[]},"6":{"vegetables":["Ail","Artichaut","Asperge","Aubergine","Betterave","Blette","Brocoli","Carotte","Chou romanesco","Concombre","Courgette","Épinard","Fenouil","Haricot vert","Laitue","Navet","Oignon","Petit pois","Poivron","Pomme de terre primeur","Radis"],"fruits":["Abricot","Amande sèche","Brugnon","Cassis","Cerise","Citron","Fraise","Framboise","Groseille","Melon","Pamplemousse","Pastèque","Pêche","Pomme","Prune","Rhubarbe","Tomate"],"grains":["Avoine d'hiver","Avoine de printemps","Orge d'hiver","Pois","Seigle"]},"7":{"vegetables":["Ail","Artichaut","Asperge","Aubergine","Betterave","Blette","Brocoli","Carotte","Céleri-branche","Chou romanesco","Concombre","Courgette","Épinard","Fenouil","Haricot vert","Laitue","Oignon","Petit pois","Poivron","Pomme de terre primeur","Radis"],"fruits":["Abricot","Amande fraiche","Amande sèche","Brugnon","Cassis","Cerise","Figue","Fraise","Framboise","Groseille","Melon","Myrtille","Nectarine","Pastèque","Pêche","Poire","Prune","Rhubarbe","Tomate"],"grains":["Avoine d'hiver","Avoine de printemps","Blé dur d'hiver et de printemps","Blé tendre d'hiver et de printemps","Féveroles et fèves","Haricot blanc","Maïs","Orge d'hiver","Orge de printemps","Pois","Seigle"]},"8":{"vegetables":["Ail","Artichaut","Aubergine","Betterave","Blette","Brocoli","Carotte","Céleri-branche","Chou blanc","Chou romanesco","Chou rouge","Concombre","Courge","Courgette","Épinard","Fenouil","Frisée","Haricot vert","Laitue","Oignon","Poivron","Pomme de terre primeur","Radis"],"fruits":["Abricot","Amande fraiche","Amande sèche","Baie de goji","Brugnon","Cassis","Figue","Fraise","Framboise","Groseille","Melon","Mirabelle","Mûre","Myrtille","Nectarine","Noisette","Pastèque","Pêche","Poire","Pomme","Prune","Pruneau","Raisin","Tomate"],"grains":["Avoine d'hiver","Avoine de printemps","Blé dur d'hiver et de printemps","Blé tendre d'hiver et de printemps","Féveroles et fèves","Haricot blanc","Maïs","Orge d'hiver","Orge de printemps","Pois","Quinoa","Seigle"]},"9":{"vegetables":["Ail","Artichaut","Aubergine","Betterave","Blette","Brocoli","Carotte","Céleri-branche","Chou","Chou blanc","Chou de Bruxelles","Chou-fleur","Chou frisé","Chou romanesco","Chou rouge","Concombre","Courge","Courgette","Épinard","Fenouil","Frisée","Haricot vert","Laitue","Oignon","Panais","Patate douce","Poireau","Poivron","Pomme de terre de conservation","Potiron","Radis"],"fruits":["Amande sèche","Baie de goji","Coing","Figue","Melon","Mirabelle","Mûre","Myrtille","Noisette","Noix","Pastèque","Pêche","Poire","Pomme","Prune","Pruneau","Raisin","Tomate"],"grains":["Haricot blanc","Maïs","Quinoa","Riz","Sarrasin","Tournesol"]},"10":{"vegetables":["Ail","Aubergine","Betterave","Blette","Brocoli","Carotte","Céleri-branche","Céleri-rave","Chou","Chou blanc","Chou de Bruxelles","Chou-fleur","Chou frisé","Chou rouge","Concombre","Courge","Courgette","Echalote","Endive","Épinard","Fenouil","Frisée","Haricot vert","Laitue","Navet","Oignon","Panais","Patate douce","Poireau","Pomme de terre de conservation","Potiron","Radis","Rutabaga","Salsifi","Topinambour"],"fruits":["Amande sèche","Baie de goji","Châtaigne","Citron","Coing","Figue","Framboise","Kaki","Myrtille","Noisette","Noix","Physalis","Poire","Pomme","Raisin","Tomate"],"grains":["Haricot blanc","Maïs","Quinoa","Riz","Sarrasin","Soja"]},"11":{"vegetables":["Ail","Betterave","Brocoli","Cardon","Carotte","Céleri-branche","Céleri-rave","Chou","Chou blanc","Chou de Bruxelles","Chou-fleur","Chou frisé","Chou rouge","Citrouille","Courge","Crosne","Echalote","Endive","Épinard","Fenouil","Frisée","Mâche","Navet","Oignon","Panais","Poireau","Pomme de terre de conservation","Potiron","Radis","Rutabaga","Salsifi","Topinambour"],"fruits":["Amande sèche","Châtaigne","Citron","Clémentine","Coing","Kaki","Kiwi","Mandarine","Orange","Physalis","Poire","Pomme"],"grains":["Lentille","Maïs"]},"12":{"vegetables":["Ail","Betterave","Carotte","Céleri-branche","Céleri-rave","Chou","Chou blanc","Chou de Bruxelles","Chou frisé","Chou rouge","Courge","Crosne","Echalote","Endive","Épinard","Frisée","Mâche","Navet","Oignon","Panais","Poireau","Pomme de terre de conservation","Potiron","Radis","Rutabaga","Salsifi","Topinambour"],"fruits":["Amande sèche","Châtaigne","Citron","Clémentine","Kaki","Kiwi","Mandarine","Orange","Physalis","Poire","Pomme"],"grains":["Avoine d'hiver","Avoine de printemps","Blé dur d'hiver et de printemps","Blé tendre d'hiver et de printemps","Féveroles et fèves","Lentille","Orge d'hiver","Orge de printemps","Pois","Seigle"]}};
const seasonal={};
Object.entries(seasonalByMonth).forEach(([month,groups])=>Object.values(groups).flat().forEach(name=>{(seasonal[name]??=[]).push(Number(month))}));
let products=JSON.parse(localStorage.getItem("bz_products")||"null")||structuredClone(window.SEED_PRODUCTS);
let recipes=JSON.parse(localStorage.getItem("bz_recipes")||"null")||structuredClone(window.SEED_RECIPES);
let shopping=JSON.parse(localStorage.getItem("bz_shopping")||"{}");
let bought=JSON.parse(localStorage.getItem("bz_bought")||"{}");
let history=JSON.parse(localStorage.getItem("bz_history")||"[]");
let streaks=JSON.parse(localStorage.getItem("bz_streaks")||"{}");
let options=JSON.parse(localStorage.getItem("bz_options")||'{"reminders":false,"suggestions":true,"autoFavorites":true,"seasonal":true}');
let layoutMode=localStorage.getItem("bz_layout")||"vertical";
let densityValue=Number(localStorage.getItem("bz_density")||100);
let shoppingSort=localStorage.getItem("bz_shopping_sort")||"az";
let currentView="products";
const save=()=>{localStorage.setItem("bz_products",JSON.stringify(products));localStorage.setItem("bz_recipes",JSON.stringify(recipes));localStorage.setItem("bz_shopping",JSON.stringify(shopping));localStorage.setItem("bz_bought",JSON.stringify(bought));localStorage.setItem("bz_history",JSON.stringify(history));localStorage.setItem("bz_streaks",JSON.stringify(streaks));localStorage.setItem("bz_options",JSON.stringify(options))};
const productByName=n=>products.find(p=>normalize(p.name)===normalize(n));
const currentMonth=()=>new Date().getMonth()+1;
const isSeasonal=n=>seasonal[n]?.includes(currentMonth())||Object.entries(seasonal).some(([k,v])=>normalize(k)===normalize(n)&&v.includes(currentMonth()));
const toast=m=>{const t=$("#toast");t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800)};

document.querySelectorAll(".nav").forEach(b=>b.onclick=()=>switchView(b.dataset.view));
function switchView(v){
 currentView=v;document.querySelectorAll(".nav").forEach(b=>b.classList.toggle("active",b.dataset.view===v));document.querySelectorAll(".view").forEach(x=>x.classList.toggle("active",x.id===v+"View"));
 const data={products:["Produits","Choisis ce qu’il te faut"],favorites:["Favoris","Tes classiques"],recipes:["Recettes","Ajoute une recette entière"],shopping:["Ma liste","Mode magasin"],seasonal:["Saisonnier","Le calendrier des fruits et légumes"],stats:["Statistiques","Ton suivi de consommation"],history:["Historique","Toutes les courses terminées"],options:["Options","Active seulement ce qui t’est utile"]};
 $("#pageTitle").textContent=data[v][0];$("#pageSubtitle").textContent=data[v][1];
 $(".top-actions").style.display=["products","favorites","recipes"].includes(v)?"flex":"none";
 render();
}
function frequencyClass(f){return normalize(f)==="souvent"?"freq-souvent":normalize(f)==="occasionnel"?"freq-occasionnel":"freq-rare"}
function frequencyLabel(f){return normalize(f)==="rare"?"Rarement":f}
function toggleShopping(name){shopping[name]?delete shopping[name]:shopping[name]=true;delete bought[name];save();render()}
function toggleFavorite(id){const p=products.find(x=>x.id===id);if(p)p.favorite=!p.favorite;save();render()}
window.toggleShopping=toggleShopping;window.toggleFavorite=toggleFavorite;
function itemHTML(p){
 const seasonalTag=options.seasonal&&isSeasonal(p.name)?'<span class="season-tag">De saison</span>':"";
 return `<div class="item"><input class="tick" type="checkbox" ${shopping[p.name]?"checked":""} onchange="toggleShopping('${jsesc(p.name)}')"><div><div class="item-name">${esc(p.name)}</div><div><span class="freq ${frequencyClass(p.frequency)}">${esc(frequencyLabel(p.frequency))}</span>${seasonalTag}</div></div><button class="star ${p.favorite?"on":""}" onclick="toggleFavorite(${p.id})">★</button><button class="edit-btn" onclick="openEditProduct(${p.id})">✎</button></div>`;
}
function groupHTML(title,arr,color){return `<section class="group" style="--group:${color||"#7e8a9d"}"><div class="group-title" onclick="this.parentElement.classList.toggle('collapsed')"><span class="dot"></span>${esc(title)} <span class="badge">${arr.length}</span></div><div class="items">${arr.map(itemHTML).join("")}</div></section>`}
function renderProducts(){
 const q=$("#searchInput").value.trim().toLowerCase(),sort=$("#sortSelect").value;
 const grid=$("#productsGrid");
 grid.classList.toggle("frequency-layout",sort==="frequency");
 grid.classList.toggle("recipe-layout",sort==="recipe");
 let list=products.filter(p=>p.name.toLowerCase().includes(q));let html="";
 if(sort==="az")html=groupHTML("Tous les produits",list.sort((a,b)=>a.name.localeCompare(b.name)),"#ff6b35");
 else if(sort==="frequency")html=["souvent","occasionnel","rare"].map(f=>groupHTML(f,list.filter(p=>normalize(p.frequency)===f).sort((a,b)=>a.name.localeCompare(b.name)),f==="souvent"?"#46c37b":f==="occasionnel"?"#f7b32b":"#ff5d73")).join("");
 else if(sort==="recipe"){const used=new Set(recipes.flatMap(r=>r.ingredients.map(normalize)));html=recipes.map(r=>groupHTML(r.name,list.filter(p=>r.ingredients.some(n=>normalize(n)===normalize(p.name))).sort((a,b)=>a.name.localeCompare(b.name)),"#c77dff")).join("");const other=list.filter(p=>!used.has(normalize(p.name)));if(other.length)html+=groupHTML("Hors recettes",other,"#7e8a9d")}
 else html=[...new Set(list.map(p=>p.category))].sort().map(c=>groupHTML(c,list.filter(p=>p.category===c).sort((a,b)=>a.name.localeCompare(b.name)),categoryColors[c])).join("");
 $("#productsGrid").innerHTML=html||'<div class="empty">Rien trouvé</div>';renderReminders();
}
function renderFavorites(){const list=products.filter(p=>p.favorite).sort((a,b)=>a.name.localeCompare(b.name));$("#favoritesGrid").innerHTML=list.length?groupHTML("Favoris",list,"#f7b32b"):'<div class="empty">Aucun favori</div>'}
function renderRecipes(){$("#recipesGrid").innerHTML=recipes.length?recipes.sort((a,b)=>a.name.localeCompare(b.name)).map(r=>`<article class="recipe-card"><h3>${esc(r.name)}</h3><p>${r.ingredients.map(esc).join(" · ")}</p><div class="recipe-actions"><button class="primary" onclick="addRecipe(${r.id})">Ajouter à la liste</button><button class="ghost danger" onclick="deleteRecipe(${r.id})">Supprimer</button></div></article>`).join(""):'<div class="empty">Aucune recette</div>'}
window.addRecipe=id=>{const r=recipes.find(x=>x.id===id);r.ingredients.forEach(n=>shopping[productByName(n)?.name||n]=true);save();switchView("shopping")};
window.deleteRecipe=id=>{if(confirm("Supprimer cette recette ?")){recipes=recipes.filter(r=>r.id!==id);save();render()}};
function shoppingGroups(names){
 if(shoppingSort==="none"||shoppingSort==="az")return {"Tous les produits":shoppingSort==="az"?names.sort((a,b)=>a.localeCompare(b)):names};
 const key=n=>shoppingSort==="aisle"?(aisleByCategory[productByName(n)?.category]||"Autre"):(productByName(n)?.category||"Autre");
 return names.reduce((a,n)=>{const k=key(n);(a[k]??=[]).push(n);return a},{});
}
function renderShopping(){
 const names=Object.keys(shopping);const done=names.filter(n=>bought[n]).length;$("#listCount").textContent=names.length;$("#progressBar").style.width=names.length?`${done/names.length*100}%`:"0%";
 const groups=shoppingGroups([...names]);$("#shoppingList").innerHTML=names.length?Object.entries(groups).sort(([a],[b])=>a.localeCompare(b)).map(([g,arr])=>`<section class="shopping-group"><h3>${esc(g)}</h3>${arr.map(n=>{const p=productByName(n);return `<div class="shopping-row ${bought[n]?"done":""}"><input class="tick" type="checkbox" ${bought[n]?"checked":""} onchange="toggleBought('${jsesc(n)}')"><span>${esc(n)} ${options.seasonal&&isSeasonal(n)?'<span class="season-tag">De saison</span>':""}</span><span class="category-pill">${esc(p?.category||"Autre")}</span></div>`}).join("")}</section>`).join(""):'<div class="empty">Ta liste est vide</div>';renderSuggestions();
}
window.toggleBought=n=>{bought[n]=!bought[n];save();renderShopping()};
$("#clearBoughtBtn").onclick=()=>{Object.keys(bought).filter(n=>bought[n]).forEach(n=>{delete shopping[n];delete bought[n]});save();render()};
$("#finishBtn").onclick=finishShopping;
function finishShopping(){
 const names=Object.keys(shopping);if(!names.length)return toast("La liste est déjà vide");
 if(!confirm("Enregistrer cette course dans l’historique et vider la liste ?"))return;
 const trip={id:Date.now(),date:new Date().toISOString(),products:names};
 history.unshift(trip);
 const boughtSet=new Set(names.map(normalize));
 products.forEach(p=>{streaks[p.name]=boughtSet.has(normalize(p.name))?(streaks[p.name]||0)+1:0;if(options.autoFavorites&&streaks[p.name]>=3)p.favorite=true});
 shopping={};bought={};save();toast("Course enregistrée");render();
}
function renderSuggestions(){
 const panel=$("#suggestionsPanel");if(!options.suggestions){panel.innerHTML="";return}
 const selected=new Set(Object.keys(shopping).map(normalize));
 const candidates=recipes.map(r=>({r,have:r.ingredients.filter(i=>selected.has(normalize(i))),missing:r.ingredients.filter(i=>!selected.has(normalize(i)))})).filter(x=>x.have.length>=2&&x.missing.length&&x.have.length>=x.r.ingredients.length/2).slice(0,2);
 panel.innerHTML=candidates.map(x=>`<div class="suggestion"><span>Pour <strong>${esc(x.r.name)}</strong>, il manque ${x.missing.map(esc).join(", ")}</span><button class="ghost" onclick="addMissing(${x.r.id})">Ajouter</button></div>`).join("");
}
window.addMissing=id=>{const r=recipes.find(x=>x.id===id);r.ingredients.forEach(n=>shopping[productByName(n)?.name||n]=true);save();renderShopping()};
function renderReminders(){
 const p=$("#reminderPanel");if(!options.reminders||history.length<2){p.innerHTML="";return}
 const today=Date.now(),suggestions=[];
 products.forEach(prod=>{const dates=history.filter(h=>h.products.some(n=>normalize(n)===normalize(prod.name))).map(h=>new Date(h.date).getTime()).sort((a,b)=>a-b);if(dates.length<2)return;const gaps=dates.slice(1).map((d,i)=>(d-dates[i])/86400000);const avg=gaps.reduce((a,b)=>a+b,0)/gaps.length;const since=(today-dates.at(-1))/86400000;if(since>avg*1.2&&!shopping[prod.name])suggestions.push({name:prod.name,since,avg})});
 p.innerHTML=suggestions.slice(0,3).map(s=>`<div class="reminder"><span>${esc(s.name)} revient environ tous les ${Math.round(s.avg)} jours</span><button class="ghost" onclick="toggleShopping('${jsesc(s.name)}')">Ajouter</button></div>`).join("");
}
function renderSeasonal(){
 const m=currentMonth(),groups=seasonalByMonth[m],all=[...groups.vegetables,...groups.fruits,...groups.grains];
 $("#seasonTitle").textContent=months[m-1];$("#seasonCount").textContent=all.length;
 const cards=(title,list,icon)=>`<section class="group" style="--group:#46c37b"><div class="group-title"><span>${icon}</span>${title}<span class="badge">${list.length}</span></div><div class="items">${list.map(n=>`<div class="item" style="grid-template-columns:1fr auto"><div><div class="item-name">${esc(n)}</div><span class="season-tag">De saison</span></div><button class="ghost" onclick="addSeasonal('${jsesc(n)}')">+</button></div>`).join("")}</div></section>`;
 $("#currentSeasonGrid").innerHTML=cards("Légumes",groups.vegetables,"🥕")+cards("Fruits",groups.fruits,"🍎")+(groups.grains.length?cards("Céréales & légumineuses",groups.grains,"🌾"):"");
 $("#seasonCalendar").innerHTML=months.map((month,i)=>{const g=seasonalByMonth[i+1],list=[...g.vegetables,...g.fruits,...g.grains];return `<article class="month-card ${i+1===m?"current":""}"><h4>${month}</h4><p>${list.map(esc).join(" · ")}</p></article>`}).join("");
}
window.addSeasonal=name=>{let p=productByName(name);if(!p){const fruitWords=["abricot","cassis","cerise","citron","fraise","framboise","groseille","kiwi","melon","mirabelle","myrtille","pastèque","pêche","poire","pomme","prune","raisin","rhubarbe"];const category=fruitWords.some(x=>normalize(name).includes(x))?"Fruits":"Légumes";p={id:Date.now(),name,category,frequency:"occasionnel",favorite:false};products.push(p)}shopping[p.name]=true;save();toast(`${name} ajouté`);render()};
function productStats(){
 const counts={};history.forEach(h=>h.products.forEach(n=>counts[n]=(counts[n]||0)+1));return counts;
}
function renderStats(){
 const counts=productStats(),totalProducts=Object.values(counts).reduce((a,b)=>a+b,0),top=Object.entries(counts).sort((a,b)=>b[1]-a[1]);
 $("#statCards").innerHTML=`<article class="stat-card"><strong>${history.length}</strong><small>courses terminées</small></article><article class="stat-card"><strong>${totalProducts}</strong><small>produits achetés</small></article><article class="stat-card"><strong>${top[0]?.[0]||"—"}</strong><small>produit le plus fréquent</small></article><article class="stat-card"><strong>${products.filter(p=>p.favorite).length}</strong><small>favoris</small></article>`;
 $("#topProducts").innerHTML=top.slice(0,10).map(([n,c])=>`<div class="bar-row"><span>${esc(n)}</span><div class="bar-track"><div class="bar-fill" style="width:${top[0]?c/top[0][1]*100:0}%"></div></div><b>${c}</b></div>`).join("")||'<div class="empty">Pas encore de données</div>';
 drawMonthlyChart();renderHeatmap();
}
function drawMonthlyChart(){
 const canvas=$("#monthlyChart"),ctx=canvas.getContext("2d"),dpr=devicePixelRatio||1,w=canvas.clientWidth||700,h=220;canvas.width=w*dpr;canvas.height=h*dpr;ctx.scale(dpr,dpr);ctx.clearRect(0,0,w,h);
 const year=new Date().getFullYear(),vals=Array(12).fill(0);history.forEach(x=>{const d=new Date(x.date);if(d.getFullYear()===year)vals[d.getMonth()]++});const max=Math.max(1,...vals),pad=28,bw=(w-pad*2)/12-6;
 ctx.font="10px Segoe UI";ctx.textAlign="center";vals.forEach((v,i)=>{const bh=(h-55)*v/max,x=pad+i*((w-pad*2)/12),y=h-28-bh;const g=ctx.createLinearGradient(0,y,0,h);g.addColorStop(0,"#ff6b35");g.addColorStop(1,"#f7b32b");ctx.fillStyle=g;ctx.fillRect(x,y,bw,bh);ctx.fillStyle="#8d99ab";ctx.fillText(months[i].slice(0,3),x+bw/2,h-10);if(v){ctx.fillStyle="#f4f7fb";ctx.fillText(v,x+bw/2,y-5)}})
}
function renderHeatmap(){
 const year=new Date().getFullYear(),map={};history.forEach(h=>{const d=new Date(h.date);if(d.getFullYear()===year){const k=d.toISOString().slice(0,10);map[k]=(map[k]||0)+h.products.length}});
 const start=new Date(year,0,1),end=new Date(year,11,31),cells=[];for(let d=new Date(start);d<=end;d.setDate(d.getDate()+1)){const k=d.toISOString().slice(0,10),v=map[k]||0,level=v===0?"":v<10?"l1":v<20?"l2":v<35?"l3":"l4";cells.push(`<span class="heat-cell ${level}" title="${k}: ${v} produits"></span>`)}
 $("#heatmap").innerHTML=`<div class="heatmap">${cells.join("")}</div>`;
}
function renderHistory(){
 $("#historyList").innerHTML=history.length?history.map(h=>`<article class="history-card" onclick="this.classList.toggle('open')"><div class="history-head"><div><strong>${new Date(h.date).toLocaleDateString("fr-BE",{dateStyle:"long"})}</strong><small> · ${h.products.length} produits</small></div><span>▾</span></div><div class="history-products">${h.products.map(esc).join(" · ")}</div></article>`).join(""):'<div class="empty">Aucune course enregistrée</div>';
}
function renderOptions(){
 $("#optReminders").checked=!!options.reminders;$("#optSuggestions").checked=!!options.suggestions;$("#optAutoFavorites").checked=!!options.autoFavorites;$("#optSeasonal").checked=!!options.seasonal;
}
["Reminders","Suggestions","AutoFavorites","Seasonal"].forEach(k=>{$("#opt"+k).onchange=e=>{const key=k.charAt(0).toLowerCase()+k.slice(1);options[key]=e.target.checked;save();render()}});
$("#shoppingSort").value=shoppingSort;$("#shoppingSort").onchange=e=>{shoppingSort=e.target.value;localStorage.setItem("bz_shopping_sort",shoppingSort);renderShopping()};
$("#searchInput").oninput=renderProducts;$("#searchInput").onkeydown=e=>{if(e.key==="Enter"){const q=e.target.value.trim();const p=products.find(x=>normalize(x.name)===normalize(q))||products.find(x=>normalize(x.name).startsWith(normalize(q)));if(p){shopping[p.name]=true;save();toast(`${p.name} ajouté`);e.target.value="";renderProducts()}else toast("Produit introuvable")}};
$("#sortSelect").onchange=renderProducts;
function applyLayout(){document.body.classList.toggle("layout-horizontal",layoutMode==="horizontal");$("#layoutToggleBtn").textContent=layoutMode==="horizontal"?"▦ Horizontal":"☰ Vertical"}
$("#layoutToggleBtn").onclick=()=>{layoutMode=layoutMode==="vertical"?"horizontal":"vertical";localStorage.setItem("bz_layout",layoutMode);applyLayout()};
function applyDensity(){document.documentElement.style.setProperty("--density",(densityValue/100).toFixed(2));$("#densitySlider").value=densityValue}
$("#densitySlider").oninput=e=>{densityValue=Number(e.target.value);localStorage.setItem("bz_density",densityValue);applyDensity()};
const categories=[...new Set(products.map(p=>p.category))].sort();$("#productCategory").innerHTML=$("#editProductCategory").innerHTML=categories.map(c=>`<option>${esc(c)}</option>`).join("");
$("#addProductBtn").onclick=()=>$("#productDialog").showModal();$("#addRecipeBtn").onclick=()=>$("#recipeDialog").showModal();
document.querySelectorAll(".cancel-dialog").forEach(b=>b.onclick=()=>{b.closest("form").reset();b.closest("dialog").close()});
$("#productForm").onsubmit=e=>{e.preventDefault();const name=$("#productName").value.trim();if(products.some(p=>normalize(p.name)===normalize(name)))return alert("Produit déjà existant");products.push({id:Date.now(),name,category:$("#productCategory").value,frequency:$("#productFrequency").value,favorite:$("#productFavorite").checked});save();e.target.reset();$("#productDialog").close();render()};
window.openEditProduct=id=>{const p=products.find(x=>x.id===id);$("#editProductId").value=p.id;$("#editProductName").value=p.name;$("#editProductCategory").value=p.category;$("#editProductFrequency").value=normalize(p.frequency)==="rare"?"rare":p.frequency;$("#editProductFavorite").checked=!!p.favorite;$("#editProductDialog").showModal()};
$("#editProductForm").onsubmit=e=>{e.preventDefault();const id=Number($("#editProductId").value),p=products.find(x=>x.id===id),old=p.name,n=$("#editProductName").value.trim();if(products.some(x=>x.id!==id&&normalize(x.name)===normalize(n)))return alert("Produit déjà existant");p.name=n;p.category=$("#editProductCategory").value;p.frequency=$("#editProductFrequency").value;p.favorite=$("#editProductFavorite").checked;if(old!==n){if(shopping[old]){delete shopping[old];shopping[n]=true}if(bought[old]){delete bought[old];bought[n]=true}history.forEach(h=>h.products=h.products.map(x=>normalize(x)===normalize(old)?n:x));recipes.forEach(r=>r.ingredients=r.ingredients.map(x=>normalize(x)===normalize(old)?n:x))}save();$("#editProductDialog").close();render()};
$("#recipeForm").onsubmit=e=>{e.preventDefault();const name=$("#recipeName").value.trim(),ingredients=$("#recipeIngredients").value.split("\n").map(x=>x.trim()).filter(Boolean);if(recipes.some(r=>normalize(r.name)===normalize(name)))return alert("Recette déjà existante");recipes.push({id:Date.now(),name,ingredients});save();e.target.reset();$("#recipeDialog").close();render()};
$("#exportBtn").onclick=()=>{const blob=new Blob([JSON.stringify({products,recipes,shopping,bought,history,streaks,options},null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="bebzocourse-sauvegarde.json";a.click();URL.revokeObjectURL(a.href)};
$("#importInput").onchange=async e=>{try{const d=JSON.parse(await e.target.files[0].text());products=d.products||products;recipes=d.recipes||recipes;shopping=d.shopping||{};bought=d.bought||{};history=d.history||[];streaks=d.streaks||{};options=d.options||options;save();location.reload()}catch{alert("Fichier invalide")}};
$("#resetBtn").onclick=()=>{if(confirm("Tout supprimer ?")){Object.keys(localStorage).filter(k=>k.startsWith("bz_")).forEach(k=>localStorage.removeItem(k));location.reload()}};

function renderSidebar(){
 const stats=[
  ["▦",products.length,"Produits"],
  ["◆",recipes.length,"Recettes"],
  ["✓",history.length,"Courses"]
 ];
 $("#sidebarStats").innerHTML=stats.map(([icon,n,label])=>`<div class="side-stat"><span class="side-stat-icon">${icon}</span><div><strong>${n}</strong><small>${label}</small></div></div>`).join("");
 const tips=[
  "Les produits de saison sont souvent meilleurs et moins chers",
  "Trie ta liste par rayon pour éviter les allers-retours",
  "Une recette ajoutée met tous ses ingrédients dans la liste",
  "Les favoris automatiques apparaissent après 3 courses d’affilée",
  "Tu peux exporter tes données depuis l’onglet Options",
  "Le bouton Finito enregistre la course dans l’historique",
  "La recherche rapide ajoute un produit avec Entrée"
 ];
 const day=Math.floor(Date.now()/86400000);
 $("#dailyTip").textContent=tips[day%tips.length];
}

function render(){renderProducts();renderFavorites();renderRecipes();renderShopping();renderSeasonal();renderStats();renderHistory();renderOptions();renderSidebar()}
applyLayout();applyDensity();render();
if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js");
