
const $=s=>document.querySelector(s);
const normalize=s=>String(s).trim().toLocaleLowerCase("fr").replaceAll("œ","oe").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9 ]/g,"").replace(/\s+/g," ");
const productKey=s=>{let n=normalize(s);if(n.endsWith("aux"))n=n.slice(0,-3)+"al";else if(n.length>4&&(n.endsWith("s")||n.endsWith("x")))n=n.slice(0,-1);return n};
const sameProduct=(a,b)=>productKey(a)===productKey(b);
const esc=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const jsesc=s=>String(s).replaceAll("\\","\\\\").replaceAll("'","\\'");
const categoryColors={"Fruits":"#f7b32b","Légumes":"#46c37b","Viandes & poissons":"#ff5d73","Produits laitiers":"#58a6ff","Féculents":"#d5a35c","Sauces & conserves":"#ff884d","Épices":"#c77dff","Boissons":"#39c6d6","Snacks":"#e68ac7","Maison":"#8c7cff","Hygiène":"#64d8cb","Sans catégorie":"#7e8a9d"};
const aisleByCategory={"Fruits":"Fruits & légumes","Légumes":"Fruits & légumes","Viandes & poissons":"Boucherie & poissonnerie","Produits laitiers":"Produits frais","Féculents":"Épicerie","Sauces & conserves":"Épicerie","Épices":"Épicerie","Boissons":"Boissons","Snacks":"Snacks","Maison":"Entretien","Hygiène":"Hygiène"};
const months=["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const seasonalByMonth={"1":{"vegetables":["Ail","Betterave","Carotte","Céleri-branche","Céleri-rave","Chou","Chou blanc","Chou de Bruxelles","Chou frisé","Chou rouge","Courge","Crosne","Endive","Épinard","Frisée","Mâche","Navet","Oignon","Panais","Poireau","Pomme de terre de conservation","Salsifi","Topinambour"],"fruits":["Amande sèche","Citron","Clémentine","Kaki","Kiwi","Mandarine","Orange","Pamplemousse","Physalis","Poire","Pomme"],"grains":["Lentille"]},"2":{"vegetables":["Ail","Betterave","Carotte","Céleri-rave","Chou blanc","Chou de Bruxelles","Chou frisé","Chou rouge","Crosne","Endive","Épinard","Frisée","Mâche","Navet","Oignon","Panais","Poireau","Pomme de terre de conservation","Radis","Salsifi","Topinambour"],"fruits":["Amande sèche","Citron","Clémentine","Kiwi","Mandarine","Orange","Pamplemousse","Physalis","Poire","Pomme"],"grains":["Lentille"]},"3":{"vegetables":["Ail","Asperge","Betterave","Blette","Carotte","Céleri-rave","Chou","Chou de Bruxelles","Chou-fleur","Crosne","Endive","Épinard","Frisée","Navet","Oignon","Panais","Poireau","Pomme de terre de conservation","Radis","Salsifi","Topinambour"],"fruits":["Amande sèche","Citron","Kiwi","Orange","Pamplemousse","Poire","Pomme"],"grains":["Lentille"]},"4":{"vegetables":["Ail","Artichaut","Asperge","Betterave","Blette","Carotte","Chou-fleur","Concombre","Endive","Épinard","Frisée","Laitue","Navet","Oignon","Petit pois","Poireau","Pomme de terre primeur","Radis"],"fruits":["Amande sèche","Citron","Pamplemousse","Poire","Pomme"],"grains":[]},"5":{"vegetables":["Ail","Artichaut","Asperge","Aubergine","Betterave","Blette","Carotte","Chou-fleur","Concombre","Courgette","Épinard","Laitue","Navet","Oignon","Petit pois","Pomme de terre primeur","Radis"],"fruits":["Amande sèche","Cerise","Fraise","Pamplemousse","Rhubarbe","Tomate"],"grains":[]},"6":{"vegetables":["Ail","Artichaut","Asperge","Aubergine","Betterave","Blette","Brocoli","Carotte","Chou romanesco","Concombre","Courgette","Épinard","Fenouil","Haricot vert","Laitue","Navet","Oignon","Petit pois","Poivron","Pomme de terre primeur","Radis"],"fruits":["Abricot","Amande sèche","Brugnon","Cassis","Cerise","Citron","Fraise","Framboise","Groseille","Melon","Pamplemousse","Pastèque","Pêche","Pomme","Prune","Rhubarbe","Tomate"],"grains":["Avoine d'hiver","Avoine de printemps","Orge d'hiver","Pois","Seigle"]},"7":{"vegetables":["Ail","Artichaut","Asperge","Aubergine","Betterave","Blette","Brocoli","Carotte","Céleri-branche","Chou romanesco","Concombre","Courgette","Épinard","Fenouil","Haricot vert","Laitue","Oignon","Petit pois","Poivron","Pomme de terre primeur","Radis"],"fruits":["Abricot","Amande fraiche","Amande sèche","Brugnon","Cassis","Cerise","Figue","Fraise","Framboise","Groseille","Melon","Myrtille","Nectarine","Pastèque","Pêche","Poire","Prune","Rhubarbe","Tomate"],"grains":["Avoine d'hiver","Avoine de printemps","Blé dur d'hiver et de printemps","Blé tendre d'hiver et de printemps","Féveroles et fèves","Haricot blanc","Maïs","Orge d'hiver","Orge de printemps","Pois","Seigle"]},"8":{"vegetables":["Ail","Artichaut","Aubergine","Betterave","Blette","Brocoli","Carotte","Céleri-branche","Chou blanc","Chou romanesco","Chou rouge","Concombre","Courge","Courgette","Épinard","Fenouil","Frisée","Haricot vert","Laitue","Oignon","Poivron","Pomme de terre primeur","Radis"],"fruits":["Abricot","Amande fraiche","Amande sèche","Baie de goji","Brugnon","Cassis","Figue","Fraise","Framboise","Groseille","Melon","Mirabelle","Mûre","Myrtille","Nectarine","Noisette","Pastèque","Pêche","Poire","Pomme","Prune","Pruneau","Raisin","Tomate"],"grains":["Avoine d'hiver","Avoine de printemps","Blé dur d'hiver et de printemps","Blé tendre d'hiver et de printemps","Féveroles et fèves","Haricot blanc","Maïs","Orge d'hiver","Orge de printemps","Pois","Quinoa","Seigle"]},"9":{"vegetables":["Ail","Artichaut","Aubergine","Betterave","Blette","Brocoli","Carotte","Céleri-branche","Chou","Chou blanc","Chou de Bruxelles","Chou-fleur","Chou frisé","Chou romanesco","Chou rouge","Concombre","Courge","Courgette","Épinard","Fenouil","Frisée","Haricot vert","Laitue","Oignon","Panais","Patate douce","Poireau","Poivron","Pomme de terre de conservation","Potiron","Radis"],"fruits":["Amande sèche","Baie de goji","Coing","Figue","Melon","Mirabelle","Mûre","Myrtille","Noisette","Noix","Pastèque","Pêche","Poire","Pomme","Prune","Pruneau","Raisin","Tomate"],"grains":["Haricot blanc","Maïs","Quinoa","Riz","Sarrasin","Tournesol"]},"10":{"vegetables":["Ail","Aubergine","Betterave","Blette","Brocoli","Carotte","Céleri-branche","Céleri-rave","Chou","Chou blanc","Chou de Bruxelles","Chou-fleur","Chou frisé","Chou rouge","Concombre","Courge","Courgette","Echalote","Endive","Épinard","Fenouil","Frisée","Haricot vert","Laitue","Navet","Oignon","Panais","Patate douce","Poireau","Pomme de terre de conservation","Potiron","Radis","Rutabaga","Salsifi","Topinambour"],"fruits":["Amande sèche","Baie de goji","Châtaigne","Citron","Coing","Figue","Framboise","Kaki","Myrtille","Noisette","Noix","Physalis","Poire","Pomme","Raisin","Tomate"],"grains":["Haricot blanc","Maïs","Quinoa","Riz","Sarrasin","Soja"]},"11":{"vegetables":["Ail","Betterave","Brocoli","Cardon","Carotte","Céleri-branche","Céleri-rave","Chou","Chou blanc","Chou de Bruxelles","Chou-fleur","Chou frisé","Chou rouge","Citrouille","Courge","Crosne","Echalote","Endive","Épinard","Fenouil","Frisée","Mâche","Navet","Oignon","Panais","Poireau","Pomme de terre de conservation","Potiron","Radis","Rutabaga","Salsifi","Topinambour"],"fruits":["Amande sèche","Châtaigne","Citron","Clémentine","Coing","Kaki","Kiwi","Mandarine","Orange","Physalis","Poire","Pomme"],"grains":["Lentille","Maïs"]},"12":{"vegetables":["Ail","Betterave","Carotte","Céleri-branche","Céleri-rave","Chou","Chou blanc","Chou de Bruxelles","Chou frisé","Chou rouge","Courge","Crosne","Echalote","Endive","Épinard","Frisée","Mâche","Navet","Oignon","Panais","Poireau","Pomme de terre de conservation","Potiron","Radis","Rutabaga","Salsifi","Topinambour"],"fruits":["Amande sèche","Châtaigne","Citron","Clémentine","Kaki","Kiwi","Mandarine","Orange","Physalis","Poire","Pomme"],"grains":["Avoine d'hiver","Avoine de printemps","Blé dur d'hiver et de printemps","Blé tendre d'hiver et de printemps","Féveroles et fèves","Lentille","Orge d'hiver","Orge de printemps","Pois","Seigle"]}};
const seasonal={};
Object.entries(seasonalByMonth).forEach(([month,groups])=>Object.values(groups).flat().forEach(name=>{(seasonal[name]??=[]).push(Number(month))}));
let products=JSON.parse(localStorage.getItem("bz_products")||"null")||structuredClone(window.SEED_PRODUCTS);products.forEach(p=>{if(["œuf","œufs","oeufs"].includes(normalize(p.name)))p.name="Oeuf"});
let recipes=JSON.parse(localStorage.getItem("bz_recipes")||"null")||structuredClone(window.SEED_RECIPES);
let shopping=JSON.parse(localStorage.getItem("bz_shopping")||"{}");
let bought=JSON.parse(localStorage.getItem("bz_bought")||"{}");
let history=JSON.parse(localStorage.getItem("bz_history")||"[]");
let streaks=JSON.parse(localStorage.getItem("bz_streaks")||"{}");
let options=JSON.parse(localStorage.getItem("bz_options")||'{"reminders":false,"suggestions":true,"autoFavorites":true}');options.seasonal=true;
let layoutMode=localStorage.getItem("bz_layout")||"vertical";
let densityValue=Number(localStorage.getItem("bz_density")||100);
let shoppingSort=localStorage.getItem("bz_shopping_sort")||"az";
let currentView="home";
let aisles=JSON.parse(localStorage.getItem("bz_aisles")||"null")||["Entrée","Fruits & légumes","Charcuterie","Boucherie","Produits frais","Épicerie","Eau et sodas","Surgelés","Hygiène","Entretien","Sortie"];
let stores=JSON.parse(localStorage.getItem("bz_stores")||"[]");
let activeStoreId=null;
let selectedStoreBlock=null;
if(!aisles.includes("Entrée"))aisles.unshift("Entrée");
if(!aisles.includes("Sortie"))aisles.push("Sortie");
let editingRecipeIngredients=new Set();
const save=()=>{localStorage.setItem("bz_products",JSON.stringify(products));localStorage.setItem("bz_recipes",JSON.stringify(recipes));localStorage.setItem("bz_shopping",JSON.stringify(shopping));localStorage.setItem("bz_bought",JSON.stringify(bought));localStorage.setItem("bz_history",JSON.stringify(history));localStorage.setItem("bz_streaks",JSON.stringify(streaks));localStorage.setItem("bz_options",JSON.stringify(options));localStorage.setItem("bz_aisles",JSON.stringify(aisles));localStorage.setItem("bz_store_order",JSON.stringify(storeOrder));localStorage.setItem("bz_stores",JSON.stringify(stores))};
const productByName=n=>products.find(p=>sameProduct(p.name,n));
const currentMonth=()=>new Date().getMonth()+1;
const isSeasonal=n=>Object.entries(seasonal).some(([k,v])=>sameProduct(k,n)&&v.includes(currentMonth()));
const toast=m=>{const t=$("#toast");t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800)};

