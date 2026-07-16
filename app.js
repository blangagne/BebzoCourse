
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
const save=()=>{
 localStorage.setItem("bz_products",JSON.stringify(products));
 localStorage.setItem("bz_recipes",JSON.stringify(recipes));
 localStorage.setItem("bz_shopping",JSON.stringify(shopping));
 localStorage.setItem("bz_bought",JSON.stringify(bought));
 localStorage.setItem("bz_history",JSON.stringify(history));
 localStorage.setItem("bz_streaks",JSON.stringify(streaks));
 localStorage.setItem("bz_options",JSON.stringify(options));
 localStorage.setItem("bz_aisles",JSON.stringify(aisles));
 localStorage.setItem("bz_stores",JSON.stringify(stores));
};
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

window.addRecipe=id=>{
 const recipe=recipes.find(r=>r.id===id);
 if(!recipe)return alert("Recette introuvable");

 let added=0;
 recipe.ingredients.forEach(ingredient=>{
   const product=ensureProduct(ingredient);
   if(!shopping[product.name]){
     shopping[product.name]=true;
     added++;
   }
   delete bought[product.name];
 });

 save();
 render();
 switchView("shopping");

 const message=added
   ? `${added} ingrédient${added>1?"s":""} ajouté${added>1?"s":""} à la liste`
   : "Tous les ingrédients étaient déjà dans la liste";

 const toastEl=$("#toast");
 if(toastEl){
   toastEl.style.display="block";
   toastEl.textContent=message;
   toastEl.classList.add("show");
   setTimeout(()=>{
     toastEl.classList.remove("show");
     toastEl.style.display="";
   },1800);
 }
};

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
   return `<section class="shopping-group ${title==="Dans le panier"?"cart-group":""}"><h3>${esc(title)}</h3>${rows}</section>`;
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
if($("#densitySlider")){
 $("#densitySlider").oninput=e=>{
   densityValue=Number(e.target.value);
   localStorage.setItem("bz_density",densityValue);
   applyDensity();
 };
}
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
 const isSelected=p=>[...editingRecipeIngredients].some(n=>sameProduct(n,p.name));

 const filtered=products
   .filter(p=>!q||normalize(p.name).includes(q))
   .sort((a,b)=>{
      const sa=isSelected(a)?0:1;
      const sb=isSelected(b)?0:1;
      return sa-sb || a.name.localeCompare(b.name,"fr");
   });

 const selected=filtered.filter(isSelected);
 const others=filtered.filter(p=>!isSelected(p));
 const row=p=>`<label class="ingredient-choice ${isSelected(p)?"selected":""}">
   <input type="checkbox" ${isSelected(p)?"checked":""}
          onchange="toggleRecipeIngredient('${jsesc(p.name)}',this.checked)">
   <span>${esc(p.name)}</span>
 </label>`;

 let html="";
 if(selected.length){
   html+=`<div class="ingredient-section-title">Sélectionnés</div>${selected.map(row).join("")}`;
 }
 if(others.length){
   html+=`<div class="ingredient-section-title">Tous les produits</div>${others.map(row).join("")}`;
 }
 if(!filtered.length){
   html='<div class="ingredient-empty">Aucun produit trouvé</div>';
 }

 $("#ingredientPicker").innerHTML=html;
 const count=editingRecipeIngredients.size;
 $("#ingredientSelectedCount").textContent=`${count} ingrédient${count>1?"s":""} sélectionné${count>1?"s":""}`;
}
window.toggleRecipeIngredient=(name,on)=>{
 if(on)editingRecipeIngredients.add(name);
 else [...editingRecipeIngredients]
   .filter(n=>sameProduct(n,name))
   .forEach(n=>editingRecipeIngredients.delete(n));
 renderIngredientPicker();
};
function openRecipeDialog(recipe=null){
 $("#recipeEditId").value=recipe?.id||"";$("#recipeDialogTitle").textContent=recipe?"Modifier la recette":"Nouvelle recette";$("#recipeName").value=recipe?.name||"";$("#recipeInstructions").value=recipe?.instructions||"";editingRecipeIngredients=new Set(recipe?.ingredients||[]);$("#deleteRecipeBtn").style.display=recipe?"block":"none";$("#ingredientSearch").value="";renderIngredientPicker();$("#recipeDialog").showModal()
}
$("#addRecipeBtn").onclick=()=>openRecipeDialog();
window.openEditRecipe=id=>openRecipeDialog(recipes.find(r=>r.id===id));
$("#ingredientSearch").oninput=renderIngredientPicker;
$("#clearRecipeIngredientsBtn").onclick=()=>{editingRecipeIngredients.clear();renderIngredientPicker()};
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

// ===== V4.3 MIGRATION ET FONCTIONS =====
const V43_RECIPES=[{"id": 430000, "name": "Galette mexicaine à la viande hachée", "ingredients": ["Tomate", "Viande hachée", "Oignons", "Ail", "Cheddar", "Fromage râpé", "Wraps"], "instructions": "Faire revenir les oignons et l’ail. Ajouter la viande hachée puis la tomate. Garnir les wraps avec la préparation, le cheddar et le fromage râpé. Replier puis dorer à la poêle."}, {"id": 430001, "name": "Pâtes carbonara", "ingredients": ["Oignons", "Crème fraîche", "Pâtes", "Lardons", "Cheddar"], "instructions": "Cuire les pâtes. Faire revenir les oignons et les lardons. Ajouter la crème fraîche et le cheddar, puis mélanger avec les pâtes."}, {"id": 430002, "name": "Pizza chèvre miel", "ingredients": ["Pâte à pizza", "Papier cuisson", "Crème fraîche", "Chèvre", "Miel", "Thym", "Romarin", "Origan"], "instructions": "Dérouler la pâte sur le papier cuisson. Étaler la crème, ajouter le chèvre, le miel et les herbes. Cuire environ 15 à 20 minutes à 210 °C."}, {"id": 430003, "name": "Couscous", "ingredients": ["Aubergine", "Carotte", "Oignons", "Ail", "Courgette", "Merguez", "Boulettes", "Couscous", "Cumin", "Curcuma", "Cannelle", "Sel", "Poivre", "Tomate"], "instructions": "Faire revenir oignons, ail et viandes. Ajouter les légumes, tomate et épices, couvrir d’eau puis mijoter jusqu’à cuisson. Préparer la semoule séparément et servir ensemble."}, {"id": 430004, "name": "Poulet au porto", "ingredients": ["Poulet", "Oignons", "Échalotes", "Porto", "Crème fraîche", "Muscade", "Champignons", "Sel", "Poivre"], "instructions": "Couper les filets de poulet en lamelles. Les faire revenir avec l’oignon et/ou les échalotes. Ajouter généreusement le porto rouge et laisser frémir 30 secondes. Ajouter la crème fraîche, la muscade, le sel, le poivre et les champignons en lamelles. Cuire doucement 10 minutes."}, {"id": 430005, "name": "Bolognaise", "ingredients": ["Laurier", "Oignons", "Carotte", "Viande hachée", "Champignons", "Vin", "Ail", "Tomate", "Concentré de tomate", "Herbes de Provence", "Basilic"], "instructions": "Faire revenir oignons, ail, carotte, champignons et viande. Déglacer au vin. Ajouter tomate, concentré, laurier et herbes. Laisser mijoter au moins 30 minutes."}, {"id": 430006, "name": "Poulet à l’espagnole", "ingredients": ["Chorizo", "Poulet", "Olives noires", "Poivrons", "Tomate", "Sauce tomate", "Ail", "Oignons", "Thym", "Origan", "Paprika"], "instructions": "Faire revenir poulet, chorizo, oignons et ail. Ajouter poivrons, tomates, sauce tomate, olives et épices. Mijoter 20 à 25 minutes."}, {"id": 430007, "name": "Galette bretonne nature", "ingredients": ["Lardons", "Gruyère", "Oeuf", "Tomate", "Galette bretonne"], "instructions": "Faire revenir les lardons. Chauffer la galette, ajouter gruyère, lardons, tomate et casser l’oeuf au centre. Replier les bords et cuire jusqu’à ce que l’oeuf soit pris."}, {"id": 430008, "name": "Galette bretonne saumon", "ingredients": ["Galette bretonne", "Oignons", "Saumon", "Crème fraîche", "Citron"], "instructions": "Faire revenir les oignons. Chauffer la galette, ajouter crème, saumon, oignons et un filet de citron. Replier puis servir."}, {"id": 430009, "name": "Pâtes au saumon", "ingredients": ["Saumon", "Citron", "Emmental râpé", "Pâtes", "Oignons", "Ail", "Estragon", "Aneth"], "instructions": "Cuire les pâtes. Faire revenir oignons et ail, ajouter le saumon, les herbes et le citron. Mélanger aux pâtes puis ajouter l’emmental."}, {"id": 430010, "name": "Le riz forestier d’Astrid", "ingredients": ["Huile d'olive", "Oignons", "Champignons", "Châtaignes", "Persil plat", "Bouillon", "Tomate", "Sel", "Poivre", "Coriandre", "Paprika", "Riz", "Noix", "Parmesan"], "instructions": "Faire revenir oignons, champignons et châtaignes dans l’huile. Ajouter riz, tomate, épices et bouillon. Cuire doucement jusqu’à absorption puis terminer avec persil, noix et parmesan."}, {"id": 430011, "name": "Burger maison", "ingredients": ["Pain hamburger", "Viande hachée", "Oignons", "Cheddar", "Oignons frits", "Tomate", "Ketchup", "Mayonnaise", "Iceberg", "Bacon", "Frites surgelées"], "instructions": "Cuire les frites et le bacon. Former puis cuire les steaks. Monter les burgers avec pain, sauces, salade, tomate, oignons, cheddar, bacon et oignons frits."}, {"id": 430012, "name": "Poulet curry coco", "ingredients": ["Poulet", "Oignons", "Ail", "Lait de coco", "Curry", "Curcuma", "Riz", "Huile d'olive", "Sel", "Poivre"], "instructions": "Faire revenir oignons, ail et poulet. Ajouter curry et curcuma, puis le lait de coco. Mijoter 15 minutes et servir avec du riz."}, {"id": 430013, "name": "Poulet rôti et frites maison", "ingredients": ["Poulet entier", "Pommes de terre", "Ail", "Thym", "Romarin", "Huile d'olive", "Sel", "Poivre"], "instructions": "Assaisonner le poulet avec ail, thym, romarin, huile, sel et poivre. Couper les pommes de terre en frites. Cuire le poulet et les frites au four jusqu’à ce qu’ils soient bien dorés."}, {"id": 430014, "name": "Soupe à l’oignon", "ingredients": ["Oignons", "Beurre", "Farine", "Bouillon", "Pain", "Gruyère", "Sel", "Poivre"], "instructions": "Faire fondre longuement les oignons dans le beurre. Ajouter la farine puis le bouillon. Mijoter 25 minutes. Servir avec pain grillé et gruyère."}, {"id": 430015, "name": "Soupe de potiron", "ingredients": ["Potiron", "Oignons", "Ail", "Bouillon", "Crème fraîche", "Muscade", "Sel", "Poivre"], "instructions": "Faire revenir oignons et ail. Ajouter le potiron et le bouillon. Cuire jusqu’à tendreté, mixer puis ajouter crème et muscade."}, {"id": 430016, "name": "Soupe de potimarron", "ingredients": ["Potimarron", "Oignons", "Ail", "Bouillon", "Crème fraîche", "Muscade", "Sel", "Poivre"], "instructions": "Faire revenir oignons et ail. Ajouter le potimarron en morceaux et le bouillon. Cuire, mixer puis ajouter crème et muscade."}, {"id": 430017, "name": "Soupe de poireaux", "ingredients": ["Poireaux", "Pommes de terre", "Oignons", "Bouillon", "Crème fraîche", "Beurre", "Sel", "Poivre"], "instructions": "Faire fondre oignons et poireaux au beurre. Ajouter pommes de terre et bouillon. Cuire 25 minutes, mixer puis ajouter la crème."}, {"id": 430018, "name": "Chili con carne", "ingredients": ["Viande hachée", "Haricots rouges", "Maïs", "Oignons", "Ail", "Poivrons", "Tomate", "Concentré de tomate", "Cumin", "Paprika", "Piment", "Riz"], "instructions": "Faire revenir viande, oignons et ail. Ajouter poivrons, tomate, concentré et épices. Ajouter haricots et maïs puis mijoter 25 minutes. Servir avec du riz."}, {"id": 430019, "name": "Sandwich viande hachée", "ingredients": ["Pain", "Viande hachée", "Oignons", "Cheddar", "Tomate", "Iceberg", "Mayonnaise", "Ketchup"], "instructions": "Faire revenir la viande et les oignons. Ouvrir le pain puis garnir de sauces, salade, tomate, viande chaude et cheddar."}, {"id": 430020, "name": "Pasta alla Norma", "ingredients": ["Pâtes", "Aubergine", "Tomate", "Ail", "Basilic", "Parmesan", "Huile d'olive", "Sel", "Poivre"], "instructions": "Dorer les aubergines dans l’huile. Préparer une sauce tomate à l’ail. Mélanger avec les pâtes, ajouter aubergines, basilic et parmesan."}, {"id": 430021, "name": "Wrap poulet sauce yaourt ail et pommes de terre écrasées", "ingredients": ["Wraps", "Poulet", "Yaourt à la grecque", "Ail", "Citron", "Pommes de terre", "Huile d'olive", "Paprika", "Tomate", "Iceberg", "Sel", "Poivre"], "instructions": "Cuire les pommes de terre, les écraser sur une plaque avec huile et paprika puis les dorer au four. Cuire le poulet. Mélanger yaourt, ail et citron. Garnir les wraps avec sauce, poulet, légumes et pommes de terre croustillantes."}, {"id": 430022, "name": "Légumes, galettes de pomme de terre et viande hachée", "ingredients": ["Viande hachée", "Galettes de pomme de terre", "Courgette", "Carotte", "Poivrons", "Oignons", "Ail", "Paprika", "Sel", "Poivre"], "instructions": "Cuire les galettes au four. Faire revenir viande, oignons et ail, puis ajouter les légumes et le paprika. Servir avec les galettes."}, {"id": 430023, "name": "Pâtes à l’ail", "ingredients": ["Pâtes", "Ail", "Huile d'olive", "Persil", "Parmesan", "Piment", "Sel", "Poivre"], "instructions": "Cuire les pâtes. Faire doucement revenir l’ail dans l’huile sans le brûler. Ajouter piment et persil puis mélanger avec les pâtes et le parmesan."}, {"id": 430024, "name": "Crêpes", "ingredients": ["Farine", "Oeuf", "Lait", "Beurre", "Sucre", "Sel"], "instructions": "Mélanger farine, sucre et sel. Ajouter les oeufs puis le lait progressivement. Ajouter le beurre fondu, laisser reposer puis cuire les crêpes."}, {"id": 430025, "name": "Pancakes", "ingredients": ["Farine", "Oeuf", "Lait", "Beurre", "Sucre", "Levure chimique", "Sel"], "instructions": "Mélanger les ingrédients secs. Ajouter oeuf, lait et beurre fondu. Cuire de petites louches à la poêle jusqu’à coloration."}, {"id": 430026, "name": "Cookies", "ingredients": ["Farine", "Beurre", "Sucre", "Sucre roux", "Oeuf", "Chocolat", "Levure chimique", "Sel"], "instructions": "Mélanger beurre et sucres, ajouter l’oeuf puis farine, levure, sel et chocolat. Former des boules et cuire 10 à 12 minutes à 180 °C."}, {"id": 430027, "name": "Tartine chèvre miel", "ingredients": ["Pain", "Chèvre", "Miel", "Thym", "Noix"], "instructions": "Garnir les tartines de chèvre, miel, thym et noix. Gratiner au four quelques minutes."}, {"id": 430028, "name": "Crousty chou-fleur au pesto", "ingredients": ["Chou-fleur", "Pesto", "Chapelure", "Parmesan", "Oeuf", "Huile d'olive", "Sel", "Poivre"], "instructions": "Précuire le chou-fleur. L’enrober de pesto puis d’oeuf, chapelure et parmesan. Cuire au four jusqu’à ce qu’il soit croustillant."}, {"id": 430029, "name": "Velouté de chou-fleur", "ingredients": ["Chou-fleur", "Pommes de terre", "Oignons", "Bouillon", "Crème fraîche", "Muscade", "Sel", "Poivre"], "instructions": "Faire revenir l’oignon. Ajouter chou-fleur, pommes de terre et bouillon. Cuire, mixer puis ajouter crème et muscade."}, {"id": 430030, "name": "Mousse au chocolat", "ingredients": ["Chocolat", "Oeuf", "Sucre", "Sel"], "instructions": "Faire fondre le chocolat. Séparer les oeufs, mélanger les jaunes au chocolat. Monter les blancs avec une pincée de sel et les incorporer délicatement. Réserver au frais."}];
const V43_AISLES=["Fruit et légume", "Boulangerie", "Apéro", "Pain", "Petit dej / céréales", "Pâte riz", "Sauce", "Conserve", "Huile et vinaigre", "Épice et aromates", "Boissons", "Produit frais", "Surgelé", "Charcuterie", "Boucherie", "Produit du monde", "Poisson", "Fromagerie", "Hygiène et beauté", "Entretien", "Cuisine", "Papeterie", "Électroménager"];
let profile=JSON.parse(localStorage.getItem("bz_profile")||'{"name":"Benjamin","image":""}');

