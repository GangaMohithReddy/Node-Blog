const userCardTemplate = document.querySelector("[data-temp]");
const container = document.querySelector("[container]");
const searchBar = document.querySelector("[data-search]");
const cc = document.querySelector("[cc]");
const it = document.querySelector("[it]")


let menu =[];
let total =0;

searchBar.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  menu.forEach(item => {
      const isVisible = item.title.toLowerCase().includes(value);
      item.element.classList.toggle("hide", !isVisible);
  });
});

fetch("menu_list.json")
  .then(response => response.json())

  .then(data => {   
          menu = data.foodItems.map(item =>{
            const Card = userCardTemplate.content.cloneNode(true).children[0];
            //console.log(Card);

            const title = Card.querySelector("[data-title]");
            const image = Card.querySelector("[data-img]");
            const pr = Card.querySelector("[data-price]");
            const ac = Card.querySelector("[ac]");
            const del = Card.querySelector("[del]");
            const quant = Card.querySelector("[quant]");

            const ccc = cc.content.cloneNode(true).children[0];
            const cname = ccc.querySelector("[cname]");
            const cquant = ccc.querySelector("[cquant]");
            const cprice = ccc.querySelector("[cprice]");
            const ctot = ccc.querySelector("[ctot]");
            
            title.textContent = 'Name : ' + item.name;
            pr.textContent = 'Price : ' + item.price;
            image.src = item.image;

            let result = item.price.substr(1);
            var k =Number(result);
            var i = 0;
            let r = 0;
            
            ac.addEventListener('click',e=>{
              
              cname.textContent = item.name;
              cprice.textContent = item.price;
              i++;
              quant.textContent = i;
              cquant.textContent = i;
              ctot.textContent = k;
              
              ccc.classList.remove("hide");
              it.append(ccc);
              total += Number(ctot.textContent);
              tot(total);
            });

            
            del.addEventListener('click',e=>{
              if(i>0){
                i--;
                quant.textContent = i;
                cquant.textContent = i;
                ctot.textContent = k;
                total -= Number(ctot.textContent);
                tot(total);
                if(i == 0){
                  ccc.classList.add("hide");
                  quant.textContent = '';
                  
                  i=0;
                }
              }
            });
            
            
            container.append(Card);
            return{title: item.name,k, element: Card}; 
          });
          //console.log(menu);
  });

  function tot(tota){
    const ttl = document.getElementById('tot');
    ttl.innerHTML = ``;
    const ttt = document.createElement('div');
    ttt.innerHTML=`<span>Total : ${Math.round(tota * 100) / 100}</span>`;
    ttl.append(ttt);
  }

