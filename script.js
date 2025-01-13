document.addEventListener("DOMContentLoaded",()=>{
      const products=[
        {id: 1 ,name:"Product 1",price:12.99},
        {id: 2 ,name:"Product 2",price:19.99},
        {id: 3 ,name:"Product 3",price:10.99},
        {id: 4 ,name:"Product 4",price:22.99},
        {id: 5 ,name:"Product 5",price:82.99}
      ];
      const cart=[]
      const productList= document.getElementById('product-list');
      const cart_items= document.getElementById('cart-items');
      const emptyCartMessage= document.getElementById('empty-cart');
      const cartTotal= document.getElementById('cart-total');
      const totalPriceDisplay= document.getElementById('total-price');
      const checkoutBtn= document.getElementById('checkout-btn');


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
    cart.push(product);
    renderCart()
    
    
}
function renderCart(){
    cart_items.innerText="";
    let Total =0;
    if(cart.length>0){
emptyCartMessage.classList.add('hidden')
cartTotal.classList.remove('hidden')
cart.forEach((item,index)=>{
    Total+=item.price
   const cartItem= document.createElement('div')
    cartItem.innerHTML=
   ` ${item.name} - $${item.price.toFixed(2)}`

   cart_items.appendChild(cartItem)
   totalPriceDisplay.textContent=`${Total.toFixed(2)}`
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
});