function inferAisle(name,category=""){
 const n=normalize(name);
 const rules=[
  ["Fruit et légume",["tomate","courgette","aubergine","carotte","oignon","ail","poireau","poivron","champignon","salade","iceberg","roquette","avocat","pomme","poire","citron","orange","fraise","framboise","myrtille","banane","mangue","kiwi","potiron","potimarron","chou","navet","panais","epinard","concombre","hericot vert","haricot vert","patate douce"]],
  ["Boulangerie",["baguette","croissant","viennoiserie"]],
  ["Pain",["pain","wrap","galette bretonne","pate a pizza"]],
  ["Petit dej / céréales",["cereale","flocon","confiture","beurre de cacahuete","sirop"]],
  ["Pâte riz",["pate","riz","couscous","semoule","lentille","quinoa"]],
  ["Sauce",["ketchup","mayonnaise","mayo","moutarde","sauce","pesto","passata","concentre"]],
  ["Conserve",["thon en boite","haricot rouge","mais","olive","cornichon","capre"]],
  ["Huile et vinaigre",["huile","vinaigre"]],
  ["Épice et aromates",["sel","poivre","paprika","curry","curcuma","cumin","cannelle","muscade","thym","romarin","origan","basilic","persil","aneth","estragon","laurier","coriandre","piment","herbes de provence"]],
  ["Boissons",["eau","jus","limonade","biere","vin","porto","cafe","gin","cranberry"]],
  ["Produit frais",["oeuf","creme fraiche","lait","yaourt","beurre"]],
  ["Surgelé",["frite surgelee","frites surgelees","galette de pomme de terre","pizza"]],
  ["Charcuterie",["lardon","bacon","jambon","chorizo","merguez"]],
  ["Boucherie",["poulet","viande hachee","boulette","steak"]],
  ["Produit du monde",["lait de coco","tortilla","wrap","couscous"]],
  ["Poisson",["saumon","thon","poisson"]],
  ["Fromagerie",["cheddar","gruyere","emmental","parmesan","chevre","mozzarella","feta","fromage"]],
  ["Hygiène et beauté",["dentifrice","gel douche","shampoing","deodorant","savon","mouchoir"]],
  ["Entretien",["lessive","produit vaisselle","sac poubelle","eponge","essuie tout","papier toilette","pastille lave vaisselle","adoucissant"]],
  ["Cuisine",["papier cuisson","papier aluminium","film alimentaire","sac congelation","verre doseur"]],
  ["Papeterie",["papier","stylo","cahier"]],
  ["Électroménager",["pile","ampoule"]]
 ];
 for(const [aisle,words] of rules)if(words.some(w=>n.includes(w)))return aisle;
 if(category==="Fruits"||category==="Légumes")return "Fruit et légume";
 if(category==="Boissons")return "Boissons";
 if(category==="Hygiène")return "Hygiène et beauté";
 if(category==="Maison")return "Entretien";
 if(category==="Viandes & poissons")return "Boucherie";
 if(category==="Produits laitiers")return "Produit frais";
 return "Produit frais";
}

function ensureProduct(name){
 let p=productByName(name);
 if(p)return p;
 const fruitWords=["abricot","cassis","cerise","citron","fraise","framboise","groseille","kiwi","melon","mirabelle","myrtille","pasteque","peche","poire","pomme","prune","raisin","banane","mangue","orange"];
 const vegWords=["tomate","aubergine","carotte","courgette","oignon","ail","poireau","poivron","chou","potiron","potimarron","champignon"];
 let category=fruitWords.some(x=>normalize(name).includes(x))?"Fruits":vegWords.some(x=>normalize(name).includes(x))?"Légumes":"Sans catégorie";
 p={id:Date.now()+Math.random(),name,category,frequency:"occasionnel",aisle:inferAisle(name,category),favorite:false};
 products.push(p);return p;
}

function migrateV43(){
 aisles=[...V43_AISLES];
 products.forEach(p=>p.aisle=inferAisle(p.name,p.category));
 V43_RECIPES.forEach(recipe=>{
   recipe.ingredients.forEach(ensureProduct);
   const existing=recipes.find(r=>normalize(r.name)===normalize(recipe.name));
   if(existing){existing.ingredients=[...recipe.ingredients];existing.instructions=recipe.instructions}
   else recipes.push(structuredClone(recipe));
 });
 stores.forEach(store=>{
   store.cells=store.cells.map(v=>v==="Entrée"||v==="Sortie"||V43_AISLES.includes(v)?v:null);
   store.route=store.route.filter(v=>v==="Entrée"||v==="Sortie"||V43_AISLES.includes(v));
 });
 localStorage.setItem("bz_v43_migrated","1");
 save();
}
if(localStorage.getItem("bz_v43_migrated")!=="1")migrateV43();

function applyProfile(){
 const displayName=profile.name?.trim()||"Benjamin";
 document.querySelectorAll(".brand h1").forEach(el=>el.textContent="Bebzocourse");
 document.querySelectorAll(".brand span").forEach(el=>el.textContent=`Les courses de ${displayName}`);
 const hello=document.querySelector(".welcome-card .eyebrow");
 if(hello)hello.textContent=`Bonjour ${displayName}`;
 const src=profile.image||"avatar_bebou.png";
 document.querySelectorAll(".avatar,.welcome-card img,.mobile-drawer-head img").forEach(img=>img.src=src);
 if($("#profilePreview"))$("#profilePreview").src=src;
 if($("#profileName"))$("#profileName").value=displayName;
}
$("#profileName").onchange=e=>{profile.name=e.target.value.trim()||"Benjamin";localStorage.setItem("bz_profile",JSON.stringify(profile));applyProfile()};
$("#profileImageInput").onchange=e=>{
 const file=e.target.files?.[0];if(!file)return;
 const reader=new FileReader();reader.onload=()=>{profile.image=reader.result;localStorage.setItem("bz_profile",JSON.stringify(profile));applyProfile()};reader.readAsDataURL(file)
};
$("#resetProfileImage").onclick=()=>{profile.image="";localStorage.setItem("bz_profile",JSON.stringify(profile));applyProfile()};

function updateProductPrediction(){
 const value=$("#productName").value.trim(),box=$("#productPrediction");
 if(!value){box.classList.remove("show");box.textContent="";return}
 const matches=products.filter(p=>normalize(p.name).includes(normalize(value))||normalize(value).includes(normalize(p.name))).slice(0,5);
 if(matches.length){box.innerHTML=`Déjà proche : ${matches.map(p=>`<strong>${esc(p.name)}</strong>`).join(" · ")}`;box.classList.add("show")}
 else{box.classList.remove("show");box.textContent=""}
}
$("#productSuggestions").innerHTML=products.sort((a,b)=>a.name.localeCompare(b.name,"fr")).map(p=>`<option value="${esc(p.name)}">`).join("");
$("#productName").addEventListener("input",updateProductPrediction);

const originalRenderRecipes=renderRecipes;
renderRecipes=function(){
 $("#recipesGrid").innerHTML=recipes.length?recipes.sort((a,b)=>a.name.localeCompare(b.name,"fr")).map(r=>`<article class="recipe-card">
  <h3>${esc(r.name)}</h3>
  <ul class="recipe-ingredients">${r.ingredients.map(i=>`<li>${esc(i)}</li>`).join("")}</ul>
  ${r.instructions?`<div class="recipe-instructions">${esc(r.instructions)}</div>`:""}
  <div class="recipe-actions"><button class="primary" onclick="addRecipe(${r.id})">Ajouter à la liste</button><button class="ghost" onclick="speakRecipe(${r.id})">🔊 Lire</button><button class="ghost" onclick="openEditRecipe(${r.id})">✎ Modifier</button></div>
 </article>`).join(""):'<div class="empty">Aucune recette</div>'
};

const originalRenderSeasonal=renderSeasonal;
renderSeasonal=function(){
 const m=currentMonth(),groups={
  vegetables:[...seasonalByMonth[m].vegetables].sort((a,b)=>a.localeCompare(b,"fr")),
  fruits:[...seasonalByMonth[m].fruits].sort((a,b)=>a.localeCompare(b,"fr")),
  grains:[...seasonalByMonth[m].grains].sort((a,b)=>a.localeCompare(b,"fr"))
 },all=[...groups.vegetables,...groups.fruits,...groups.grains];
 $("#seasonTitle").textContent=months[m-1];$("#seasonCount").textContent=all.length;
 const cards=(title,list,icon)=>`<section class="group" style="--group:#8daa7a"><div class="group-title" onclick="this.parentElement.classList.toggle('collapsed')"><span>${icon}</span>${title}<span class="badge">${list.length}</span></div><div class="items">${list.map(n=>`<div class="item" style="grid-template-columns:1fr auto"><div><div class="item-name">${esc(n)}</div><span class="season-tag">De saison</span></div><button class="ghost" onclick="addSeasonal('${jsesc(n)}')">+</button></div>`).join("")}</div></section>`;
 $("#currentSeasonGrid").innerHTML=cards("Légumes",groups.vegetables,"🥕")+cards("Fruits",groups.fruits,"🍎")+(groups.grains.length?cards("Céréales & légumineuses",groups.grains,"🌾"):"");
 $("#seasonCalendar").innerHTML=months.map((month,i)=>{const g=seasonalByMonth[i+1],list=[...g.vegetables,...g.fruits,...g.grains].sort((a,b)=>a.localeCompare(b,"fr"));return `<article class="month-card ${i+1===m?"current":""}"><h4>${month}</h4><p>${list.map(esc).join(" · ")}</p></article>`}).join("");
};

function renderMonthBars(targetId,values,formatter=v=>v){
 const target=$(targetId);if(!target)return;
 const max=Math.max(1,...values);
 target.innerHTML=values.map((v,i)=>`<div class="month-bar"><div class="month-bar-track"><div class="month-bar-fill" style="height:${Math.max(v?4:0,v/max*100)}%"></div></div><strong>${formatter(v)}</strong><small>${months[i].slice(0,3)}</small></div>`).join("");
}
renderStats=function(){
 const counts=productStats(),totalProducts=Object.values(counts).reduce((a,b)=>a+b,0),top=Object.entries(counts).sort((a,b)=>b[1]-a[1]);
 const totalSpent=history.reduce((s,h)=>s+(Number(h.amount)||0),0),avg=history.length?totalSpent/history.length:0;
 $("#statCards").innerHTML=`<article class="stat-card"><strong>${history.length}</strong><small>courses terminées</small></article><article class="stat-card"><strong>${totalProducts}</strong><small>produits achetés</small></article><article class="stat-card"><strong>${totalSpent.toFixed(2)} €</strong><small>dépensés au total</small></article><article class="stat-card"><strong>${avg.toFixed(2)} €</strong><small>panier moyen</small></article>`;
 $("#topProducts").innerHTML=top.slice(0,10).map(([n,c])=>`<div class="bar-row"><span>${esc(n)}</span><div class="bar-track"><div class="bar-fill" style="width:${top[0]?c/top[0][1]*100:0}%"></div></div><b>${c}</b></div>`).join("")||'<div class="empty">Pas encore de données</div>';
 const year=new Date().getFullYear(),trips=Array(12).fill(0),expenses=Array(12).fill(0);
 history.forEach(h=>{const d=new Date(h.date);if(d.getFullYear()===year){trips[d.getMonth()]++;expenses[d.getMonth()]+=Number(h.amount)||0}});
 renderMonthBars("#monthlyBars",trips,v=>String(v));
 renderMonthBars("#expenseBars",expenses,v=>v?`${v.toFixed(0)} €`:"0 €");
};

window.addHistoryProduct=name=>{const p=ensureProduct(name);shopping[p.name]=true;save();render();};
renderHistory=function(){
 $("#historyList").innerHTML=history.length?history.map(h=>`<article class="history-card"><div class="history-head" onclick="this.parentElement.classList.toggle('open')"><div><strong>${new Date(h.date).toLocaleDateString("fr-BE",{dateStyle:"long"})}</strong><small> · ${h.products.length} produits${h.amount!=null?` · ${Number(h.amount).toFixed(2)} €`:""}</small></div><span>▾</span></div><div class="history-products">${h.products.map(n=>`<button class="history-product" onclick="event.stopPropagation();addHistoryProduct('${jsesc(n)}')">+ ${esc(n)}</button>`).join("")}</div></article>`).join(""):'<div class="empty">Aucune course enregistrée</div>';
};

function launchConfetti(){
 const layer=$("#confettiLayer"),colors=["#b94716","#e7ad39","#8daa7a","#5b2a1c","#f09a7b"];
 layer.innerHTML="";
 for(let i=0;i<70;i++){const p=document.createElement("span");p.className="confetti-piece";p.style.left=`${Math.random()*100}%`;p.style.background=colors[i%colors.length];p.style.animationDelay=`${Math.random()*.4}s`;p.style.transform=`rotate(${Math.random()*360}deg)`;layer.appendChild(p)}
 setTimeout(()=>layer.innerHTML="",2200);
}
$("#finishBtn").onclick=()=>{
 const checked=Object.keys(shopping).filter(n=>bought[n]);
 if(!checked.length)return alert("Aucun produit coché à enregistrer");
 $("#finishAmount").value="";$("#finishDialog").showModal();
};
$("#cancelFinishBtn").onclick=()=>$("#finishDialog").close();
$("#finishForm").onsubmit=e=>{
 e.preventDefault();
 const names=Object.keys(shopping).filter(n=>bought[n]);
 const amount=Number(String($("#finishAmount").value).replace(",", "."))||0;
 history.unshift({id:Date.now(),date:new Date().toISOString(),products:names,amount});
 const boughtSet=new Set(names.map(productKey));
 products.forEach(p=>{streaks[p.name]=boughtSet.has(productKey(p.name))?(streaks[p.name]||0)+1:0;if(options.autoFavorites&&streaks[p.name]>=3)p.favorite=true});
 shopping={};bought={};save();$("#finishDialog").close();launchConfetti();render();
};

function shoppingGroupsV43(names){
 if(shoppingSort!=="store")return shoppingGroups(names);
 const store=stores.find(s=>s.id===Number($("#shoppingStoreSelect")?.value));
 if(!store)return {"Tous les produits":[...names].sort((a,b)=>a.localeCompare(b,"fr"))};
 const order=new Map(store.route.map((r,i)=>[r,i]));
 const sorted=[...names].sort((a,b)=>{
  const pa=productByName(a),pb=productByName(b);
  const aa=pa?.aisle||inferAisle(a,pa?.category),ab=pb?.aisle||inferAisle(b,pb?.category);
  return (order.get(aa)??999)-(order.get(ab)??999)||a.localeCompare(b,"fr")
 });
 return sorted.reduce((g,n)=>{const p=productByName(n),a=p?.aisle||inferAisle(n,p?.category);(g[a]??=[]).push(n);return g},{});
}
const oldShoppingGroups=shoppingGroups;
shoppingGroups=function(names){return shoppingSort==="store"?shoppingGroupsV43(names):oldShoppingGroups(names)};

const oldRenderStores=renderStores;
renderStores=function(){
 oldRenderStores();
 const active=stores.find(s=>s.id===activeStoreId);if(!active)return;
 const routeOrder=new Map(active.route.map((r,i)=>[r,i]));
 document.querySelectorAll("#storeGrid .store-cell").forEach((cell,i)=>{
   const value=active.cells[i];if(!value)return;
   const badge=document.createElement("span");badge.className="store-cell-order";badge.textContent=routeOrder.get(value)??"?";cell.appendChild(badge)
 });
};

