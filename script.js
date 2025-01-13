document.addEventListener("DOMContentLoaded",()=>{
      const products=[
        {id: 1 ,name:"Product 1",price:12.99,quantity:1},
        {id: 2 ,name:"Product 2",price:19.99,quantity:1},
        {id: 3 ,name:"Product 3",price:10.99,quantity:1},
        {id: 4 ,name:"Product 4",price:22.99,quantity:1},
        {id: 5 ,name:"Product 5",price:82.99,quantity:1}
      ];
      let cart=[]
      const productList= document.getElementById('product-list');
      const cart_items= document.getElementById('cart-items');
      const emptyCartMessage= document.getElementById('empty-cart');
      const cartTotal= document.getElementById('cart-total');
      const totalPriceDisplay= document.getElementById('total-price');
      const checkoutBtn= document.getElementById('checkout-btn');

    cart=loadData();
    console.log(cart);
    
    renderCart()
     


      products.forEach(product=>{
    const productDiv=document.createElement('div')
    productDiv.classList.add('product')
    productDiv.innerHTML=`
    <span>${product.name}  -  $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Add to your cart</button>`;
    productList.appendChild(productDiv);
});

productList.addEventListener('click',(e)=>{
    if(e.target.tagName == 'BUTTON'){
    const productId= parseInt(e.target.getAttribute('data-id'));          //string type
  const product=  products.find(p=>p.id=== productId)
  addToCart(product)

}
})
function addToCart(product){
    const exixtingProd= cart.find(item=>item.id===product.id);
    if(exixtingProd){
        exixtingProd.quantity+=1;

    }
    else{
        product.quantity=1;
        cart.push(product);
    }
    saveData(cart)
    renderCart()
    
    
}
function renderCart(){
    cart_items.innerText="";
    let Total =0;
    if(cart.length>0){
emptyCartMessage.classList.add('hidden')
cartTotal.classList.remove('hidden')
cart.forEach((item,index)=>{
    Total+=item.price*item.quantity;
   const cartItem= document.createElement('div')
    cartItem.innerHTML=
   ` ${item.name} - $${item.price.toFixed(2)} * ${item.quantity }
   <button data-id=${item.id}>Remove</button>`

   cartItem.querySelector("button").addEventListener(('click'),(e)=>{
    const id=parseInt( e.target.getAttribute('data-id'))
    const prodIndex=cart.findIndex(item=>item.id === id);
    if(prodIndex!== -1){
        if(cart[prodIndex].quantity >1){
            cart[prodIndex].quantity -=1;
        }
        else{
            cart.splice(prodIndex,1)
        }
    }
    saveData(cart)
    renderCart()
    

   })

   cart_items.appendChild(cartItem)
   totalPriceDisplay.textContent=`${Total.toFixed(2)}`
   saveData(cart)
})
    }else{
        emptyCartMessage.classList.remove('hidden');
        totalPriceDisplay.textContent=`0`

    }
}
checkoutBtn.addEventListener('click',()=>{
    cart.length=0;
    alert("Checkout succesful");
    renderCart()
})
function saveData(cart){
    localStorage.setItem('choices',JSON.stringify(cart));
}
function loadData(){
    let data = JSON.parse(localStorage.getItem('choices')) || []
     return data;

}
});