document.querySelectorAll(".nav").forEach(b=>b.onclick=()=>switchView(b.dataset.view));

function buildMobileDrawer(){
 const items=[
  ["home","⌂ Accueil"],["products","🧺 Produits"],["shopping","🛒 Ma liste"],["favorites","★ Favoris"],
  ["recipes","🍳 Recettes"],["seasonal","🌱 Saisonnier"],["stats","↗ Statistiques"],["history","◷ Historique"],
  ["store","🗺 Mes magasins"],["options","⚙ Options"]
 ];
 $("#mobileDrawerNav").innerHTML=items.map(([v,l])=>`<button data-drawer-view="${v}">${l}</button>`).join("");
 document.querySelectorAll("[data-drawer-view]").forEach(b=>b.onclick=()=>{switchView(b.dataset.drawerView);document.body.classList.remove("mobile-drawer-open")});
}
$("#mobileMenuBtn").onclick=()=>document.body.classList.add("mobile-drawer-open");
$("#closeMobileDrawer").onclick=$("#mobileDrawerBackdrop").onclick=()=>document.body.classList.remove("mobile-drawer-open");




function switchView(v){
 currentView=v;document.querySelectorAll(".nav").forEach(b=>b.classList.toggle("active",b.dataset.view===v));document.querySelectorAll("[data-drawer-view]").forEach(b=>b.classList.toggle("active",b.dataset.drawerView===v));
   document.querySelectorAll(".view").forEach(x=>x.classList.toggle("active",x.id===v+"View"));
 const data={home:["Accueil","Ton résumé du jour"],products:["Produits","Choisis ce qu’il te faut"],favorites:["Favoris","Tes classiques"],recipes:["Recettes","Ajoute une recette entière"],shopping:["Ma liste","Mode magasin"],seasonal:["Saisonnier","Le calendrier des fruits et légumes"],stats:["Statistiques","Ton suivi de consommation"],history:["Historique","Toutes les courses terminées"],store:["Mon magasin","Organise les rayons comme dans ton magasin"],options:["Paramètres","Active seulement ce qui t’est utile"]};
 $("#pageTitle").textContent=data[v][0];$("#pageSubtitle").textContent=data[v][1];
 $(".top-actions").style.display=["products","favorites","recipes","home"].includes(v)?"flex":"none";
 render();
}
function frequencyClass(f){return normalize(f)==="souvent"?"freq-souvent":normalize(f)==="occasionnel"?"freq-occasionnel":"freq-rare"}
function frequencyLabel(f){return normalize(f)==="rare"?"Rarement":f}
function toggleShopping(name){shopping[name]?delete shopping[name]:shopping[name]=true;delete bought[name];save();render()}
function toggleFavorite(id){const p=products.find(x=>x.id===id);if(p)p.favorite=!p.favorite;save();render()}
window.toggleShopping=toggleShopping;window.toggleFavorite=toggleFavorite;
window.renderShopping=renderShopping;
function itemHTML(p){
 const seasonalTag=isSeasonal(p.name)?'<span class="season-tag">De saison</span>':"";
 return `<div class="item"><input class="tick" type="checkbox" ${shopping[p.name]?"checked":""} onchange="toggleShopping('${jsesc(p.name)}')"><div><div class="item-name">${esc(p.name)}</div><div><span class="freq ${frequencyClass(p.frequency)}">${esc(frequencyLabel(p.frequency))}</span>${seasonalTag}</div></div><button class="star ${p.favorite?"on":""}" onclick="toggleFavorite(${p.id})">★</button><button class="edit-btn" onclick="openEditProduct(${p.id})">✎</button></div>`;
}
function groupHTML(title,arr,color){return `<section class="group" style="--group:${color||"#7e8a9d"}"><div class="group-title" onclick="this.parentElement.classList.toggle('collapsed')"><span class="dot"></span>${esc(title)} <span class="badge">${arr.length}</span></div><div class="items">${arr.map(itemHTML).join("")}</div></section>`}
function renderProducts(){
 const q=$("#searchInput").value.trim().toLowerCase(),sort=$("#sortSelect").value;
 const grid=$("#productsGrid");
 grid.classList.toggle("frequency-layout",sort==="frequency");
 grid.classList.toggle("recipe-layout",sort==="recipe");
 grid.classList.toggle("aisle-layout",sort==="aisle");
 let list=products.filter(p=>p.name.toLowerCase().includes(q));let html="";
 if(sort==="az")html=groupHTML("Tous les produits",list.sort((a,b)=>a.name.localeCompare(b.name)),"#ff6b35");
 else if(sort==="frequency")html=["souvent","occasionnel","rare"].map(f=>groupHTML(f,list.filter(p=>normalize(p.frequency)===f).sort((a,b)=>a.name.localeCompare(b.name)),f==="souvent"?"#46c37b":f==="occasionnel"?"#f7b32b":"#ff5d73")).join("");
 else if(sort==="aisle"){
   const groups=[...new Set(list.map(p=>p.aisle||aisleByCategory[p.category]||"Autre"))].sort((a,b)=>a.localeCompare(b,"fr"));
   html=groups.map(a=>groupHTML(a,list.filter(p=>(p.aisle||aisleByCategory[p.category]||"Autre")===a).sort((x,y)=>x.name.localeCompare(y.name,"fr")),"#b94716")).join("");
 }
 else if(sort==="recipe"){const used=new Set(recipes.flatMap(r=>r.ingredients.map(normalize)));html=recipes.map(r=>groupHTML(r.name,list.filter(p=>r.ingredients.some(n=>normalize(n)===normalize(p.name))).sort((a,b)=>a.name.localeCompare(b.name)),"#c77dff")).join("");const other=list.filter(p=>!used.has(normalize(p.name)));if(other.length)html+=groupHTML("Hors recettes",other,"#7e8a9d")}
 else html=[...new Set(list.map(p=>p.category))].sort().map(c=>groupHTML(c,list.filter(p=>p.category===c).sort((a,b)=>a.name.localeCompare(b.name)),categoryColors[c])).join("");
 $("#productsGrid").innerHTML=html||'<div class="empty">Rien trouvé</div>';renderReminders();
}
function renderFavorites(){const list=products.filter(p=>p.favorite).sort((a,b)=>a.name.localeCompare(b.name));$("#favoritesGrid").innerHTML=list.length?groupHTML("Favoris",list,"#f7b32b"):'<div class="empty">Aucun favori</div>'}
function renderRecipes(){
 $("#recipesGrid").innerHTML=recipes.length?recipes.sort((a,b)=>a.name.localeCompare(b.name,"fr")).map(r=>`<article class="recipe-card"><h3>${esc(r.name)}</h3><p>${r.ingredients.map(esc).join(" · ")}</p>${r.instructions?`<div class="recipe-instructions">${esc(r.instructions)}</div>`:""}<div class="recipe-actions"><button class="primary" onclick="addRecipe(${r.id})">Ajouter à la liste</button><button class="ghost" onclick="speakRecipe(${r.id})">🔊 Lire</button><button class="ghost" onclick="openEditRecipe(${r.id})">✎ Modifier</button></div></article>`).join(""):'<div class="empty">Aucune recette</div>'
}