const oldRender=render;
render=function(){oldRender();applyProfile();if($("#productSuggestions"))$("#productSuggestions").innerHTML=products.sort((a,b)=>a.name.localeCompare(b.name,"fr")).map(p=>`<option value="${esc(p.name)}">`).join("")};
applyProfile();render();


// ===== V4.3.3 CORRECTIONS =====
const V433_SPECIAL_BLOCKS=["Entrée","Caisse"];
const V433_AISLES=[
 "Fruit et légume","Boulangerie","Apéro","Pain","Petit dej / céréales","Pâte riz",
 "Épicerie","Sauce","Conserve","Huile et vinaigre","Épice et aromates","Boissons",
 "Produit frais","Surgelé","Charcuterie","Boucherie","Produit du monde","Poisson",
 "Fromagerie","Hygiène et beauté","Entretien","Cuisine","Papeterie","Électroménager"
];

const V433_AISLE_OVERRIDES={
 "cafe":"Petit dej / céréales",
 "ciboulette":"Fruit et légume",
 "lard":"Charcuterie",
 "jambon":"Charcuterie",
 "jambon cru":"Charcuterie",
 "merguez":"Boucherie",
 "huile dolive":"Huile et vinaigre",
 "pastille lave vaisselle":"Entretien",
 "pastilles lave vaisselle":"Entretien",
 "produit vaisselle":"Entretien",
 "produit vaiselle":"Entretien",
 "concentre de tomate":"Conserve",
 "galette de pomme de terre":"Surgelé",
 "galettes de pomme de terre":"Surgelé",
 "jus de citron":"Boissons",
 "jus de pomme":"Boissons",
 "petit pois":"Conserve",
 "petits pois":"Conserve",
 "chorizo":"Apéro",
 "vinaigre de riz":"Huile et vinaigre",
 "sirop":"Boissons",
 "amande":"Épice et aromates",
 "amandes":"Épice et aromates",
 "amende":"Épice et aromates",
 "amendes":"Épice et aromates",
 "baie rose":"Épice et aromates",
 "bouillon":"Épice et aromates",
 "boursin":"Fromagerie",
 "brie":"Fromagerie",
 "chapelure":"Épicerie",
 "chocolat":"Épicerie",
 "farine":"Épicerie",
 "frite":"Surgelé",
 "frites":"Surgelé",
 "galette bretonne":"Pain",
 "galettes bretonnes":"Pain",
 "galette mexicaine":"Pain",
 "galettes mexicaines":"Pain",
 "haricot rouge":"Conserve",
 "haricots rouges":"Conserve",
 "levure chimique":"Épicerie",
 "miel":"Épicerie",
 "noisette":"Épicerie",
 "noisettes":"Épicerie",
 "noix":"Épicerie",
 "pignon de pin":"Épicerie",
 "pignons de pin":"Épicerie",
 "sucre":"Épicerie",
 "sucre roux":"Épicerie"
};

function v433ExactAisle(name){
 const key=normalize(name);
 return V433_AISLE_OVERRIDES[key] || V433_AISLE_OVERRIDES[productKey(name)] || null;
}

const v433OldInferAisle=inferAisle;
inferAisle=function(name,category=""){
 const exact=v433ExactAisle(name);
 if(exact)return exact;
 const inferred=v433OldInferAisle(name,category);
 if(["Entrée","Sortie","Caisse"].includes(inferred))return "Épicerie";
 return V433_AISLES.includes(inferred)?inferred:"Épicerie";
};

function migrateV433(){
 aisles=[...V433_AISLES];
 products.forEach(product=>{
   product.aisle=inferAisle(product.name,product.category);
 });
 stores.forEach(store=>{
   store.cells=store.cells.map(value=>{
     if(value==="Sortie")return "Caisse";
     if(V433_SPECIAL_BLOCKS.includes(value)||V433_AISLES.includes(value))return value;
     return null;
   });
   const present=[...new Set(store.cells.filter(Boolean))];
   const previous=store.route.map(value=>value==="Sortie"?"Caisse":value);
   store.route=previous.filter(value=>present.includes(value));
   present.forEach(value=>{if(!store.route.includes(value))store.route.push(value)});
   if(present.includes("Entrée")){
     store.route=store.route.filter(v=>v!=="Entrée");
     store.route.unshift("Entrée");
   }
   if(present.includes("Caisse")){
     store.route=store.route.filter(v=>v!=="Caisse");
     store.route.push("Caisse");
   }
 });
 localStorage.setItem("bz_v433_migrated","1");
 save();
}
if(localStorage.getItem("bz_v433_migrated")!=="1")migrateV433();

// Favoris : aucune checkbox, juste le nom, l’étoile et la modification.
renderFavorites=function(){
 const list=products.filter(p=>p.favorite).sort((a,b)=>a.name.localeCompare(b.name,"fr"));
 if(!list.length){
   $("#favoritesGrid").innerHTML='<div class="empty">Aucun favori</div>';
   return;
 }
 $("#favoritesGrid").innerHTML=`<section class="group" style="--group:#e7ad39">
   <div class="group-title"><span class="dot"></span>Favoris <span class="badge">${list.length}</span></div>
   <div class="items">${list.map(p=>`<div class="favorite-item">
     <div>
       <div class="item-name">${esc(p.name)}</div>
       <span class="freq ${frequencyClass(p.frequency)}">${esc(frequencyLabel(p.frequency))}</span>
       ${isSeasonal(p.name)?'<span class="season-tag">De saison</span>':""}
     </div>
     <button class="star on" onclick="toggleFavorite(${p.id})" title="Retirer des favoris">★</button>
     <button class="edit-btn" onclick="openEditProduct(${p.id})" title="Modifier">✎</button>
   </div>`).join("")}</div>
 </section>`;
};

// Suggestions : Tomate et Tomates sont désormais le même produit.
renderSuggestions=function(){
 const panel=$("#suggestionsPanel");
 if(!options.suggestions){panel.innerHTML="";return}
 const selectedKeys=new Set(Object.keys(shopping).map(productKey));
 const candidates=recipes.map(recipe=>{
   const have=recipe.ingredients.filter(i=>selectedKeys.has(productKey(i)));
   const missing=recipe.ingredients.filter(i=>!selectedKeys.has(productKey(i)));
   return {r:recipe,have,missing};
 }).filter(x=>x.have.length>=2&&x.missing.length&&x.have.length>=x.r.ingredients.length/2).slice(0,2);
 panel.innerHTML=candidates.map(x=>`<div class="suggestion">
   <span>Pour <strong>${esc(x.r.name)}</strong>, il manque ${x.missing.map(name=>esc(productByName(name)?.name||name)).join(", ")}</span>
   <button class="ghost" onclick="addMissing(${x.r.id})">Ajouter</button>
 </div>`).join("");
};
window.addMissing=id=>{
 const recipe=recipes.find(r=>r.id===id);if(!recipe)return;
 recipe.ingredients.forEach(name=>{
   const product=ensureProduct(name);
   shopping[product.name]=true;
   delete bought[product.name];
 });
 save();renderShopping();renderHome();
};

// Recettes repliées par défaut.
renderRecipes=function(){
 const sorted=[...recipes].sort((a,b)=>a.name.localeCompare(b.name,"fr"));
 $("#recipesGrid").innerHTML=sorted.length?sorted.map(r=>`<article class="recipe-card collapsed">
   <div class="recipe-card-head" onclick="this.parentElement.classList.toggle('collapsed')">
     <h3>${esc(r.name)}</h3><span class="recipe-card-arrow">▾</span>
   </div>
   <div class="recipe-card-body">
     <ul class="recipe-ingredients">${r.ingredients.map(i=>`<li>${esc(i)}</li>`).join("")}</ul>
     ${r.instructions?`<div class="recipe-instructions">${esc(r.instructions)}</div>`:""}
     <div class="recipe-actions">
       <button class="primary" onclick="event.stopPropagation();addRecipe(${r.id})">Ajouter à la liste</button>
       <button class="ghost" onclick="event.stopPropagation();speakRecipe(${r.id})">🔊 Lire</button>
       <button class="ghost" onclick="event.stopPropagation();openEditRecipe(${r.id})">✎ Modifier</button>
     </div>
   </div>
 </article>`).join(""):'<div class="empty">Aucune recette</div>';
};

// Entrée et Caisse sont des blocs spéciaux, jamais des rayons de produit.
const v433OldRenderStores=renderStores;
renderStores=function(){
 const home=$("#storesHome"),editor=$("#storeEditor");
 if(!home||!editor)return;
 const active=stores.find(s=>s.id===activeStoreId);
 home.classList.toggle("hidden",!!active);
 editor.classList.toggle("hidden",!active);
 if(!active){
   $("#storesList").innerHTML=stores.length?stores.map(s=>`<article class="store-card" onclick="openStore(${s.id})">
     <strong>${esc(s.name)}</strong><small>${s.size} × ${s.size} · ${s.route.length} blocs placés</small>
   </article>`).join(""):'<div class="empty">Aucun magasin créé</div>';
   return;
 }
 $("#storeEditorTitle").textContent=active.name;
 $("#storeGridSize").value=String(active.size);
 $("#storeGrid").style.gridTemplateColumns=`repeat(${active.size},1fr)`;
 const order=new Map(active.route.map((r,i)=>[r,i]));
 $("#storeGrid").innerHTML=active.cells.map((value,i)=>`<button class="store-cell ${value==="Entrée"?"entry":value==="Caisse"?"exit":value?"occupied":""}" onclick="placeStoreCell(${i})">
   ${value?`<span class="store-cell-order">${order.get(value)??"?"}</span>${esc(value)}`:""}
 </button>`).join("");
 $("#storeBlockPalette").innerHTML=`
   <div class="store-special-title">Parcours</div>
   ${V433_SPECIAL_BLOCKS.map(a=>`<button class="palette-block special ${selectedStoreBlock===a?"selected":""}" onclick="selectStoreBlock('${jsesc(a)}')">${esc(a)}</button>`).join("")}
   <div class="store-special-title">Rayons</div>
   ${aisles.map(a=>`<button class="palette-block ${selectedStoreBlock===a?"selected":""}" onclick="selectStoreBlock('${jsesc(a)}')">${esc(a)}</button>`).join("")}`;
 $("#storeRoute").innerHTML=active.route.map((r,i)=>`<div class="route-row">
   ${r==="Entrée"?'<span class="route-number">0</span>':`<input class="route-order-input" type="number" min="1" value="${i}" onchange="setRouteOrder('${jsesc(r)}',this.value)">`}
   <strong>${esc(r)}</strong>
   <span class="route-lock">${r==="Entrée"?"Départ imposé":r==="Caisse"?"Dernier passage":""}</span>
 </div>`).join("")||'<div class="empty">Place au moins Entrée et un rayon</div>';
};

// Nouveaux magasins avec Entrée et Caisse déjà placées.
$("#createStoreBtn").onclick=()=>{
 const name=prompt("Nom du magasin");if(!name)return;
 const size=8,cells=Array(size*size).fill(null);
 cells[0]="Entrée";cells[cells.length-1]="Caisse";
 const store={id:Date.now(),name:name.trim(),size,cells,route:["Entrée","Caisse"]};
 stores.push(store);save();openStore(store.id);
};
$("#storeGridSize").onchange=e=>{
 const store=stores.find(s=>s.id===activeStoreId);if(!store)return;
 const size=Number(e.target.value),cells=Array(size*size).fill(null);
 cells[0]="Entrée";cells[cells.length-1]="Caisse";
 store.size=size;store.cells=cells;store.route=["Entrée","Caisse"];
 save();renderStores();
};

// Réapplique le classement et le rendu au chargement.
products.forEach(product=>product.aisle=inferAisle(product.name,product.category));
save();
render();


// ===== V4.3.4 FEEDBACK GLOBAL =====
function vibrate(pattern=22){
 if(navigator.vibrate)navigator.vibrate(pattern);
}

function visualPress(element,state="press"){
 if(!element)return;
 element.classList.remove("press-flash","added-feedback","already-feedback");
 void element.offsetWidth;
 if(state==="added")element.classList.add("added-feedback");
 else if(state==="already")element.classList.add("already-feedback");
 else element.classList.add("press-flash");
 setTimeout(()=>element.classList.remove("press-flash","added-feedback","already-feedback"),900);
}

function showActionMessage(message){
 const toast=$("#toast");
 if(!toast)return;
 toast.style.display="block";
 toast.textContent=message;
 toast.classList.add("show");
 clearTimeout(window.__bzToastTimer);
 window.__bzToastTimer=setTimeout(()=>{
   toast.classList.remove("show");
   toast.style.display="none";
 },1400);
}

document.addEventListener("pointerdown",event=>{
 const target=event.target.closest("button,.button-like,.palette-block,.store-cell,.ingredient-choice,.history-product,.season-card,.store-card");
 if(!target)return;
 target.classList.add("press-feedback");
 vibrate(12);
});
document.addEventListener("pointerup",event=>{
 const target=event.target.closest("button,.button-like,.palette-block,.store-cell,.ingredient-choice,.history-product,.season-card,.store-card");
 if(!target)return;
 target.classList.remove("press-feedback");
 visualPress(target);
});
document.addEventListener("pointercancel",()=>{
 document.querySelectorAll(".press-feedback").forEach(el=>el.classList.remove("press-feedback"));
});

// Ajout d’un produit : bloque proprement s’il est déjà dans la liste.
const oldToggleShopping=toggleShopping;
toggleShopping=function(name){
 const product=productByName(name);
 const realName=product?.name||name;
 if(shopping[realName]){
   const btn=document.activeElement;
   visualPress(btn,"already");
   vibrate([18,35,18]);
   showActionMessage(`${realName} est déjà dans la liste`);
   return false;
 }
 shopping[realName]=true;
 delete bought[realName];
 save();
 render();
 const btn=document.activeElement;
 visualPress(btn,"added");
 vibrate(28);
 showActionMessage(`${realName} ajouté à la liste`);
 return true;
};
window.toggleShopping=toggleShopping;

// Saisonnier : même logique, plus de doublon silencieux.
window.addSeasonal=function(name){
 let product=productByName(name)||ensureProduct(name);
 if(shopping[product.name]){
   visualPress(document.activeElement,"already");
   vibrate([18,35,18]);
   showActionMessage(`${product.name} est déjà dans la liste`);
   return;
 }
 shopping[product.name]=true;
 delete bought[product.name];
 save();
 render();
 visualPress(document.activeElement,"added");
 vibrate(28);
 showActionMessage(`${product.name} ajouté à la liste`);
};

// Historique : empêche aussi les doublons.
window.addHistoryProduct=function(name){
 const product=productByName(name)||ensureProduct(name);
 if(shopping[product.name]){
   visualPress(document.activeElement,"already");
   vibrate([18,35,18]);
   showActionMessage(`${product.name} est déjà dans la liste`);
   return;
 }
 shopping[product.name]=true;
 save();
 render();
 visualPress(document.activeElement,"added");
 vibrate(28);
 showActionMessage(`${product.name} ajouté à la liste`);
};

// Recettes : ajoute seulement les ingrédients absents et annonce le résultat.
window.addRecipe=function(id){
 const recipe=recipes.find(r=>r.id===id);
 if(!recipe)return;
 let added=0;
 recipe.ingredients.forEach(name=>{
   const product=productByName(name)||ensureProduct(name);
   if(!shopping[product.name]){
     shopping[product.name]=true;
     delete bought[product.name];
     added++;
   }
 });
 if(!added){
   visualPress(document.activeElement,"already");
   vibrate([18,35,18]);
   showActionMessage("Tous les ingrédients sont déjà dans la liste");
   return;
 }
 save();
 render();
 switchView("shopping");
 visualPress(document.activeElement,"added");
 vibrate(32);
 showActionMessage(`${added} ingrédient${added>1?"s":""} ajouté${added>1?"s":""}`);
};

// Swipe gauche → droite n’importe où sur mobile pour ouvrir le menu.
let bzSwipeStartX=0;
let bzSwipeStartY=0;
let bzSwipeTracking=false;

document.addEventListener("touchstart",event=>{
 if(window.innerWidth>850||event.touches.length!==1)return;
 const touch=event.touches[0];
 bzSwipeStartX=touch.clientX;
 bzSwipeStartY=touch.clientY;
 bzSwipeTracking=true;
},{passive:true});

document.addEventListener("touchmove",event=>{
 if(!bzSwipeTracking||window.innerWidth>850)return;
 const touch=event.touches[0];
 const dx=touch.clientX-bzSwipeStartX;
 const dy=Math.abs(touch.clientY-bzSwipeStartY);
 if(dy>70)bzSwipeTracking=false;
 if(false&&dx>90&&dy<55){
   document.body.classList.add("mobile-drawer-open");
   vibrate(20);
   bzSwipeTracking=false;
 }
},{passive:true});

document.addEventListener("touchend",()=>{bzSwipeTracking=false},{passive:true});


// ===== V4.3.5 =====
let groupCheckedItems=localStorage.getItem("bz_group_checked")==="1";

function applyCheckedGrouping(groups){
 if(!groupCheckedItems)return groups;

 const checkedItems=[];
 const cleanGroups={};

 Object.entries(groups).forEach(([groupName,items])=>{
   const unchecked=items.filter(name=>{
     if(bought[name]){
       checkedItems.push(name);
       return false;
     }
     return true;
   });
   if(unchecked.length)cleanGroups[groupName]=unchecked;
 });

 if(checkedItems.length){
   return {
     "Dans le panier":[...checkedItems].sort((a,b)=>a.localeCompare(b,"fr")),
     ...cleanGroups
   };
 }
 return cleanGroups;
}

const v435OldShoppingGroups=shoppingGroups;
shoppingGroups=function(names){
 const groups=v435OldShoppingGroups(names);
 return applyCheckedGrouping(groups);
};

$("#groupCheckedToggle").checked=groupCheckedItems;
$("#groupCheckedToggle").onchange=e=>{
 groupCheckedItems=e.target.checked;
 localStorage.setItem("bz_group_checked",groupCheckedItems?"1":"0");
 renderShopping();
};

// Confirmation avant suppression des produits cochés.
$("#clearBoughtBtn").onclick=()=>{
 const checked=Object.keys(bought).filter(name=>bought[name]&&shopping[name]);
 if(!checked.length){
   showActionMessage("Aucun produit coché");
   return;
 }
 if(!confirm(`Êtes-vous sûr de vouloir retirer ${checked.length} produit${checked.length>1?"s":""} coché${checked.length>1?"s":""} ?`))return;
 checked.forEach(name=>{
   delete shopping[name];
   delete bought[name];
 });
 save();
 render();
 showActionMessage("Produits cochés retirés");
};

// Ajoute une classe au groupe spécial du panier.
const v435OldRenderShopping=renderShopping;
renderShopping=function(){
 v435OldRenderShopping();
 document.querySelectorAll(".shopping-group").forEach(section=>{
   const title=section.querySelector("h3")?.textContent?.trim();
   section.classList.toggle("cart-group",title==="Dans le panier");
 });
};

// Swipe mobile plus sensible + fermeture droite vers gauche.
let v435StartX=0;
let v435StartY=0;
let v435Tracking=false;

document.addEventListener("touchstart",event=>{
 if(window.innerWidth>850||event.touches.length!==1)return;
 const touch=event.touches[0];
 v435StartX=touch.clientX;
 v435StartY=touch.clientY;
 v435Tracking=true;
},{passive:true});

document.addEventListener("touchmove",event=>{
 if(!v435Tracking||window.innerWidth>850)return;

 const touch=event.touches[0];
 const dx=touch.clientX-v435StartX;
 const dy=Math.abs(touch.clientY-v435StartY);
 const menuOpen=document.body.classList.contains("mobile-drawer-open");

 if(dy>65){
   v435Tracking=false;
   return;
 }

 if(!menuOpen && dx>55 && dy<48){
   document.body.classList.add("mobile-drawer-open");
   vibrate(18);
   v435Tracking=false;
 }

 if(menuOpen && dx<-45 && dy<48){
   document.body.classList.remove("mobile-drawer-open");
   vibrate(12);
   v435Tracking=false;
 }
},{passive:true});

document.addEventListener("touchend",()=>{v435Tracking=false},{passive:true});

renderShopping();


// ===== V4.3.7 PRIX OPTIONNEL =====
function normalizeCourseAmount(rawValue){
 const text=String(rawValue??"").trim().replace(",",".");
 if(!text)return null;
 const value=Number(text);
 return Number.isFinite(value)&&value>0?value:null;
}

$("#finishForm").onsubmit=e=>{
 e.preventDefault();
 const names=Object.keys(shopping).filter(name=>bought[name]);
 if(!names.length){
   $("#finishDialog").close();
   showActionMessage("Aucun produit coché");
   return;
 }

 const amount=normalizeCourseAmount($("#finishAmount").value);

 history.unshift({
   id:Date.now(),
   date:new Date().toISOString(),
   products:names,
   amount
 });

 const boughtSet=new Set(names.map(productKey));
 products.forEach(product=>{
   streaks[product.name]=boughtSet.has(productKey(product.name))
     ?(streaks[product.name]||0)+1
     :0;
   if(options.autoFavorites&&streaks[product.name]>=3)product.favorite=true;
 });

 shopping={};
 bought={};
 save();
 $("#finishDialog").close();
 launchConfetti();
 render();
};

renderStats=function(){
 const counts=productStats();
 const totalProducts=Object.values(counts).reduce((a,b)=>a+b,0);
 const top=Object.entries(counts).sort((a,b)=>b[1]-a[1]);

 const pricedHistory=history.filter(h=>Number(h.amount)>0);
 const totalSpent=pricedHistory.reduce((sum,h)=>sum+Number(h.amount),0);
 const avg=pricedHistory.length?totalSpent/pricedHistory.length:0;

 $("#statCards").innerHTML=`
  <article class="stat-card"><strong>${history.length}</strong><small>courses terminées</small></article>
  <article class="stat-card"><strong>${totalProducts}</strong><small>produits achetés</small></article>
  <article class="stat-card"><strong>${totalSpent.toFixed(2)} €</strong><small>dépensés au total</small></article>
  <article class="stat-card"><strong>${avg.toFixed(2)} €</strong><small>panier moyen (${pricedHistory.length} renseigné${pricedHistory.length>1?"s":""})</small></article>`;

 $("#topProducts").innerHTML=top.slice(0,10).map(([name,count])=>`
  <div class="bar-row">
   <span>${esc(name)}</span>
   <div class="bar-track"><div class="bar-fill" style="width:${top[0]?count/top[0][1]*100:0}%"></div></div>
   <b>${count}</b>
  </div>`).join("")||'<div class="empty">Pas encore de données</div>';

 const year=new Date().getFullYear();
 const trips=Array(12).fill(0);
 const expenses=Array(12).fill(0);

 history.forEach(course=>{
   const date=new Date(course.date);
   if(date.getFullYear()!==year)return;
   trips[date.getMonth()]++;
   if(Number(course.amount)>0)expenses[date.getMonth()]+=Number(course.amount);
 });

 renderMonthBars("#monthlyBars",trips,value=>String(value));
 renderMonthBars("#expenseBars",expenses,value=>value?`${value.toFixed(0)} €`:"—");
};

renderHistory=function(){
 $("#historyList").innerHTML=history.length?history.map(course=>{
   const amountLabel=Number(course.amount)>0
     ?`${Number(course.amount).toFixed(2)} €`
     :"Prix non renseigné";
   return `<article class="history-card">
     <div class="history-head" onclick="this.parentElement.classList.toggle('open')">
       <div>
         <strong>${new Date(course.date).toLocaleDateString("fr-BE",{dateStyle:"long"})}</strong>
         <small> · ${course.products.length} produits · ${amountLabel}</small>
       </div>
       <span>▾</span>
     </div>
     <div class="history-products">
       ${course.products.map(name=>`<button class="history-product" onclick="event.stopPropagation();addHistoryProduct('${jsesc(name)}')">+ ${esc(name)}</button>`).join("")}
     </div>
   </article>`;
 }).join(""):'<div class="empty">Aucune course enregistrée</div>';
};


// ===== V4.3.10 =====
function bzVibrate(pattern=14){
 if(navigator.vibrate)navigator.vibrate(pattern);
}
function bzFeedback(element,type="success"){
 if(!element)return;
 element.classList.remove("bz-success","bz-already","bz-pressing","added-feedback","already-feedback","press-flash");
 void element.offsetWidth;
 element.classList.add(type==="already"?"bz-already":"bz-success");
 setTimeout(()=>element.classList.remove("bz-success","bz-already"),520);
}
document.addEventListener("pointerdown",event=>{
 const target=event.target.closest("button,.ghost,.primary,.text-button,.palette-block,.store-cell,.ingredient-choice,.history-product,.season-card,.store-card");
 if(!target)return;
 target.classList.add("bz-pressing");
 bzVibrate(10);
},true);
["pointerup","pointercancel","pointerleave"].forEach(type=>{
 document.addEventListener(type,event=>{
   const target=event.target?.closest?.("button,.ghost,.primary,.text-button,.palette-block,.store-cell,.ingredient-choice,.history-product,.season-card,.store-card");
   if(target)target.classList.remove("bz-pressing");
 },true);
});

window.addSeasonal=function(name){
 const source=document.activeElement;
 const product=productByName(name)||ensureProduct(name);
 if(shopping[product.name]){
   bzFeedback(source,"already");
   bzVibrate([18,30,18]);
   showActionMessage(`${product.name} est déjà dans la liste`);
   return;
 }
 shopping[product.name]=true;
 delete bought[product.name];
 save();
 render();
 bzFeedback(source,"success");
 bzVibrate(26);
 showActionMessage(`${product.name} ajouté à la liste`);
};

function wireProductRowsV4310(){
 document.querySelectorAll("#productsGrid .item").forEach(row=>{
   const checkbox=row.querySelector('input[type="checkbox"]');
   const name=row.querySelector(".item-name");
   if(!checkbox||!name)return;
   row.onclick=event=>{
     if(event.target.closest("button,.star,.edit-btn")||event.target===checkbox)return;
     checkbox.checked=!checkbox.checked;
     checkbox.dispatchEvent(new Event("change",{bubbles:true}));
     bzVibrate(14);
   };
 });
}
function wireShoppingRowsV4310(){
 document.querySelectorAll("#shoppingList .shopping-row").forEach(row=>{
   const checkbox=row.querySelector('input[type="checkbox"]');
   if(!checkbox)return;
   row.onclick=event=>{
     if(event.target.closest(".remove-item-btn")||event.target===checkbox)return;
     checkbox.checked=!checkbox.checked;
     checkbox.dispatchEvent(new Event("change",{bubbles:true}));
     bzVibrate(14);
   };
 });
}
const bzOldRenderProductsV4310=renderProducts;
renderProducts=function(){
 bzOldRenderProductsV4310();
 wireProductRowsV4310();
};
const bzOldRenderShoppingV4310=renderShopping;
renderShopping=function(){
 bzOldRenderShoppingV4310();
 wireShoppingRowsV4310();
};

renderSuggestions=function(){
 const panel=$("#suggestionsPanel");
 if(!panel)return;
 if(!options.suggestions){panel.innerHTML="";return}
 const selectedKeys=new Set(Object.keys(shopping).map(productKey));
 const candidates=recipes.map(recipe=>{
   const have=recipe.ingredients.filter(item=>selectedKeys.has(productKey(item)));
   const missing=recipe.ingredients.filter(item=>!selectedKeys.has(productKey(item)));
   return {recipe,have,missing};
 }).filter(item=>item.missing.length>=1&&item.missing.length<=2&&item.have.length>=1).slice(0,3);
 panel.innerHTML=candidates.map(item=>`<div class="suggestion">
   <span>Pour <strong>${esc(item.recipe.name)}</strong>, il manque ${item.missing.map(name=>esc(productByName(name)?.name||name)).join(", ")}</span>
   <button class="ghost" onclick="addMissing(${item.recipe.id})">Ajouter</button>
 </div>`).join("");
};

let bzPinchStartDistance=0;
let bzPinchStartDensity=1;
let bzPinchTarget=null;
let productsPinchDensity=Number(localStorage.getItem("bz_products_pinch_density")||1);
let shoppingPinchDensity=Number(localStorage.getItem("bz_shopping_pinch_density")||1);

function applyPinchDensityV4310(){
 productsPinchDensity=Math.max(.72,Math.min(1.35,productsPinchDensity));
 shoppingPinchDensity=Math.max(.72,Math.min(1.35,shoppingPinchDensity));
 document.body.style.setProperty("--products-pinch-density",productsPinchDensity.toFixed(2));
 document.body.style.setProperty("--shopping-pinch-density",shoppingPinchDensity.toFixed(2));
}
function pinchDistanceV4310(touches){
 const dx=touches[0].clientX-touches[1].clientX;
 const dy=touches[0].clientY-touches[1].clientY;
 return Math.hypot(dx,dy);
}
function showPinchDensityV4310(value){
 let toast=document.querySelector(".pinch-density-toast");
 if(!toast){
   toast=document.createElement("div");
   toast.className="pinch-density-toast";
   document.body.appendChild(toast);
 }
 toast.textContent=`Taille ${Math.round(value*100)} %`;
 toast.classList.add("show");
 clearTimeout(window.__bzPinchToast);
 window.__bzPinchToast=setTimeout(()=>toast.classList.remove("show"),700);
}
applyPinchDensityV4310();

document.addEventListener("touchstart",event=>{
 if(event.touches.length!==2)return;
 if(currentView!=="products"&&currentView!=="shopping")return;
 bzPinchTarget=currentView;
 bzPinchStartDistance=pinchDistanceV4310(event.touches);
 bzPinchStartDensity=currentView==="products"?productsPinchDensity:shoppingPinchDensity;
},{passive:true});
document.addEventListener("touchmove",event=>{
 if(event.touches.length!==2||!bzPinchTarget||!bzPinchStartDistance)return;
 const ratio=pinchDistanceV4310(event.touches)/bzPinchStartDistance;
 const next=Math.max(.72,Math.min(1.35,bzPinchStartDensity*ratio));
 if(bzPinchTarget==="products"){
   productsPinchDensity=next;
   localStorage.setItem("bz_products_pinch_density",String(next));
 }else{
   shoppingPinchDensity=next;
   localStorage.setItem("bz_shopping_pinch_density",String(next));
 }
 applyPinchDensityV4310();
 showPinchDensityV4310(next);
 event.preventDefault();
},{passive:false});
document.addEventListener("touchend",event=>{
 if(event.touches.length<2){
   bzPinchTarget=null;
   bzPinchStartDistance=0;
 }
},{passive:true});

const bzOldRenderSidebarV4310=renderSidebar;
renderSidebar=function(){
 bzOldRenderSidebarV4310();
 const tips=[
  "Pince avec deux doigts dans Produits ou Ma liste pour réduire ou agrandir les lignes",
  "Trie ta liste par magasin pour suivre l’ordre des rayons",
  "Les produits cochés peuvent être regroupés dans Dans le panier",
  "Une recette ajoute tous ses ingrédients en un clic"
 ];
 const day=Math.floor(Date.now()/86400000);
 if($("#dailyTip"))$("#dailyTip").textContent=tips[day%tips.length];
};
render();