function shoppingGroups(names){
 const cleanNames=names.filter(Boolean);

 if(shoppingSort==="az"){
   return {"Tous les produits":[...cleanNames].sort((a,b)=>a.localeCompare(b,"fr"))};
 }

 if(shoppingSort==="none"){
   return {"Tous les produits":[...cleanNames]};
 }

 if(shoppingSort==="checked"){
   return {
     "À prendre":[...cleanNames].filter(name=>!bought[name]).sort((a,b)=>a.localeCompare(b,"fr")),
     "Déjà pris":[...cleanNames].filter(name=>!!bought[name]).sort((a,b)=>a.localeCompare(b,"fr"))
   };
 }

 const getGroup=name=>{
   const product=productByName(name);
   if(shoppingSort==="aisle"){
     return product?.aisle
       || aisleByCategory[product?.category]
       || "Autre";
   }
   return product?.category || "Autre";
 };

 return cleanNames.reduce((groups,name)=>{
   const groupName=getGroup(name);
   (groups[groupName]??=[]).push(name);
   return groups;
 },{});
}

function renderShopping(){
 const list=document.querySelector("#shoppingList");
 if(!list)return;
 const names=Object.keys(shopping);
 $("#listCount").textContent=names.length;
 const done=names.filter(n=>bought[n]).length;
 $("#progressBar").style.width=names.length?`${done/names.length*100}%`:"0%";
 if(!names.length){list.innerHTML='<div class="empty">Ta liste est vide</div>';return}
 let groups;
 try{
   groups=shoppingGroups([...names]);
 }catch(error){
   console.error("Impossible de trier la liste",error);
   groups={"Tous les produits":[...names].sort((a,b)=>a.localeCompare(b,"fr"))};
 }
 list.innerHTML=Object.entries(groups).filter(([,arr])=>arr.length).map(([title,arr])=>{
   const rows=arr.map(name=>{
     const p=productByName(name);
     return `<div class="shopping-row ${bought[name]?"done":""}">
       <input class="tick" type="checkbox" ${bought[name]?"checked":""} onchange="toggleBought('${jsesc(name)}')">
       <span>${esc(name)} ${isSeasonal(name)?'<span class="season-tag">De saison</span>':""}</span>
       <span class="category-pill">${esc(p?.category||"Autre")}</span>
       <button class="remove-item-btn" onclick="removeShoppingItem('${jsesc(name)}')">×</button>
     </div>`;
   }).join("");
   return `<section class="shopping-group"><h3>${esc(title)}</h3>${rows}</section>`;
 }).join("");
 renderSuggestions();
}
window.toggleBought=n=>{bought[n]=!bought[n];save();renderShopping()};
$("#clearBoughtBtn").onclick=()=>{Object.keys(bought).filter(n=>bought[n]).forEach(n=>{delete shopping[n];delete bought[n]});save();render()};
$("#finishBtn").onclick=finishShopping;
function finishShopping(){
 const allNames=Object.keys(shopping);if(!allNames.length)return toast("La liste est déjà vide");const names=allNames.filter(n=>bought[n]);if(!names.length)return toast("Aucun produit coché à enregistrer");
 if(!confirm("Enregistrer cette course dans l’historique et vider la liste ?"))return;
 const trip={id:Date.now(),date:new Date().toISOString(),products:names};
 history.unshift(trip);
 const boughtSet=new Set(names.map(productKey));
 products.forEach(p=>{streaks[p.name]=boughtSet.has(productKey(p.name))?(streaks[p.name]||0)+1:0;if(options.autoFavorites&&streaks[p.name]>=3)p.favorite=true});
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
 const m=currentMonth(),groups={vegetables:[...seasonalByMonth[m].vegetables].sort((a,b)=>a.localeCompare(b,"fr")),fruits:[...seasonalByMonth[m].fruits].sort((a,b)=>a.localeCompare(b,"fr")),grains:[...seasonalByMonth[m].grains].sort((a,b)=>a.localeCompare(b,"fr"))},all=[...groups.vegetables,...groups.fruits,...groups.grains];
 $("#seasonTitle").textContent=months[m-1];$("#seasonCount").textContent=all.length;
 const cards=(title,list,icon)=>`<section class="group" style="--group:#46c37b"><div class="group-title"><span>${icon}</span>${title}<span class="badge">${list.length}</span></div><div class="items">${list.map(n=>`<div class="item" style="grid-template-columns:1fr auto"><div><div class="item-name">${esc(n)}</div><span class="season-tag">De saison</span></div><button class="ghost" onclick="addSeasonal('${jsesc(n)}')">+</button></div>`).join("")}</div></section>`;
 $("#currentSeasonGrid").innerHTML=cards("Légumes",groups.vegetables,"🥕")+cards("Fruits",groups.fruits,"🍎")+(groups.grains.length?cards("Céréales & légumineuses",groups.grains,"🌾"):"");
 $("#seasonCalendar").innerHTML=months.map((month,i)=>{const g=seasonalByMonth[i+1],list=[...g.vegetables,...g.fruits,...g.grains].sort((a,b)=>a.localeCompare(b,"fr"));return `<article class="month-card ${i+1===m?"current":""}"><h4>${month}</h4><p>${list.map(esc).join(" · ")}</p></article>`}).join("");
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


function buildStoreRoute(store){
 const present=[...new Set(store.cells.filter(Boolean))];
 const current=store.route.filter(r=>present.includes(r)&&r!=="Entrée"&&r!=="Sortie");
 const newcomers=present.filter(r=>!["Entrée","Sortie"].includes(r)&&!current.includes(r));
 store.route=[];
 if(present.includes("Entrée"))store.route.push("Entrée");
 store.route.push(...current,...newcomers);
 if(present.includes("Sortie"))store.route.push("Sortie");
}
function renderStores(){
 const home=$("#storesHome"),editor=$("#storeEditor");
 if(!home||!editor)return;
 const active=stores.find(s=>s.id===activeStoreId);
 home.classList.toggle("hidden",!!active);
 editor.classList.toggle("hidden",!active);
 if(!active){
   $("#storesList").innerHTML=stores.length?stores.map(s=>`<article class="store-card" onclick="openStore(${s.id})"><strong>${esc(s.name)}</strong><small>${s.size} × ${s.size} · ${s.route.length} blocs placés</small></article>`).join(""):'<div class="empty">Aucun magasin créé</div>';
   return;
 }
 $("#storeEditorTitle").textContent=active.name;
 $("#storeGridSize").value=String(active.size);
 $("#storeGrid").style.gridTemplateColumns=`repeat(${active.size},1fr)`;
 $("#storeGrid").innerHTML=active.cells.map((value,i)=>`<button class="store-cell ${value==="Entrée"?"entry":value==="Sortie"?"exit":value?"occupied":""}" onclick="placeStoreCell(${i})">${value?esc(value):""}</button>`).join("");
 $("#storeBlockPalette").innerHTML=aisles.map(a=>`<button class="palette-block ${selectedStoreBlock===a?"selected":""}" onclick="selectStoreBlock('${jsesc(a)}')">${esc(a)}</button>`).join("");
 $("#storeRoute").innerHTML=active.route.map((r,i)=>`<div class="route-row">
   ${r==="Entrée"?`<span class="route-number">0</span>`:`<input class="route-order-input" type="number" min="1" value="${i}" onchange="setRouteOrder('${jsesc(r)}',this.value)">`}
   <strong>${esc(r)}</strong>
   <span class="route-lock">${r==="Entrée"?"Départ imposé":r==="Sortie"?"Dernier passage":""}</span>
 </div>`).join("")||'<div class="empty">Place au moins Entrée et un rayon</div>';
}

window.setRouteOrder=(rayon,value)=>{
 const store=stores.find(s=>s.id===activeStoreId);if(!store)return;
 if(rayon==="Entrée")return;
 const others=store.route.filter(r=>r!=="Entrée"&&r!==rayon&&r!=="Sortie");
 let index=Math.max(1,Math.min(Number(value)||1,others.length+1));
 others.splice(index-1,0,rayon);
 store.route=["Entrée",...others.filter(r=>r!=="Sortie")];
 if(store.cells.includes("Sortie"))store.route.push("Sortie");
 save();renderStores();renderShopping();
};

window.openStore=id=>{activeStoreId=id;selectedStoreBlock=null;renderStores()};
window.selectStoreBlock=name=>{selectedStoreBlock=name;renderStores()};
window.placeStoreCell=i=>{
 const store=stores.find(s=>s.id===activeStoreId);if(!store)return;
 if(store.cells[i])store.cells[i]=null;
 else if(selectedStoreBlock)store.cells[i]=selectedStoreBlock;
 buildStoreRoute(store);save();renderStores();renderShoppingStoreSelect()
};
function renderShoppingStoreSelect(){
 const sel=$("#shoppingStoreSelect");if(!sel)return;
 sel.innerHTML=stores.map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join("");
 sel.className=shoppingSort==="store"?"store-select-visible":"store-select-hidden";
}
$("#createStoreBtn").onclick=()=>{
 const name=prompt("Nom du magasin");if(!name)return;
 const size=8;
 const cells=Array(size*size).fill(null);
 cells[0]="Entrée";
 cells[cells.length-1]="Sortie";
 const store={id:Date.now(),name:name.trim(),size,cells,route:["Entrée","Sortie"]};stores.push(store);save();openStore(store.id)
};
$("#backToStoresBtn").onclick=()=>{activeStoreId=null;selectedStoreBlock=null;renderStores()};
$("#deleteStoreBtn").onclick=()=>{const s=stores.find(x=>x.id===activeStoreId);if(s&&confirm(`Supprimer ${s.name} ?`)){stores=stores.filter(x=>x.id!==activeStoreId);activeStoreId=null;save();renderStores();renderShoppingStoreSelect()}};
$("#storeGridSize").onchange=e=>{
 const store=stores.find(s=>s.id===activeStoreId);if(!store)return;
 const size=Number(e.target.value);store.size=size;store.cells=Array(size*size).fill(null);store.cells[0]="Entrée";store.cells[store.cells.length-1]="Sortie";store.route=["Entrée","Sortie"];save();renderStores()
};
$("#addStoreBlockBtn").onclick=()=>{const n=prompt("Nom du rayon");if(n&&!aisles.some(a=>normalize(a)===normalize(n))){aisles.push(n.trim());save();renderStores()}};


function renderGlobalAisles(){
 const target=$("#globalAisleManager");if(!target)return;
 target.innerHTML=aisles.map((a,i)=>`<div class="global-aisle-row">
   <input value="${esc(a)}" onchange="renameGlobalAisle(${i},this.value)">
   <button class="ghost danger" onclick="deleteGlobalAisle(${i})">×</button>
 </div>`).join("");
 refreshAisleSelects();
}
window.renameGlobalAisle=(i,name)=>{
 const old=aisles[i],next=name.trim();if(!next)return;
 if(aisles.some((a,j)=>j!==i&&normalize(a)===normalize(next)))return alert("Rayon déjà existant");
 aisles[i]=next;
 products.forEach(p=>{if(p.aisle===old)p.aisle=next});
 stores.forEach(s=>{
   s.cells=s.cells.map(v=>v===old?next:v);
   s.route=s.route.map(v=>v===old?next:v);
 });
 save();render();
};
window.deleteGlobalAisle=i=>{
 const name=aisles[i];
 if(["Entrée","Sortie"].includes(name))return alert("Entrée et Sortie sont obligatoires");
 if(confirm(`Supprimer le rayon ${name} ?`)){
   aisles.splice(i,1);
   products.forEach(p=>{if(p.aisle===name)p.aisle="Autre"});
   stores.forEach(s=>{
     s.cells=s.cells.map(v=>v===name?null:v);
     s.route=s.route.filter(v=>v!==name);
   });
   if(!aisles.includes("Autre"))aisles.push("Autre");
   save();render();
 }
};
$("#globalAddAisleBtn").onclick=()=>{
 const name=prompt("Nom du rayon");
 if(!name)return;
 if(aisles.some(a=>normalize(a)===normalize(name)))return alert("Rayon déjà existant");
 aisles.push(name.trim());save();render();
};

function renderOptions(){
 $("#optReminders").checked=!!options.reminders;$("#optSuggestions").checked=!!options.suggestions;$("#optAutoFavorites").checked=!!options.autoFavorites;
}
["Reminders","Suggestions","AutoFavorites"].forEach(k=>{$("#opt"+k).onchange=e=>{const key=k.charAt(0).toLowerCase()+k.slice(1);options[key]=e.target.checked;save();render()}});
$("#shoppingSort").value=shoppingSort;$("#shoppingSort").onchange=e=>{shoppingSort=e.target.value;localStorage.setItem("bz_shopping_sort",shoppingSort);renderShoppingStoreSelect();renderShopping()};$("#shoppingStoreSelect").onchange=renderShopping;
$("#searchInput").oninput=renderProducts;$("#searchInput").onkeydown=e=>{if(e.key==="Enter"){const q=e.target.value.trim();const p=products.find(x=>normalize(x.name)===normalize(q))||products.find(x=>normalize(x.name).startsWith(normalize(q)));if(p){shopping[p.name]=true;save();toast(`${p.name} ajouté`);e.target.value="";renderProducts()}else toast("Produit introuvable")}};
$("#sortSelect").onchange=renderProducts;
function applyLayout(){
 document.body.classList.toggle("layout-horizontal",layoutMode==="horizontal");
 const btn=$("#layoutToggleBtn");
 if(btn)btn.textContent=layoutMode==="horizontal"?"▦ Horizontal":"☰ Vertical";
}
$("#layoutToggleBtn").onclick=()=>{layoutMode=layoutMode==="vertical"?"horizontal":"vertical";localStorage.setItem("bz_layout",layoutMode);applyLayout()};
function applyDensity(){const v=Math.max(70,Math.min(130,densityValue));document.documentElement.style.setProperty("--density",(v/100).toFixed(2));if($("#densitySlider"))$("#densitySlider").value=v}
$("#densitySlider").oninput=e=>{densityValue=Number(e.target.value);localStorage.setItem("bz_density",densityValue);applyDensity()};
const categories=[...new Set(products.map(p=>p.category))].sort();
function refreshAisleSelects(){
 const html=aisles.map(a=>`<option>${esc(a)}</option>`).join("");
 ["#productAisle","#editProductAisle","#overrideAisle"].forEach(s=>{if($(s))$(s).innerHTML=html});
}
$("#productCategory").innerHTML=$("#editProductCategory").innerHTML=categories.map(c=>`<option>${esc(c)}</option>`).join("");refreshAisleSelects();
$("#addProductBtn").onclick=()=>$("#productDialog").showModal();
document.querySelectorAll(".cancel-dialog").forEach(b=>b.onclick=()=>{b.closest("form").reset();b.closest("dialog").close()});
$("#productForm").onsubmit=e=>{e.preventDefault();const name=$("#productName").value.trim();if(products.some(p=>sameProduct(p.name,name)))return alert("Produit déjà existant");products.push({id:Date.now(),name,category:$("#productCategory").value,frequency:$("#productFrequency").value,aisle:$("#productAisle").value,favorite:$("#productFavorite").checked});save();e.target.reset();$("#productDialog").close();render()};
window.openEditProduct=id=>{const p=products.find(x=>x.id===id);$("#editProductId").value=p.id;$("#editProductName").value=p.name;$("#editProductCategory").value=p.category;$("#editProductFrequency").value=normalize(p.frequency)==="rare"?"rare":p.frequency;$("#editProductFavorite").checked=!!p.favorite;$("#editProductAisle").value=p.aisle||aisleByCategory[p.category]||"Autre";$("#editProductDialog").showModal()};
$("#editProductForm").onsubmit=e=>{e.preventDefault();const id=Number($("#editProductId").value),p=products.find(x=>x.id===id),old=p.name,n=$("#editProductName").value.trim();if(products.some(x=>x.id!==id&&sameProduct(x.name,n)))return alert("Produit déjà existant");p.name=n;p.category=$("#editProductCategory").value;p.frequency=$("#editProductFrequency").value;p.aisle=$("#editProductAisle").value;p.favorite=$("#editProductFavorite").checked;if(old!==n){if(shopping[old]){delete shopping[old];shopping[n]=true}if(bought[old]){delete bought[old];bought[n]=true}history.forEach(h=>h.products=h.products.map(x=>normalize(x)===normalize(old)?n:x));recipes.forEach(r=>r.ingredients=r.ingredients.map(x=>normalize(x)===normalize(old)?n:x))}save();$("#editProductDialog").close();render()};
$("#deleteProductBtn").onclick=()=>{
 const id=Number($("#editProductId").value),p=products.find(x=>x.id===id);if(!p)return;
 if(confirm(`Supprimer ${p.name} ?`)){products=products.filter(x=>x.id!==id);delete shopping[p.name];delete bought[p.name];recipes.forEach(r=>r.ingredients=r.ingredients.filter(n=>!sameProduct(n,p.name)));save();$("#editProductDialog").close();render()}
};
window.removeShoppingItem=n=>{delete shopping[n];delete bought[n];save();renderShopping();renderSidebar()};
function enableSwipe(){
 document.querySelectorAll(".swipe-row").forEach(row=>{let startX=0,dx=0;
 row.ontouchstart=e=>{startX=e.touches[0].clientX;dx=0};
 row.ontouchmove=e=>{dx=e.touches[0].clientX-startX;if(dx<0)row.style.transform=`translateX(${Math.max(dx,-100)}px)`};
 row.ontouchend=()=>{if(dx<-70){removeShoppingItem(row.dataset.product)}else row.style.transform=""};
 });
}
function renderIngredientPicker(){
 const q=normalize($("#ingredientSearch").value);
 $("#ingredientPicker").innerHTML=products.filter(p=>!q||normalize(p.name).includes(q)).sort((a,b)=>a.name.localeCompare(b.name,"fr")).map(p=>`<label class="ingredient-choice"><input type="checkbox" ${[...editingRecipeIngredients].some(n=>sameProduct(n,p.name))?"checked":""} onchange="toggleRecipeIngredient('${jsesc(p.name)}',this.checked)"><span>${esc(p.name)}</span></label>`).join("");
}
window.toggleRecipeIngredient=(name,on)=>{if(on)editingRecipeIngredients.add(name);else [...editingRecipeIngredients].filter(n=>sameProduct(n,name)).forEach(n=>editingRecipeIngredients.delete(n))};
function openRecipeDialog(recipe=null){
 $("#recipeEditId").value=recipe?.id||"";$("#recipeDialogTitle").textContent=recipe?"Modifier la recette":"Nouvelle recette";$("#recipeName").value=recipe?.name||"";$("#recipeInstructions").value=recipe?.instructions||"";editingRecipeIngredients=new Set(recipe?.ingredients||[]);$("#deleteRecipeBtn").style.display=recipe?"block":"none";$("#ingredientSearch").value="";renderIngredientPicker();$("#recipeDialog").showModal()
}
$("#addRecipeBtn").onclick=()=>openRecipeDialog();
window.openEditRecipe=id=>openRecipeDialog(recipes.find(r=>r.id===id));
$("#ingredientSearch").oninput=renderIngredientPicker;
$("#quickAddIngredientBtn").onclick=()=>{
 const name=prompt("Nom du nouvel ingrédient");if(!name)return;
 const existing=products.find(p=>sameProduct(p.name,name));if(existing){editingRecipeIngredients.add(existing.name);toast("Produit déjà existant, ajouté à la recette")}
 else{const category=prompt("Catégorie","Sans catégorie")||"Sans catégorie";const p={id:Date.now(),name:name.trim(),category,frequency:"occasionnel",aisle:"Autre",favorite:false};products.push(p);editingRecipeIngredients.add(p.name);toast("Produit créé et ajouté")}
 save();renderIngredientPicker()
};
$("#recipeForm").onsubmit=e=>{
 e.preventDefault();const id=Number($("#recipeEditId").value)||null,name=$("#recipeName").value.trim(),ingredients=[...editingRecipeIngredients],instructions=$("#recipeInstructions").value.trim();if(!name||!ingredients.length)return alert("Il faut un nom et au moins un ingrédient");
 if(recipes.some(r=>r.id!==id&&normalize(r.name)===normalize(name)))return alert("Recette déjà existante");
 if(id){const r=recipes.find(x=>x.id===id);r.name=name;r.ingredients=ingredients;r.instructions=instructions}else recipes.push({id:Date.now(),name,ingredients,instructions});
 save();$("#recipeDialog").close();render()
};
$("#deleteRecipeBtn").onclick=()=>{const id=Number($("#recipeEditId").value);if(id&&confirm("Supprimer cette recette ?")){recipes=recipes.filter(r=>r.id!==id);save();$("#recipeDialog").close();render()}};
window.speakRecipe=id=>{const r=recipes.find(x=>x.id===id);if(!r)return;const text=`${r.name}. Ingrédients : ${r.ingredients.join(", ")}. ${r.instructions||""}`;speechSynthesis.cancel();speechSynthesis.speak(new SpeechSynthesisUtterance(text))};
$("#exportBtn").onclick=()=>{const blob=new Blob([JSON.stringify({products,recipes,shopping,bought,history,streaks,options,aisles,stores},null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="bebzocourse-sauvegarde.json";a.click();URL.revokeObjectURL(a.href)};
$("#importInput").onchange=async e=>{try{const d=JSON.parse(await e.target.files[0].text());products=d.products||products;recipes=d.recipes||recipes;shopping=d.shopping||{};bought=d.bought||{};history=d.history||[];streaks=d.streaks||{};options=d.options||options;aisles=d.aisles||aisles;stores=d.stores||stores;save();location.reload()}catch{alert("Fichier invalide")}};
document.querySelectorAll(".clear-input").forEach(b=>b.onclick=()=>{const i=$(b.dataset.clear);i.value="";i.dispatchEvent(new Event("input"))});
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


document.querySelectorAll("[data-home-go]").forEach(b=>b.onclick=()=>switchView(b.dataset.homeGo));
function renderHome(){
 const names=Object.keys(shopping).sort((a,b)=>a.localeCompare(b,"fr"));
 const seasonalNow=Object.keys(seasonal).filter(n=>isSeasonal(n)).sort((a,b)=>a.localeCompare(b,"fr"));
 const topRecipes=[...recipes].sort((a,b)=>a.name.localeCompare(b.name,"fr")).slice(0,4);
 $("#homeStats").innerHTML=`
  <article class="home-stat"><strong>${names.length}</strong><small>produits dans la liste</small></article>
  <article class="home-stat"><strong>${products.filter(p=>p.favorite).length}</strong><small>favoris</small></article>
  <article class="home-stat"><strong>${recipes.length}</strong><small>recettes</small></article>
  <article class="home-stat"><strong>${history.length}</strong><small>courses terminées</small></article>`;
 $("#homeShopping").innerHTML=names.length?names.slice(0,7).map(n=>`<div class="home-mini"><span class="home-dot"></span><span>${esc(n)}</span></div>`).join(""):'<div class="empty">Liste vide</div>';
 $("#homeSeasonal").innerHTML=seasonalNow.slice(0,12).map(n=>`<span class="home-chip">${esc(n)}</span>`).join("");
 $("#homeRecipes").innerHTML=topRecipes.length?topRecipes.map(r=>`<div class="home-mini"><span class="home-dot"></span><button class="text-button" onclick="addRecipe(${r.id})">${esc(r.name)}</button></div>`).join(""):'<div class="empty">Pas de recette</div>';
}

function safeRender(name,fn){
 try{fn()}
 catch(err){console.error(`Erreur dans ${name}`,err)}
}
function render(){
 safeRender("Accueil",renderHome);
 safeRender("Produits",renderProducts);
 safeRender("Favoris",renderFavorites);
 safeRender("Recettes",renderRecipes);
 safeRender("Ma liste",renderShopping);
 safeRender("Saisonnier",renderSeasonal);
 safeRender("Statistiques",renderStats);
 safeRender("Historique",renderHistory);
 safeRender("Mes magasins",renderStores);
 safeRender("Options",renderOptions);
 safeRender("Sidebar",renderSidebar);safeRender("Rayons globaux",renderGlobalAisles);safeRender("Sélecteur magasin",renderShoppingStoreSelect);
}
buildMobileDrawer();switchView("home");applyLayout();applyDensity();render();
if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js");