// ===== V4.4 : 100 recettes, recette inversée et stock =====
const V44_RECIPES=[{"id": 440000, "name": "Lasagnes bolognaises", "category": "Plat", "ingredients": ["Feuilles de lasagne", "Viande hachée", "Tomate", "Oignons", "Ail", "Carotte", "Béchamel", "Parmesan"], "instructions": "Préparer la sauce bolognaise, monter les couches avec la béchamel et cuire 40 minutes au four."}, {"id": 440001, "name": "Hachis parmentier", "category": "Plat", "ingredients": ["Viande hachée", "Pommes de terre", "Oignons", "Beurre", "Lait", "Fromage râpé"], "instructions": "Préparer une purée, cuire la viande avec les oignons, monter le plat et gratiner."}, {"id": 440002, "name": "Gratin dauphinois", "category": "Plat", "ingredients": ["Pommes de terre", "Crème fraîche", "Lait", "Ail", "Muscade", "Gruyère"], "instructions": "Trancher les pommes de terre, couvrir de crème assaisonnée et cuire doucement au four."}, {"id": 440003, "name": "Tartiflette", "category": "Plat", "ingredients": ["Pommes de terre", "Reblochon", "Lardons", "Oignons", "Crème fraîche", "Vin blanc"], "instructions": "Cuire les pommes de terre, ajouter lardons et oignons puis gratiner avec le reblochon."}, {"id": 440004, "name": "Quiche lorraine", "category": "Plat", "ingredients": ["Pâte brisée", "Oeuf", "Crème fraîche", "Lardons", "Gruyère"], "instructions": "Garnir la pâte avec lardons, oeufs et crème puis cuire environ 35 minutes."}, {"id": 440005, "name": "Quiche poireaux saumon", "category": "Plat", "ingredients": ["Pâte brisée", "Poireaux", "Saumon", "Oeuf", "Crème fraîche", "Aneth"], "instructions": "Faire fondre les poireaux, ajouter saumon et appareil puis cuire au four."}, {"id": 440006, "name": "Risotto champignons", "category": "Plat", "ingredients": ["Riz arborio", "Champignons", "Oignons", "Bouillon", "Parmesan", "Vin blanc"], "instructions": "Ajouter le bouillon progressivement au riz puis terminer avec champignons et parmesan."}, {"id": 440007, "name": "Risotto courgette chèvre", "category": "Plat", "ingredients": ["Riz arborio", "Courgette", "Chèvre", "Oignons", "Bouillon", "Vin blanc"], "instructions": "Cuire le risotto au bouillon et ajouter courgette poêlée et chèvre en fin de cuisson."}, {"id": 440008, "name": "Paella rapide", "category": "Plat", "ingredients": ["Riz", "Poulet", "Chorizo", "Poivrons", "Petits pois", "Tomate", "Paprika", "Bouillon"], "instructions": "Faire revenir les garnitures, ajouter riz et bouillon puis cuire sans trop remuer."}, {"id": 440009, "name": "Poulet basquaise", "category": "Plat", "ingredients": ["Poulet", "Poivrons", "Tomate", "Oignons", "Ail", "Piment d'Espelette"], "instructions": "Dorer le poulet puis le laisser mijoter avec poivrons, tomate et épices."}, {"id": 440010, "name": "Boeuf bourguignon", "category": "Plat", "ingredients": ["Boeuf", "Carotte", "Oignons", "Champignons", "Vin rouge", "Bouillon", "Laurier"], "instructions": "Faire revenir la viande puis mijoter longuement avec vin, légumes et aromates."}, {"id": 440011, "name": "Blanquette de veau", "category": "Plat", "ingredients": ["Veau", "Carotte", "Poireaux", "Champignons", "Crème fraîche", "Bouillon", "Citron"], "instructions": "Cuire doucement la viande et les légumes puis lier la sauce avec crème et citron."}, {"id": 440012, "name": "Carbonnade flamande", "category": "Plat", "ingredients": ["Boeuf", "Bière brune", "Oignons", "Pain d'épices", "Moutarde", "Cassonade"], "instructions": "Mijoter le boeuf avec bière et oignons, puis épaissir avec pain d'épices moutardé."}, {"id": 440013, "name": "Boulettes sauce tomate", "category": "Plat", "ingredients": ["Boulettes", "Tomate", "Oignons", "Ail", "Basilic", "Pâtes"], "instructions": "Dorer les boulettes, les mijoter dans la sauce tomate puis servir avec les pâtes."}, {"id": 440014, "name": "Boulettes sauce crème", "category": "Plat", "ingredients": ["Boulettes", "Crème fraîche", "Champignons", "Oignons", "Moutarde", "Riz"], "instructions": "Cuire les boulettes et préparer une sauce crème champignons légèrement moutardée."}, {"id": 440015, "name": "Steak sauce poivre", "category": "Plat", "ingredients": ["Steak", "Crème fraîche", "Poivre vert", "Échalotes", "Pommes de terre"], "instructions": "Cuire le steak, déglacer avec échalotes et crème puis servir avec les pommes de terre."}, {"id": 440016, "name": "Poulet moutarde", "category": "Plat", "ingredients": ["Poulet", "Moutarde", "Crème fraîche", "Oignons", "Thym", "Riz"], "instructions": "Dorer le poulet, ajouter moutarde et crème puis mijoter doucement."}, {"id": 440017, "name": "Poulet citron thym", "category": "Plat", "ingredients": ["Poulet", "Citron", "Thym", "Ail", "Huile d'olive", "Pommes de terre"], "instructions": "Mariner le poulet puis cuire au four avec citron, ail et pommes de terre."}, {"id": 440018, "name": "Poulet teriyaki", "category": "Plat", "ingredients": ["Poulet", "Sauce soja", "Miel", "Gingembre", "Ail", "Riz", "Sésame"], "instructions": "Caraméliser le poulet dans la sauce soja, miel, ail et gingembre."}, {"id": 440019, "name": "Poulet tikka masala", "category": "Plat", "ingredients": ["Poulet", "Yaourt nature", "Tomate", "Crème fraîche", "Garam masala", "Riz"], "instructions": "Mariner le poulet au yaourt et aux épices puis mijoter dans une sauce tomate crémeuse."}, {"id": 440020, "name": "Butter chicken", "category": "Plat", "ingredients": ["Poulet", "Beurre", "Tomate", "Crème fraîche", "Garam masala", "Riz"], "instructions": "Cuire le poulet épicé puis le mijoter dans une sauce tomate au beurre et à la crème."}, {"id": 440021, "name": "Dahl de lentilles corail", "category": "Plat", "ingredients": ["Lentilles corail", "Lait de coco", "Tomate", "Oignons", "Curry", "Riz"], "instructions": "Cuire les lentilles avec tomate, curry et lait de coco jusqu’à texture fondante."}, {"id": 440022, "name": "Curry de pois chiches", "category": "Plat", "ingredients": ["Pois chiches", "Lait de coco", "Tomate", "Épinards", "Curry", "Riz"], "instructions": "Mijoter pois chiches et épinards dans une sauce curry coco."}, {"id": 440023, "name": "Curry de légumes", "category": "Plat", "ingredients": ["Courgette", "Carotte", "Poivrons", "Pois chiches", "Lait de coco", "Curry", "Riz"], "instructions": "Faire revenir les légumes puis les cuire dans le lait de coco épicé."}, {"id": 440024, "name": "Chakchouka", "category": "Plat", "ingredients": ["Oeuf", "Tomate", "Poivrons", "Oignons", "Ail", "Cumin"], "instructions": "Mijoter la sauce tomate-poivron puis cuire les oeufs directement dedans."}, {"id": 440025, "name": "Omelette champignons", "category": "Plat", "ingredients": ["Oeuf", "Champignons", "Oignons", "Gruyère", "Beurre"], "instructions": "Poêler champignons et oignons, verser les oeufs battus puis ajouter le fromage."}, {"id": 440026, "name": "Omelette pommes de terre", "category": "Plat", "ingredients": ["Oeuf", "Pommes de terre", "Oignons", "Huile d'olive"], "instructions": "Cuire pommes de terre et oignons puis ajouter les oeufs battus."}, {"id": 440027, "name": "Croque-monsieur", "category": "Plat", "ingredients": ["Pain de mie", "Jambon", "Gruyère", "Béchamel", "Beurre"], "instructions": "Monter les croques, ajouter béchamel et fromage puis gratiner."}, {"id": 440028, "name": "Croque chèvre tomate", "category": "Plat", "ingredients": ["Pain de mie", "Chèvre", "Tomate", "Miel", "Basilic"], "instructions": "Garnir le pain de chèvre, tomate, miel et basilic puis toaster."}, {"id": 440029, "name": "Club sandwich poulet", "category": "Plat", "ingredients": ["Pain de mie", "Poulet", "Bacon", "Tomate", "Iceberg", "Mayonnaise"], "instructions": "Monter plusieurs étages de pain avec poulet, bacon, crudités et mayonnaise."}, {"id": 440030, "name": "Pita falafel", "category": "Plat", "ingredients": ["Pain pita", "Falafels", "Tomate", "Concombre", "Yaourt nature", "Ail"], "instructions": "Réchauffer les falafels et garnir les pains avec crudités et sauce yaourt."}, {"id": 440031, "name": "Kebab maison", "category": "Plat", "ingredients": ["Pain pita", "Poulet", "Oignons", "Tomate", "Iceberg", "Yaourt nature", "Paprika"], "instructions": "Cuire le poulet épicé puis garnir le pain avec légumes et sauce yaourt."}, {"id": 440032, "name": "Tacos poulet", "category": "Plat", "ingredients": ["Tortillas", "Poulet", "Poivrons", "Oignons", "Cheddar", "Sauce salsa"], "instructions": "Cuire la garniture puis remplir les tortillas avec cheddar et salsa."}, {"id": 440033, "name": "Tacos poisson", "category": "Plat", "ingredients": ["Tortillas", "Poisson blanc", "Chou rouge", "Avocat", "Citron vert", "Yaourt nature"], "instructions": "Cuire le poisson, préparer les crudités puis garnir les tortillas."}, {"id": 440034, "name": "Burrito boeuf", "category": "Plat", "ingredients": ["Tortillas", "Viande hachée", "Riz", "Haricots rouges", "Cheddar", "Tomate"], "instructions": "Garnir les tortillas avec viande épicée, riz, haricots et cheddar."}, {"id": 440035, "name": "Quesadillas fromage", "category": "Plat", "ingredients": ["Tortillas", "Cheddar", "Mozzarella", "Poivrons", "Oignons"], "instructions": "Garnir une tortilla, refermer et dorer des deux côtés à la poêle."}, {"id": 440036, "name": "Nouilles sautées poulet", "category": "Plat", "ingredients": ["Nouilles", "Poulet", "Carotte", "Poivrons", "Sauce soja", "Gingembre"], "instructions": "Sauter rapidement poulet et légumes puis ajouter nouilles et sauce soja."}, {"id": 440037, "name": "Nouilles sautées légumes", "category": "Plat", "ingredients": ["Nouilles", "Carotte", "Courgette", "Champignons", "Sauce soja", "Sésame"], "instructions": "Sauter les légumes à feu vif puis mélanger avec nouilles et sauce."}, {"id": 440038, "name": "Riz cantonais", "category": "Plat", "ingredients": ["Riz", "Oeuf", "Petits pois", "Jambon", "Oignons", "Sauce soja"], "instructions": "Faire sauter le riz froid avec oeufs, petits pois, jambon et sauce soja."}, {"id": 440039, "name": "Bibimbap simplifié", "category": "Plat", "ingredients": ["Riz", "Viande hachée", "Carotte", "Courgette", "Épinards", "Oeuf", "Sauce soja"], "instructions": "Préparer chaque garniture puis les disposer sur le riz avec un oeuf."}, {"id": 440040, "name": "Saumon miel soja", "category": "Plat", "ingredients": ["Saumon", "Sauce soja", "Miel", "Gingembre", "Riz", "Brocoli"], "instructions": "Laquer le saumon avec soja et miel puis cuire au four."}, {"id": 440041, "name": "Saumon crème épinards", "category": "Plat", "ingredients": ["Saumon", "Épinards", "Crème fraîche", "Ail", "Pâtes"], "instructions": "Cuire saumon et épinards dans la crème puis servir avec les pâtes."}, {"id": 440042, "name": "Cabillaud tomate olive", "category": "Plat", "ingredients": ["Cabillaud", "Tomate", "Olives noires", "Ail", "Citron", "Riz"], "instructions": "Cuire le poisson au four sur un lit de tomate, olives et ail."}, {"id": 440043, "name": "Poisson pané maison", "category": "Plat", "ingredients": ["Poisson blanc", "Farine", "Oeuf", "Chapelure", "Citron", "Pommes de terre"], "instructions": "Paner le poisson puis le cuire à la poêle ou au four."}, {"id": 440044, "name": "Gratin de poisson", "category": "Plat", "ingredients": ["Poisson blanc", "Pommes de terre", "Poireaux", "Crème fraîche", "Fromage râpé"], "instructions": "Monter le gratin avec poisson, légumes et crème puis gratiner."}, {"id": 440045, "name": "Pâtes pesto poulet", "category": "Plat", "ingredients": ["Pâtes", "Poulet", "Pesto", "Tomate cerise", "Parmesan"], "instructions": "Cuire le poulet et mélanger avec pâtes, pesto, tomates et parmesan."}, {"id": 440046, "name": "Pâtes quatre fromages", "category": "Plat", "ingredients": ["Pâtes", "Gorgonzola", "Parmesan", "Mozzarella", "Crème fraîche"], "instructions": "Faire fondre les fromages dans la crème puis mélanger aux pâtes."}, {"id": 440047, "name": "Pâtes arrabbiata", "category": "Plat", "ingredients": ["Pâtes", "Tomate", "Ail", "Piment", "Basilic", "Parmesan"], "instructions": "Préparer une sauce tomate relevée puis mélanger avec les pâtes."}, {"id": 440048, "name": "Pâtes poulet champignons", "category": "Plat", "ingredients": ["Pâtes", "Poulet", "Champignons", "Crème fraîche", "Oignons", "Parmesan"], "instructions": "Faire revenir poulet et champignons, ajouter crème puis mélanger aux pâtes."}, {"id": 440049, "name": "Gnocchis tomate mozzarella", "category": "Plat", "ingredients": ["Gnocchis", "Tomate", "Mozzarella", "Basilic", "Parmesan"], "instructions": "Mélanger les gnocchis à la sauce tomate et gratiner avec mozzarella."}, {"id": 440050, "name": "Gnocchis crème champignons", "category": "Plat", "ingredients": ["Gnocchis", "Champignons", "Crème fraîche", "Ail", "Parmesan"], "instructions": "Poêler les gnocchis puis ajouter sauce crème champignons."}, {"id": 440051, "name": "Ratatouille", "category": "Plat", "ingredients": ["Aubergine", "Courgette", "Poivrons", "Tomate", "Oignons", "Ail", "Thym"], "instructions": "Faire mijoter doucement tous les légumes avec ail et thym."}, {"id": 440052, "name": "Gratin de courgettes", "category": "Plat", "ingredients": ["Courgette", "Crème fraîche", "Oeuf", "Gruyère", "Ail"], "instructions": "Mélanger les courgettes précuites à l’appareil puis gratiner."}, {"id": 440053, "name": "Aubergines parmigiana", "category": "Plat", "ingredients": ["Aubergine", "Tomate", "Mozzarella", "Parmesan", "Basilic"], "instructions": "Alterner aubergines, sauce tomate et fromages puis gratiner."}, {"id": 440054, "name": "Poivrons farcis", "category": "Plat", "ingredients": ["Poivrons", "Viande hachée", "Riz", "Tomate", "Oignons", "Fromage râpé"], "instructions": "Farcir les poivrons avec viande et riz puis cuire au four."}, {"id": 440055, "name": "Tomates farcies", "category": "Plat", "ingredients": ["Tomate", "Viande hachée", "Oignons", "Ail", "Riz", "Herbes de Provence"], "instructions": "Farcir les tomates, cuire au four et servir avec du riz."}, {"id": 440056, "name": "Courgettes farcies", "category": "Plat", "ingredients": ["Courgette", "Viande hachée", "Tomate", "Oignons", "Fromage râpé"], "instructions": "Creuser les courgettes, garnir de farce puis gratiner."}, {"id": 440057, "name": "Salade César", "category": "Plat", "ingredients": ["Poulet", "Iceberg", "Parmesan", "Croûtons", "Sauce César"], "instructions": "Cuire le poulet puis mélanger avec salade, croûtons, parmesan et sauce."}, {"id": 440058, "name": "Salade grecque", "category": "Plat", "ingredients": ["Tomate", "Concombre", "Feta", "Olives noires", "Oignons rouges", "Huile d'olive"], "instructions": "Couper les ingrédients puis assaisonner avec huile et herbes."}, {"id": 440059, "name": "Salade de pâtes méditerranéenne", "category": "Plat", "ingredients": ["Pâtes", "Tomate cerise", "Feta", "Concombre", "Olives noires", "Pesto"], "instructions": "Mélanger les pâtes froides avec légumes, feta, olives et pesto."}, {"id": 440060, "name": "Tarte aux pommes", "category": "Pâtisserie", "ingredients": ["Pâte feuilletée", "Pommes", "Sucre", "Beurre", "Cannelle"], "instructions": "Garnir la pâte de pommes, sucre et beurre puis cuire jusqu’à coloration."}, {"id": 440061, "name": "Tarte au citron meringuée", "category": "Pâtisserie", "ingredients": ["Pâte sablée", "Citron", "Oeuf", "Sucre", "Beurre", "Maïzena"], "instructions": "Cuire le fond, ajouter la crème citron puis la meringue et colorer."}, {"id": 440062, "name": "Tarte aux poires amandine", "category": "Pâtisserie", "ingredients": ["Pâte sablée", "Poires", "Poudre d'amande", "Beurre", "Sucre", "Oeuf"], "instructions": "Garnir la pâte de crème d’amande et de poires puis cuire."}, {"id": 440063, "name": "Flan pâtissier", "category": "Pâtisserie", "ingredients": ["Pâte brisée", "Lait", "Oeuf", "Sucre", "Maïzena", "Vanille"], "instructions": "Préparer la crème, verser sur la pâte puis cuire jusqu’à belle coloration."}, {"id": 440064, "name": "Paris-Brest", "category": "Pâtisserie", "ingredients": ["Pâte à choux", "Praliné", "Crème pâtissière", "Beurre", "Amandes effilées"], "instructions": "Cuire une couronne de pâte à choux et la garnir de crème pralinée."}, {"id": 440065, "name": "Éclairs au chocolat", "category": "Pâtisserie", "ingredients": ["Pâte à choux", "Chocolat", "Lait", "Oeuf", "Sucre", "Maïzena"], "instructions": "Cuire les éclairs, garnir de crème chocolat puis glacer."}, {"id": 440066, "name": "Mille-feuille", "category": "Pâtisserie", "ingredients": ["Pâte feuilletée", "Lait", "Oeuf", "Sucre", "Maïzena", "Vanille"], "instructions": "Cuire les couches de pâte et les monter avec la crème pâtissière."}, {"id": 440067, "name": "Saint-Honoré simplifié", "category": "Pâtisserie", "ingredients": ["Pâte feuilletée", "Pâte à choux", "Crème chantilly", "Caramel"], "instructions": "Monter choux caramélisés et chantilly sur une base feuilletée."}, {"id": 440068, "name": "Fraisier", "category": "Pâtisserie", "ingredients": ["Génoise", "Fraises", "Crème pâtissière", "Beurre", "Sucre"], "instructions": "Monter génoise, fraises et crème puis laisser prendre au frais."}, {"id": 440069, "name": "Opéra au café", "category": "Pâtisserie", "ingredients": ["Poudre d'amande", "Oeuf", "Chocolat", "Café", "Beurre", "Sucre"], "instructions": "Superposer biscuit amande, ganache chocolat et crème café."}, {"id": 440070, "name": "Forêt-noire", "category": "Pâtisserie", "ingredients": ["Génoise chocolat", "Cerises", "Crème chantilly", "Chocolat"], "instructions": "Monter les couches de génoise avec cerises et chantilly."}, {"id": 440071, "name": "Tarte tropézienne", "category": "Pâtisserie", "ingredients": ["Brioche", "Crème pâtissière", "Crème fraîche", "Sucre perlé"], "instructions": "Cuire la brioche puis la garnir de crème légère."}, {"id": 440072, "name": "Choux à la crème", "category": "Pâtisserie", "ingredients": ["Pâte à choux", "Lait", "Oeuf", "Sucre", "Maïzena", "Vanille"], "instructions": "Cuire les choux puis les garnir de crème pâtissière."}, {"id": 440073, "name": "Financiers", "category": "Pâtisserie", "ingredients": ["Poudre d'amande", "Beurre", "Sucre glace", "Blanc d'oeuf", "Farine"], "instructions": "Mélanger les ingrédients avec beurre noisette puis cuire en petits moules."}, {"id": 440074, "name": "Madeleines", "category": "Pâtisserie", "ingredients": ["Farine", "Oeuf", "Sucre", "Beurre", "Levure chimique", "Citron"], "instructions": "Préparer la pâte, la refroidir puis cuire très chaud pour former la bosse."}, {"id": 440075, "name": "Crème brûlée", "category": "Dessert", "ingredients": ["Crème fraîche", "Jaune d'oeuf", "Sucre", "Vanille", "Cassonade"], "instructions": "Cuire les crèmes au bain-marie puis caraméliser la cassonade."}, {"id": 440076, "name": "Panna cotta vanille", "category": "Dessert", "ingredients": ["Crème fraîche", "Sucre", "Vanille", "Gélatine", "Coulis de fruits rouges"], "instructions": "Chauffer la crème, ajouter la gélatine puis laisser prendre au frais."}, {"id": 440077, "name": "Tiramisu", "category": "Dessert", "ingredients": ["Mascarpone", "Oeuf", "Sucre", "Café", "Biscuits cuillère", "Cacao"], "instructions": "Monter la crème mascarpone et alterner avec biscuits imbibés de café."}, {"id": 440078, "name": "Riz au lait", "category": "Dessert", "ingredients": ["Riz rond", "Lait", "Sucre", "Vanille"], "instructions": "Cuire doucement le riz dans le lait sucré jusqu’à texture crémeuse."}, {"id": 440079, "name": "Île flottante", "category": "Dessert", "ingredients": ["Oeuf", "Lait", "Sucre", "Vanille", "Caramel"], "instructions": "Préparer une crème anglaise et pocher les blancs montés."}, {"id": 440080, "name": "Compote pomme cannelle", "category": "Dessert", "ingredients": ["Pommes", "Cannelle", "Sucre", "Citron"], "instructions": "Cuire les pommes à couvert puis mixer ou écraser."}, {"id": 440081, "name": "Salade de fruits", "category": "Dessert", "ingredients": ["Pommes", "Bananes", "Oranges", "Kiwi", "Fraises", "Citron"], "instructions": "Couper les fruits et les mélanger avec un filet de citron."}, {"id": 440082, "name": "Poire Belle-Hélène", "category": "Dessert", "ingredients": ["Poires", "Chocolat", "Glace vanille", "Amandes effilées"], "instructions": "Servir les poires pochées avec glace et sauce chocolat."}, {"id": 440083, "name": "Banana split", "category": "Dessert", "ingredients": ["Bananes", "Glace vanille", "Glace chocolat", "Chantilly", "Chocolat"], "instructions": "Disposer banane, glaces, sauce chocolat et chantilly."}, {"id": 440084, "name": "Semoule au lait", "category": "Dessert", "ingredients": ["Semoule fine", "Lait", "Sucre", "Vanille", "Raisins secs"], "instructions": "Cuire la semoule dans le lait sucré puis laisser refroidir."}, {"id": 440085, "name": "Banana bread", "category": "Goûter", "ingredients": ["Bananes", "Farine", "Oeuf", "Sucre roux", "Beurre", "Levure chimique"], "instructions": "Écraser les bananes, mélanger puis cuire environ 45 minutes."}, {"id": 440086, "name": "Muffins chocolat", "category": "Goûter", "ingredients": ["Farine", "Oeuf", "Lait", "Beurre", "Sucre", "Chocolat", "Levure chimique"], "instructions": "Mélanger rapidement, répartir en moules et cuire 20 minutes."}, {"id": 440087, "name": "Muffins myrtilles", "category": "Goûter", "ingredients": ["Farine", "Oeuf", "Lait", "Beurre", "Sucre", "Myrtilles", "Levure chimique"], "instructions": "Incorporer les myrtilles délicatement puis cuire en moules."}, {"id": 440088, "name": "Brownies", "category": "Goûter", "ingredients": ["Chocolat", "Beurre", "Sucre", "Oeuf", "Farine", "Noix"], "instructions": "Faire fondre chocolat et beurre, mélanger puis cuire peu pour garder le fondant."}, {"id": 440089, "name": "Brookies", "category": "Goûter", "ingredients": ["Chocolat", "Beurre", "Sucre", "Oeuf", "Farine", "Pépites de chocolat"], "instructions": "Superposer pâte à brownie et pâte à cookie puis cuire."}, {"id": 440090, "name": "Sablés vanille", "category": "Goûter", "ingredients": ["Farine", "Beurre", "Sucre", "Oeuf", "Vanille"], "instructions": "Former une pâte, découper les biscuits puis cuire jusqu’à légère coloration."}, {"id": 440091, "name": "Cookies chocolat blanc", "category": "Goûter", "ingredients": ["Farine", "Beurre", "Sucre roux", "Oeuf", "Chocolat blanc", "Levure chimique"], "instructions": "Former des boules et cuire une dizaine de minutes."}, {"id": 440092, "name": "Cookies noix noisettes", "category": "Goûter", "ingredients": ["Farine", "Beurre", "Sucre roux", "Oeuf", "Noix", "Noisettes"], "instructions": "Mélanger, former les cookies puis cuire en gardant le centre moelleux."}, {"id": 440093, "name": "Gaufres", "category": "Goûter", "ingredients": ["Farine", "Oeuf", "Lait", "Beurre", "Sucre", "Levure chimique"], "instructions": "Préparer la pâte puis cuire au gaufrier."}, {"id": 440094, "name": "Pain perdu", "category": "Goûter", "ingredients": ["Pain", "Oeuf", "Lait", "Sucre", "Beurre", "Cannelle"], "instructions": "Tremper le pain dans le mélange puis dorer à la poêle."}, {"id": 440095, "name": "Churros au four", "category": "Goûter", "ingredients": ["Farine", "Eau", "Beurre", "Oeuf", "Sucre", "Cannelle"], "instructions": "Pocher la pâte en bâtonnets puis cuire et rouler dans le sucre."}, {"id": 440096, "name": "Barres céréales maison", "category": "Goûter", "ingredients": ["Flocons d'avoine", "Miel", "Amandes", "Noisettes", "Chocolat"], "instructions": "Mélanger, tasser dans un moule puis cuire et découper."}, {"id": 440097, "name": "Energy balls cacao", "category": "Goûter", "ingredients": ["Dattes", "Flocons d'avoine", "Cacao", "Beurre de cacahuète", "Noix de coco"], "instructions": "Mixer, former des boules puis réserver au frais."}, {"id": 440098, "name": "Brioche perdue", "category": "Goûter", "ingredients": ["Brioche", "Oeuf", "Lait", "Sucre", "Beurre"], "instructions": "Tremper les tranches puis les caraméliser à la poêle."}, {"id": 440099, "name": "Smoothie bowl", "category": "Goûter", "ingredients": ["Bananes", "Fruits rouges", "Yaourt nature", "Granola", "Miel"], "instructions": "Mixer les fruits avec le yaourt puis garnir de granola et miel."}];
const V44_PANTRY_STAPLES=new Set([
 "sel","poivre","huile","huile dolive","eau","beurre","sucre","farine",
 "ail","oignons","oignon","herbes de provence","paprika","curry","cumin",
 "thym","origan","basilic","bouillon"
].map(productKey));

let stock=JSON.parse(localStorage.getItem("bz_stock")||"{}");
let recipeMode="all";
let inverseSelected=new Set();

function saveStock(){
 localStorage.setItem("bz_stock",JSON.stringify(stock));
}

function stockEntryFor(name){
 const key=productKey(name);
 const existingKey=Object.keys(stock).find(k=>productKey(k)===key);
 return existingKey?stock[existingKey]:null;
}

function stockQuantity(name){
 const entry=stockEntryFor(name);
 return entry?Number(entry.qty)||0:0;
}

function setStock(name,qty,unit="unité"){
 const product=productByName(name)||ensureProduct(name);
 const oldKey=Object.keys(stock).find(k=>productKey(k)===productKey(product.name));
 if(oldKey&&oldKey!==product.name)delete stock[oldKey];
 stock[product.name]={qty:Math.max(0,Number(qty)||0),unit:unit||"unité"};
 saveStock();
}

function migrateV44(){
 V44_RECIPES.forEach(recipe=>{
   recipe.ingredients.forEach(ingredient=>ensureProduct(ingredient));
   const existing=recipes.find(item=>normalize(item.name)===normalize(recipe.name));
   if(existing){
     existing.ingredients=[...recipe.ingredients];
     existing.instructions=recipe.instructions;
     existing.category=recipe.category;
   }else{
     recipes.push(structuredClone(recipe));
   }
 });
 localStorage.setItem("bz_recipes",JSON.stringify(recipes));
 localStorage.setItem("bz_products",JSON.stringify(products));
 localStorage.setItem("bz_v44_migrated","1");
}
if(localStorage.getItem("bz_v44_migrated")!=="1")migrateV44();

const v44SwitchView=switchView;
switchView=function(view){
 currentView=view;
 document.querySelectorAll(".nav").forEach(button=>button.classList.toggle("active",button.dataset.view===view));
 document.querySelectorAll("[data-drawer-view]").forEach(button=>button.classList.toggle("active",button.dataset.drawerView===view));
 document.querySelectorAll(".view").forEach(section=>section.classList.toggle("active",section.id===view+"View"));
 const labels={
   home:["Accueil","Ton résumé du jour"],
   products:["Produits","Choisis ce qu’il te faut"],
   favorites:["Favoris","Tes classiques"],
   recipes:["Recettes","Trouve, cherche ou compose une recette"],
   stock:["Stock","Ce qu’il reste à la maison"],
   shopping:["Ma liste","Mode magasin"],
   seasonal:["Saisonnier","Le calendrier des fruits et légumes"],
   stats:["Statistiques","Ton suivi de consommation"],
   history:["Historique","Toutes les courses terminées"],
   store:["Mes magasins","Organise tes parcours"],
   options:["Paramètres","Active seulement ce qui t’est utile"]
 };
 const info=labels[view]||[view,""];
 $("#pageTitle").textContent=info[0];
 $("#pageSubtitle").textContent=info[1];
 $(".top-actions").style.display=["products","favorites","recipes","home"].includes(view)?"flex":"none";
 render();
};

buildMobileDrawer=function(){
 const items=[
  ["home","⌂ Accueil"],["products","🧺 Produits"],["shopping","🛒 Ma liste"],
  ["stock","📦 Stock"],["favorites","★ Favoris"],["recipes","🍳 Recettes"],
  ["seasonal","🌱 Saisonnier"],["stats","↗ Statistiques"],["history","◷ Historique"],
  ["store","🗺 Mes magasins"],["options","⚙ Paramètres"]
 ];
 $("#mobileDrawerNav").innerHTML=items.map(([view,label])=>`<button data-drawer-view="${view}">${label}</button>`).join("");
 document.querySelectorAll("[data-drawer-view]").forEach(button=>button.onclick=()=>{
   switchView(button.dataset.drawerView);
   document.body.classList.remove("mobile-drawer-open");
 });
};
buildMobileDrawer();

function recipeIngredientHTML(name){
 const qty=stockQuantity(name);
 const inStock=options.considerStocks&&qty>0;
 const entry=stockEntryFor(name);
 return `<li class="${inStock?"in-stock":""}">${esc(name)}${inStock?`<span class="recipe-stock-qty">${qty} ${esc(entry?.unit||"")}</span>`:""}</li>`;
}

function filteredRecipes(){
 const query=normalize($("#recipeSearchInput")?.value||"");
 const category=$("#recipeCategoryFilter")?.value||"all";
 return [...recipes]
   .filter(recipe=>!query||normalize(recipe.name).includes(query)||recipe.ingredients.some(item=>normalize(item).includes(query)))
   .filter(recipe=>category==="all"||(recipe.category||"Plat")===category)
   .sort((a,b)=>a.name.localeCompare(b.name,"fr"));
}

renderRecipes=function(){
 if(recipeMode!=="all")return;
 const list=filteredRecipes();
 $("#recipesGrid").innerHTML=list.length?list.map(recipe=>`<article class="recipe-card collapsed">
   <div class="recipe-card-head" onclick="this.parentElement.classList.toggle('collapsed')">
     <div><span class="recipe-category">${esc(recipe.category||"Plat")}</span><h3>${esc(recipe.name)}</h3></div>
     <span class="recipe-card-arrow">▾</span>
   </div>
   <div class="recipe-card-body">
     <ul class="recipe-ingredients">${recipe.ingredients.map(recipeIngredientHTML).join("")}</ul>
     ${recipe.instructions?`<div class="recipe-instructions">${esc(recipe.instructions)}</div>`:""}
     <div class="recipe-actions">
       <button class="primary" onclick="event.stopPropagation();addRecipe(${recipe.id})">Ajouter à la liste</button>
       <button class="ghost" onclick="event.stopPropagation();speakRecipe(${recipe.id})">🔊 Lire</button>
       <button class="ghost" onclick="event.stopPropagation();openEditRecipe(${recipe.id})">✎ Modifier</button>
     </div>
   </div>
 </article>`).join(""):'<div class="empty">Aucune recette trouvée</div>';
};

function renderInverseIngredients(){
 const query=normalize($("#inverseIngredientSearch")?.value||"");
 const list=products
   .filter(product=>!query||normalize(product.name).includes(query))
   .sort((a,b)=>{
     const selectedA=inverseSelected.has(productKey(a.name))?0:1;
     const selectedB=inverseSelected.has(productKey(b.name))?0:1;
     return selectedA-selectedB||a.name.localeCompare(b.name,"fr");
   });
 $("#inverseIngredientPicker").innerHTML=list.map(product=>{
   const selected=inverseSelected.has(productKey(product.name));
   return `<label class="inverse-choice ${selected?"selected":""}">
     <input type="checkbox" ${selected?"checked":""} onchange="toggleInverseIngredient('${jsesc(product.name)}',this.checked)">
     <span>${esc(product.name)}</span>
   </label>`;
 }).join("");
}

window.toggleInverseIngredient=(name,enabled)=>{
 const key=productKey(name);
 if(enabled)inverseSelected.add(key);else inverseSelected.delete(key);
 renderInverseIngredients();
 renderInverseRecipes();
};

function inverseAvailableKeys(){
 const keys=new Set(inverseSelected);
 if(options.considerStocks){
   Object.entries(stock).forEach(([name,entry])=>{
     if(Number(entry.qty)>0)keys.add(productKey(name));
   });
 }
 return keys;
}

function renderInverseRecipes(){
 const available=inverseAvailableKeys();
 const query=normalize($("#recipeSearchInput")?.value||"");
 const category=$("#recipeCategoryFilter")?.value||"all";
 const matches=recipes.map(recipe=>{
   const relevant=recipe.ingredients.filter(item=>!V44_PANTRY_STAPLES.has(productKey(item)));
   const missing=relevant.filter(item=>!available.has(productKey(item)));
   const present=relevant.filter(item=>available.has(productKey(item)));
   return {recipe,missing,present,total:relevant.length};
 }).filter(item=>available.size>0&&item.missing.length<=1&&item.present.length>0)
   .filter(item=>!query||normalize(item.recipe.name).includes(query))
   .filter(item=>category==="all"||(item.recipe.category||"Plat")===category)
   .sort((a,b)=>a.missing.length-b.missing.length||b.present.length-a.present.length||a.recipe.name.localeCompare(b.recipe.name,"fr"));

 $("#inverseRecipeSummary").textContent=available.size
   ?`${matches.length} recette${matches.length>1?"s":""} faisable${matches.length>1?"s":""} avec au maximum un ingrédient manquant`
   :"Choisis quelques ingrédients pour trouver les recettes possibles";

 $("#inverseRecipeResults").innerHTML=matches.length?matches.map(item=>`<article class="recipe-card collapsed">
   <div class="recipe-card-head" onclick="this.parentElement.classList.toggle('collapsed')">
     <div><span class="recipe-category">${esc(item.recipe.category||"Plat")}</span><h3>${esc(item.recipe.name)}</h3></div>
     <span class="recipe-card-arrow">▾</span>
   </div>
   <div class="recipe-card-body">
     ${item.missing.length?`<div class="inverse-missing">Il manque seulement : <strong>${esc(item.missing[0])}</strong></div>`:'<div class="inverse-missing">Tu as tout ce qu’il faut</div>'}
     <ul class="recipe-ingredients">${item.recipe.ingredients.map(recipeIngredientHTML).join("")}</ul>
     <div class="recipe-instructions">${esc(item.recipe.instructions||"")}</div>
     <div class="recipe-actions">
       <button class="primary" onclick="event.stopPropagation();addRecipe(${item.recipe.id})">Ajouter à la liste</button>
     </div>
   </div>
 </article>`).join(""):'<div class="empty">Aucune recette à un ingrédient près avec cette sélection</div>';
}

function setRecipeMode(mode){
 recipeMode=mode;
 document.querySelectorAll("[data-recipe-mode]").forEach(button=>button.classList.toggle("active",button.dataset.recipeMode===mode));
 $("#recipeAllPanel").classList.toggle("hidden",mode!=="all");
 $("#recipeInversePanel").classList.toggle("hidden",mode!=="inverse");
 if(mode==="all")renderRecipes();else{
   renderInverseIngredients();
   renderInverseRecipes();
 }
}

document.querySelectorAll("[data-recipe-mode]").forEach(button=>button.onclick=()=>setRecipeMode(button.dataset.recipeMode));
$("#recipeSearchInput").oninput=()=>recipeMode==="all"?renderRecipes():renderInverseRecipes();
$("#recipeCategoryFilter").onchange=()=>recipeMode==="all"?renderRecipes():renderInverseRecipes();
$("#inverseIngredientSearch").oninput=renderInverseIngredients;
$("#inverseClearBtn").onclick=()=>{inverseSelected.clear();renderInverseIngredients();renderInverseRecipes()};
$("#inverseUseStockBtn").onclick=()=>{
 inverseSelected=new Set(Object.entries(stock).filter(([,entry])=>Number(entry.qty)>0).map(([name])=>productKey(name)));
 renderInverseIngredients();
 renderInverseRecipes();
};

function renderStock(){
 const query=normalize($("#stockSearchInput")?.value||"");
 const stockProducts=products
   .filter(product=>{
     const entry=stockEntryFor(product.name);
     return entry&&(!query||normalize(product.name).includes(query));
   })
   .sort((a,b)=>a.name.localeCompare(b.name,"fr"));

 const positive=stockProducts.filter(product=>stockQuantity(product.name)>0);
 const totalQty=positive.reduce((sum,product)=>sum+stockQuantity(product.name),0);

 $("#stockSummary").innerHTML=`
   <article class="stock-stat"><strong>${positive.length}</strong><small>produits disponibles</small></article>
   <article class="stock-stat"><strong>${totalQty.toFixed(totalQty%1?1:0)}</strong><small>quantité totale déclarée</small></article>
   <article class="stock-stat"><strong>${products.length-stockProducts.length}</strong><small>produits jamais renseignés</small></article>`;

 $("#stockGrid").innerHTML=stockProducts.length?stockProducts.map(product=>{
   const entry=stockEntryFor(product.name)||{qty:0,unit:"unité"};
   return `<article class="stock-item ${Number(entry.qty)<=0?"stock-empty":""}">
     <div class="stock-item-name">${esc(product.name)}<small>${esc(product.aisle||product.category||"")}</small></div>
     <input class="stock-qty" type="number" min="0" step="0.1" value="${Number(entry.qty)||0}" onchange="updateStockQty('${jsesc(product.name)}',this.value)">
     <select onchange="updateStockUnit('${jsesc(product.name)}',this.value)">
       ${["unité","paquet","bouteille","boîte","g","kg","ml","L"].map(unit=>`<option ${entry.unit===unit?"selected":""}>${unit}</option>`).join("")}
     </select>
     <button class="remove-item-btn" onclick="removeFromStock('${jsesc(product.name)}')">×</button>
   </article>`;
 }).join(""):'<div class="empty">Ton stock est vide. Ajoute un produit ou termine une course.</div>';
}

window.updateStockQty=(name,value)=>{
 const entry=stockEntryFor(name)||{qty:0,unit:"unité"};
 setStock(name,value,entry.unit);
 renderStock();
 if(currentView==="recipes")recipeMode==="all"?renderRecipes():renderInverseRecipes();
};
window.updateStockUnit=(name,unit)=>{
 const entry=stockEntryFor(name)||{qty:0,unit};
 setStock(name,entry.qty,unit);
};
window.removeFromStock=name=>{
 const key=Object.keys(stock).find(item=>productKey(item)===productKey(name));
 if(key)delete stock[key];
 saveStock();
 renderStock();
};
$("#stockSearchInput").oninput=renderStock;
$("#addStockProductBtn").onclick=()=>{
 const name=prompt("Quel produit ajouter au stock ?");
 if(!name)return;
 const product=productByName(name)||ensureProduct(name);
 const qty=prompt("Quantité", "1");
 if(qty===null)return;
 setStock(product.name,qty,"unité");
 renderStock();
};

const v44RenderOptions=renderOptions;
renderOptions=function(){
 v44RenderOptions();
 if($("#optConsiderStocks"))$("#optConsiderStocks").checked=!!options.considerStocks;
};
$("#optConsiderStocks").onchange=event=>{
 options.considerStocks=event.target.checked;
 localStorage.setItem("bz_options",JSON.stringify(options));
 render();
};

$("#finishForm").onsubmit=event=>{
 event.preventDefault();
 const names=Object.keys(shopping).filter(name=>bought[name]);
 if(!names.length){
   $("#finishDialog").close();
   showActionMessage("Aucun produit coché");
   return;
 }
 const amount=normalizeCourseAmount($("#finishAmount").value);
 history.unshift({id:Date.now(),date:new Date().toISOString(),products:names,amount});
 const boughtSet=new Set(names.map(productKey));
 products.forEach(product=>{
   streaks[product.name]=boughtSet.has(productKey(product.name))?(streaks[product.name]||0)+1:0;
   if(options.autoFavorites&&streaks[product.name]>=3)product.favorite=true;
 });
 names.forEach(name=>{
   const entry=stockEntryFor(name)||{qty:0,unit:"unité"};
   setStock(name,(Number(entry.qty)||0)+1,entry.unit||"unité");
 });
 shopping={};
 bought={};
 save();
 saveStock();
 $("#finishDialog").close();
 launchConfetti();
 render();
};

const v44Render=render;
render=function(){
 v44Render();
 if($("#stockView"))renderStock();
 if(currentView==="recipes"){
   if(recipeMode==="all")renderRecipes();
   else{renderInverseIngredients();renderInverseRecipes()}
 }
};

setRecipeMode("all");
render();


const V45_RECIPES=[{"id": 450000, "name": "Œufs brouillés crémeux", "category": "Ptit dej", "ingredients": ["Oeuf", "Beurre", "Crème fraîche", "Pain"], "instructions": "1. Battre les oeufs\n2. Faire fondre le beurre à feu doux\n3. Cuire en remuant\n4. Ajouter la crème hors du feu\n5. Servir avec du pain"}, {"id": 450001, "name": "Omelette au fromage", "category": "Ptit dej", "ingredients": ["Oeuf", "Gruyère", "Beurre"], "instructions": "1. Battre les oeufs\n2. Faire fondre le beurre\n3. Verser les oeufs\n4. Ajouter le gruyère\n5. Replier et servir"}, {"id": 450002, "name": "Omelette jambon fromage", "category": "Ptit dej", "ingredients": ["Oeuf", "Jambon", "Gruyère", "Beurre"], "instructions": "1. Couper le jambon\n2. Battre les oeufs\n3. Cuire dans une poêle beurrée\n4. Ajouter jambon et gruyère\n5. Replier"}, {"id": 450003, "name": "Omelette champignons", "category": "Ptit dej", "ingredients": ["Oeuf", "Champignons", "Oignons", "Beurre"], "instructions": "1. Émincer champignons et oignons\n2. Les faire revenir\n3. Battre les oeufs\n4. Verser sur les légumes\n5. Cuire doucement"}, {"id": 450004, "name": "Omelette espagnole", "category": "Ptit dej", "ingredients": ["Oeuf", "Pommes de terre", "Oignons", "Huile d'olive"], "instructions": "1. Couper les pommes de terre\n2. Cuire avec les oignons\n3. Battre les oeufs\n4. Mélanger\n5. Cuire des deux côtés"}, {"id": 450005, "name": "Avocado toast", "category": "Ptit dej", "ingredients": ["Pain", "Avocat", "Oeuf", "Citron", "Paprika"], "instructions": "1. Griller le pain\n2. Écraser l’avocat avec le citron\n3. Cuire l’oeuf\n4. Étaler l’avocat\n5. Ajouter oeuf et paprika"}, {"id": 450006, "name": "Bagel saumon", "category": "Ptit dej", "ingredients": ["Bagel", "Saumon fumé", "Fromage frais", "Citron", "Aneth"], "instructions": "1. Toaster le bagel\n2. Étaler le fromage frais\n3. Ajouter le saumon\n4. Ajouter le citron\n5. Finir avec l’aneth"}, {"id": 450007, "name": "Bagel bacon oeuf", "category": "Ptit dej", "ingredients": ["Bagel", "Bacon", "Oeuf", "Cheddar"], "instructions": "1. Toaster le bagel\n2. Cuire le bacon\n3. Cuire l’oeuf\n4. Ajouter le cheddar\n5. Monter le bagel"}, {"id": 450008, "name": "Porridge banane", "category": "Ptit dej", "ingredients": ["Flocons d'avoine", "Lait", "Banane", "Miel", "Cannelle"], "instructions": "1. Chauffer le lait\n2. Ajouter les flocons\n3. Cuire en remuant\n4. Ajouter la banane\n5. Finir avec miel et cannelle"}, {"id": 450009, "name": "Porridge pomme cannelle", "category": "Ptit dej", "ingredients": ["Flocons d'avoine", "Lait", "Pomme", "Cannelle", "Miel"], "instructions": "1. Couper la pomme\n2. Cuire les flocons dans le lait\n3. Ajouter pomme et cannelle\n4. Laisser épaissir\n5. Ajouter le miel"}, {"id": 450010, "name": "Yaourt granola fruits", "category": "Ptit dej", "ingredients": ["Yaourt à la grecque", "Granola", "Fraise", "Banane", "Miel"], "instructions": "1. Verser le yaourt\n2. Couper les fruits\n3. Ajouter le granola\n4. Ajouter les fruits\n5. Ajouter le miel"}, {"id": 450011, "name": "Breakfast burrito", "category": "Ptit dej", "ingredients": ["Tortillas", "Oeuf", "Bacon", "Cheddar", "Avocat", "Tomate"], "instructions": "1. Cuire le bacon\n2. Préparer les oeufs brouillés\n3. Réchauffer la tortilla\n4. Ajouter les ingrédients\n5. Rouler"}, {"id": 450012, "name": "Pancakes américains", "category": "Ptit dej", "ingredients": ["Farine", "Oeuf", "Lait", "Beurre", "Sucre", "Levure chimique"], "instructions": "1. Mélanger les ingrédients secs\n2. Ajouter oeuf et lait\n3. Ajouter le beurre fondu\n4. Laisser reposer\n5. Cuire à la poêle"}, {"id": 450013, "name": "French toast", "category": "Ptit dej", "ingredients": ["Pain de mie", "Oeuf", "Lait", "Sucre", "Beurre", "Cannelle"], "instructions": "1. Battre oeuf lait sucre et cannelle\n2. Tremper le pain\n3. Faire fondre le beurre\n4. Dorer des deux côtés\n5. Servir"}, {"id": 450014, "name": "Granola maison", "category": "Ptit dej", "ingredients": ["Flocons d'avoine", "Miel", "Noisettes", "Amandes", "Huile de coco"], "instructions": "1. Mélanger les ingrédients\n2. Étaler sur une plaque\n3. Cuire à 170 °C\n4. Remuer à mi-cuisson\n5. Laisser refroidir"}, {"id": 450015, "name": "Salade niçoise", "category": "Salade", "ingredients": ["Tomate", "Oeuf", "Thon", "Haricot vert", "Olives noires", "Pommes de terre"], "instructions": "1. Cuire pommes de terre oeufs et haricots\n2. Couper les tomates\n3. Égoutter le thon\n4. Tout réunir\n5. Assaisonner"}, {"id": 450016, "name": "Salade caprese", "category": "Salade", "ingredients": ["Tomate", "Mozzarella", "Basilic", "Huile d'olive"], "instructions": "1. Couper tomate et mozzarella\n2. Les alterner\n3. Ajouter le basilic\n4. Verser l’huile\n5. Servir frais"}, {"id": 450017, "name": "Salade italienne", "category": "Salade", "ingredients": ["Roquette", "Tomate cerise", "Mozzarella", "Jambon cru", "Parmesan"], "instructions": "1. Laver la roquette\n2. Couper les tomates\n3. Ajouter mozzarella et jambon\n4. Ajouter parmesan\n5. Assaisonner"}, {"id": 450018, "name": "Coleslaw", "category": "Salade", "ingredients": ["Chou blanc", "Carotte", "Mayonnaise", "Yaourt nature", "Vinaigre"], "instructions": "1. Râper chou et carotte\n2. Mélanger la sauce\n3. Ajouter aux légumes\n4. Mélanger\n5. Réserver au frais"}, {"id": 450019, "name": "Salade piémontaise", "category": "Salade", "ingredients": ["Pommes de terre", "Tomate", "Jambon", "Cornichon", "Oeuf", "Mayonnaise"], "instructions": "1. Cuire pommes de terre et oeufs\n2. Couper les ingrédients\n3. Ajouter les cornichons\n4. Mélanger avec mayonnaise\n5. Réserver au frais"}, {"id": 450020, "name": "Taboulé", "category": "Salade", "ingredients": ["Semoule", "Tomate", "Concombre", "Menthe", "Citron", "Huile d'olive"], "instructions": "1. Réhydrater la semoule\n2. Couper les légumes\n3. Hacher la menthe\n4. Mélanger avec citron et huile\n5. Réserver au frais"}, {"id": 450021, "name": "Salade de riz", "category": "Salade", "ingredients": ["Riz", "Thon", "Maïs", "Tomate", "Oeuf", "Mayonnaise"], "instructions": "1. Cuire riz et oeufs\n2. Laisser refroidir\n3. Ajouter thon maïs tomate\n4. Ajouter les oeufs\n5. Mélanger"}, {"id": 450022, "name": "Salade lentilles feta", "category": "Salade", "ingredients": ["Lentilles", "Feta", "Tomate", "Concombre", "Oignons rouges"], "instructions": "1. Cuire les lentilles\n2. Couper les légumes\n3. Émietter la feta\n4. Mélanger\n5. Assaisonner"}, {"id": 450023, "name": "Salade chèvre chaud", "category": "Salade", "ingredients": ["Salade", "Chèvre", "Pain", "Miel", "Noix"], "instructions": "1. Griller pain et chèvre\n2. Laver la salade\n3. Ajouter les tartines\n4. Ajouter les noix\n5. Finir avec le miel"}, {"id": 450024, "name": "Salade avocat crevettes", "category": "Salade", "ingredients": ["Avocat", "Crevettes", "Tomate", "Concombre", "Citron"], "instructions": "1. Décortiquer les crevettes\n2. Couper les légumes\n3. Mélanger\n4. Ajouter le citron\n5. Servir frais"}];
function normalizeInstructionsToSteps(text){const c=String(text||"").trim();if(!c)return[];const lines=c.split(/\n+/).map(x=>x.trim()).filter(Boolean);if(lines.length>1)return lines.map(x=>x.replace(/^\d+[.)]\s*/,""));return c.split(/(?<=[.!?])\s+/).map(x=>x.trim()).filter(Boolean).map(x=>x.replace(/[.!?]+$/,""));}
function recipeStepsHTML(r){return `<ol class="recipe-steps">${normalizeInstructionsToSteps(r.instructions).map(s=>`<li class="recipe-step">${esc(s)}</li>`).join("")}</ol>`;}
if(localStorage.getItem("bz_v45_migrated")!=="1"){V45_RECIPES.forEach(r=>{r.ingredients.forEach(ensureProduct);const e=recipes.find(x=>normalize(x.name)===normalize(r.name));if(e)Object.assign(e,r);else recipes.push(structuredClone(r));});recipes.forEach(r=>{const s=normalizeInstructionsToSteps(r.instructions);r.instructions=s.map((x,i)=>`${i+1}. ${x}`).join("\n");});save();localStorage.setItem("bz_v45_migrated","1");}
function renderInverseChips(){const list=[...inverseSelected].map(k=>products.find(p=>productKey(p.name)===k)).filter(Boolean).sort((a,b)=>a.name.localeCompare(b.name,"fr"));$("#inverseSelectedChips").innerHTML=list.length?list.map(p=>`<span class="inverse-chip">${esc(p.name)}<button onclick="removeInverseIngredient('${jsesc(p.name)}')">×</button></span>`).join(""):'<span class="muted">Aucun ingrédient sélectionné</span>';}
window.removeInverseIngredient=n=>{inverseSelected.delete(productKey(n));renderInverseChips();renderInverseIngredients();renderInverseRecipes();};
$("#inverseIngredientSearch").onkeydown=e=>{if(e.key==="Enter"){e.preventDefault();const raw=e.target.value.trim();if(!raw)return;const p=products.find(x=>sameProduct(x.name,raw))||products.filter(x=>normalize(x.name).includes(normalize(raw))).sort((a,b)=>a.name.length-b.name.length)[0];if(!p)return showActionMessage("Produit introuvable");inverseSelected.add(productKey(p.name));e.target.value="";renderInverseChips();renderInverseIngredients();renderInverseRecipes();}};
window.toggleInverseIngredient=(n,on)=>{const k=productKey(n);on?inverseSelected.add(k):inverseSelected.delete(k);renderInverseChips();renderInverseIngredients();renderInverseRecipes();};
renderInverseRecipes=function(){const selected=[...inverseSelected],q=normalize($("#recipeSearchInput")?.value||""),cat=$("#recipeCategoryFilter")?.value||"all";const a=inverseAvailableKeys();const ranked=recipes.map(r=>{const keys=r.ingredients.map(productKey),matched=selected.filter(k=>keys.includes(k)),rel=r.ingredients.filter(i=>!V44_PANTRY_STAPLES.has(productKey(i))),missing=rel.filter(i=>!a.has(productKey(i)));return{r,matched,missing};}).filter(x=>!selected.length||x.matched.length).filter(x=>!q||normalize(x.r.name).includes(q)).filter(x=>cat==="all"||(x.r.category||"Plat")===cat).sort((x,y)=>y.matched.length-x.matched.length||x.missing.length-y.missing.length||x.r.name.localeCompare(y.r.name,"fr"));$("#inverseRecipeSummary").textContent=selected.length?`${ranked.length} recettes classées selon ${selected.length} ingrédients`:"Ajoute un ingrédient";$("#inverseRecipeResults").innerHTML=ranked.slice(0,60).map(x=>`<article class="recipe-card collapsed"><div class="recipe-card-head" onclick="this.parentElement.classList.toggle('collapsed')"><div><span class="recipe-category">${esc(x.r.category||"Plat")}</span><h3>${esc(x.r.name)}</h3><div class="inverse-score"><strong>${x.matched.length}/${selected.length||x.r.ingredients.length}</strong><div class="inverse-score-bar"><div class="inverse-score-fill" style="width:${selected.length?x.matched.length/selected.length*100:0}%"></div></div></div></div><span class="recipe-card-arrow">▾</span></div><div class="recipe-card-body"><div class="inverse-missing">${x.missing.length<=1?(x.missing.length?`Il manque seulement : <strong>${esc(x.missing[0])}</strong>`:"Tu as tout ce qu’il faut"):`Il manque encore ${x.missing.length} ingrédients`}</div><ul class="recipe-ingredients">${x.r.ingredients.map(recipeIngredientHTML).join("")}</ul>${recipeStepsHTML(x.r)}<button class="primary" onclick="event.stopPropagation();addRecipe(${x.r.id})">Ajouter à la liste</button></div></article>`).join("")||'<div class="empty">Aucune recette correspondante</div>';}
renderRecipes=function(){if(recipeMode!=="all")return;const l=filteredRecipes();$("#recipesGrid").innerHTML=l.map(r=>`<article class="recipe-card collapsed"><div class="recipe-card-head" onclick="this.parentElement.classList.toggle('collapsed')"><div><span class="recipe-category">${esc(r.category||"Plat")}</span><h3>${esc(r.name)}</h3></div><span class="recipe-card-arrow">▾</span></div><div class="recipe-card-body"><ul class="recipe-ingredients">${r.ingredients.map(recipeIngredientHTML).join("")}</ul>${recipeStepsHTML(r)}<div class="recipe-actions"><button class="primary" onclick="event.stopPropagation();addRecipe(${r.id})">Ajouter à la liste</button><button class="ghost" onclick="event.stopPropagation();speakRecipe(${r.id})">🔊 Lire</button><button class="ghost" onclick="event.stopPropagation();openEditRecipe(${r.id})">✎ Modifier</button></div></div></article>`).join("")||'<div class="empty">Aucune recette</div>';}
$("#inverseClearBtn").onclick=()=>{inverseSelected.clear();$("#inverseIngredientSearch").value="";renderInverseChips();renderInverseIngredients();renderInverseRecipes();};
const oldMode=setRecipeMode;setRecipeMode=function(m){recipeMode=m;document.querySelectorAll("[data-recipe-mode]").forEach(b=>b.classList.toggle("active",b.dataset.recipeMode===m));$("#recipeAllPanel").classList.toggle("hidden",m!=="all");$("#recipeInversePanel").classList.toggle("hidden",m!=="inverse");if(m==="all")renderRecipes();else{renderInverseChips();renderInverseIngredients();renderInverseRecipes();setTimeout(()=>$("#inverseIngredientSearch")?.focus(),50);}};
render();


// ===== V4.6 =====
recipes.forEach(recipe=>{const steps=String(recipe.instructions||"").split(/\n+/).map(x=>x.trim()).map(x=>x.replace(/^\d+[.)]\s*/,"").trim()).filter(x=>x&&!/^\d+$/.test(x));recipe.instructions=steps.map((x,i)=>`${i+1}. ${x}`).join("\n");});save();
function favoriteFirstSort(list){return [...list].sort((a,b)=>Number(!!b.favorite)-Number(!!a.favorite)||a.name.localeCompare(b.name,"fr"));}
const v46OldRenderProducts=renderProducts;
renderProducts=function(){const sort=$("#sortSelect").value,q=normalize($("#searchInput").value);let list=favoriteFirstSort(products.filter(p=>!q||normalize(p.name).includes(q)));const grid=$("#productsGrid");grid.classList.toggle("recipe-layout",sort==="recipe");grid.classList.toggle("aisle-layout",sort==="aisle");let html="";if(sort==="az")html=groupHTML("Tous les produits",list,"#b94716");else if(sort==="category")html=[...new Set(list.map(p=>p.category))].sort((a,b)=>a.localeCompare(b,"fr")).map(g=>groupHTML(g,favoriteFirstSort(list.filter(p=>p.category===g)),categoryColors[g]||"#b94716")).join("");else if(sort==="frequency")html=["souvent","occasionnel","rare"].map(f=>groupHTML(frequencyLabel(f),favoriteFirstSort(list.filter(p=>p.frequency===f)),f==="souvent"?"#8daa7a":f==="occasionnel"?"#e7ad39":"#c64f4f")).join("");else if(sort==="aisle")html=[...new Set(list.map(p=>p.aisle||aisleByCategory[p.category]||"Autre"))].sort((a,b)=>a.localeCompare(b,"fr")).map(g=>groupHTML(g,favoriteFirstSort(list.filter(p=>(p.aisle||aisleByCategory[p.category]||"Autre")===g)),"#b94716")).join("");else if(sort==="recipe")html=recipes.map(r=>groupHTML(r.name,favoriteFirstSort(r.ingredients.map(productByName).filter(Boolean)),"#e7ad39")).join("");grid.innerHTML=html||'<div class="empty">Aucun produit</div>';if(typeof wireProductRowsV4310==="function")wireProductRowsV4310();};
$("#searchInput").addEventListener("keydown",e=>{if(e.key!=="Enter")return;e.preventDefault();const raw=e.target.value.trim();if(!raw)return;const exact=products.find(p=>sameProduct(p.name,raw));const partial=products.filter(p=>normalize(p.name).includes(normalize(raw))).sort((a,b)=>a.name.length-b.name.length)[0];const p=exact||partial;if(!p)return showActionMessage("Produit introuvable");if(shopping[p.name])showActionMessage(`${p.name} est déjà dans la liste`);else{shopping[p.name]=true;delete bought[p.name];save();showActionMessage(`${p.name} ajouté à la liste`);}e.target.value="";render();});
let homeRecipeOffset=Number(localStorage.getItem("bz_home_recipe_offset")||0);
function monthExpense(){const n=new Date();return history.reduce((s,c)=>{const d=new Date(c.date);return d.getFullYear()===n.getFullYear()&&d.getMonth()===n.getMonth()&&Number(c.amount)>0?s+Number(c.amount):s;},0);}
function dailyRecipe(){if(!recipes.length)return null;return recipes[(Math.floor(Date.now()/86400000)+homeRecipeOffset)%recipes.length];}
function recipesPossibleWithStock(){const a=new Set(Object.entries(stock).filter(([,e])=>Number(e.qty)>0).map(([n])=>productKey(n)));return recipes.filter(r=>r.ingredients.filter(i=>!V44_PANTRY_STAPLES.has(productKey(i))).every(i=>a.has(productKey(i)))).length;}
function almostRecipe(){const selected=new Set(Object.keys(shopping).map(productKey));return recipes.map(r=>({recipe:r,missing:r.ingredients.filter(i=>!selected.has(productKey(i))&&!V44_PANTRY_STAPLES.has(productKey(i)))})).find(x=>x.missing.length===2);}
renderHome=function(){const name=profile?.name?.trim()||"Benjamin";$("#homeGreeting").textContent=`Bonjour ${name}`;const r=dailyRecipe();$("#dailyRecipeCard").innerHTML=r?`<div><span class="recipe-category">${esc(r.category||"Plat")}</span><h4>${esc(r.name)}</h4><p>${r.ingredients.slice(0,6).map(esc).join(" · ")}${r.ingredients.length>6?"…":""}</p></div><div class="daily-recipe-actions"><button class="primary" onclick="addRecipe(${r.id})">Ajouter à la liste</button><button class="ghost" onclick="openEditRecipe(${r.id})">Voir</button></div>`:'<div class="empty">Aucune recette</div>';const season=[...seasonalByMonth[currentMonth()].vegetables,...seasonalByMonth[currentMonth()].fruits].length,expense=monthExpense();const cards=[["shopping",Object.keys(shopping).length,"produits dans la liste"],["favorites",products.filter(p=>p.favorite).length,"favoris"],["recipes",recipes.length,"recettes"],["history",history.length,"courses terminées"],["stats",`${expense.toFixed(2)} €`,"dépensés ce mois"],["seasonal",season,"fruits et légumes de saison"]];$("#homeStats").innerHTML=cards.map(([v,n,l])=>`<article class="home-stat clickable" onclick="switchView('${v}')"><strong>${n}</strong><small>${l}</small></article>`).join("");const a=almostRecipe();$("#homeAlmostRecipe").innerHTML=a?`<strong>Il te manque 2 ingrédients pour faire ${esc(a.recipe.name)}</strong><p>${a.missing.map(esc).join(" et ")}</p>`:'<strong>Aucune recette presque complète</strong><p>Ajoute quelques produits dans ta liste</p>';const possible=recipesPossibleWithStock();$("#homeStockRecipes").innerHTML=`<strong>${possible} recette${possible>1?"s":""} faisable${possible>1?"s":""} avec ton stock</strong><p>Active « Considérer les stocks » pour les voir en vert</p>`;};
$("#refreshDailyRecipeBtn").onclick=()=>{homeRecipeOffset++;localStorage.setItem("bz_home_recipe_offset",String(homeRecipeOffset));renderHome();};
const tutorialSteps=[{view:"products",selector:'[data-view="products"]',title:"Tes produits",text:"Cherche un produit, coche-le ou tape son nom puis Entrée pour l’ajouter à ta liste."},{view:"shopping",selector:'[data-view="shopping"]',title:"Ta liste",text:"Coche ce qui est dans ton panier, trie puis valide avec Course payée !"},{view:"recipes",selector:'[data-view="recipes"]',title:"Les recettes",text:"Une recette ajoute automatiquement tous ses ingrédients."},{view:"stock",selector:'[data-view="stock"]',title:"Ton stock",text:"Note ce que tu as chez toi avec les quantités."},{view:"store",selector:'[data-view="store"]',title:"Tes magasins",text:"Place les rayons pour suivre le bon parcours."},{view:"seasonal",selector:'[data-view="seasonal"]',title:"Le saisonnier",text:"Les fruits et légumes changent automatiquement selon le mois actuel."}];let tutorialIndex=0;function clearTutorialHighlight(){document.querySelectorAll(".tutorial-highlight").forEach(e=>e.classList.remove("tutorial-highlight"));}function showTutorialStep(i){tutorialIndex=i;clearTutorialHighlight();const s=tutorialSteps[i];switchView(s.view);document.querySelector(s.selector)?.classList.add("tutorial-highlight");$("#tutorialStepCount").textContent=`${i+1} / ${tutorialSteps.length}`;$("#tutorialTitle").textContent=s.title;$("#tutorialText").textContent=s.text;$("#nextTutorialBtn").textContent=i===tutorialSteps.length-1?"C’est parti !":"Suivant";$("#tutorialOverlay").classList.remove("hidden");}function closeTutorial(){clearTutorialHighlight();$("#tutorialOverlay").classList.add("hidden");localStorage.setItem("bz_tutorial_done","1");switchView("home");}$("#nextTutorialBtn").onclick=()=>tutorialIndex>=tutorialSteps.length-1?closeTutorial():showTutorialStep(tutorialIndex+1);$("#skipTutorialBtn").onclick=closeTutorial;$("#tutorialOverlay").onclick=e=>{if(e.target.closest("#skipTutorialBtn,#nextTutorialBtn"))return;tutorialIndex>=tutorialSteps.length-1?closeTutorial():showTutorialStep(tutorialIndex+1);};$("#replayTutorialBtn").onclick=()=>showTutorialStep(0);if(localStorage.getItem("bz_tutorial_done")!=="1")setTimeout(()=>showTutorialStep(0),500);render();

if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js");
