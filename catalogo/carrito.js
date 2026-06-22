//Variables del DOM-----------------------------------------------------------------------------------
const cartIconBtn = document.getElementById('cart-icon-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn1 = document.getElementById('close-cart-btn-1');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');

//Estado de la aplicacion (Arreglo del carrito)--------------------------------------------------
let cart = [];

//FUNCION PARA ABRIR Y CERRAR CARRITO LATERAL---------------------------------------------
cartIconBtn.addEventListener('click', () => {
    cartSidebar.classList.add('open');
});
closeCartBtn1.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
});

//FUNCION DE AÑADIR PRODUCTOS CON SOLO PRESIONAR CLICK EN EL BOTON---------------------------------
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        const name = e.target.getAttribute('data-name');
        const price = parseFloat(e.target.getAttribute('data-price'));
        
        addProductToCart(id, name, price);
        // cartSidebar.classList.add('open'); // Abre el carrito automáticamente para feedback visual
    });
});

//Funcion para añadir producto-------------------------------------------------------------
function addProductToCart(id, name, price) {
    //Comprobar si ya existe
    const existingProduct = cart.find(item => item.id === id);
    /*Esta operacion de if-else te permite acumular la cantidad productos que estas
    comprando*/
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    
    updateCartDOM();
}

//FUNCION PARA ELIMINAR EL PRODUCTO-----------------------------------------------------
function removeProductFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartDOM();
}

//FUNCION PARA ACTULIZAR LA LISTA CARRITO---------------------------------------------------------
function updateCartDOM() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-message">Esta vacio</p>';
        cartCount.innerText = '0';
        cartTotal.innerText = 'S/. 0.00';
        return;
    }
    
    let total = 0;
    let totalItems = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        totalItems += item.quantity;
        
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>S/. ${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <i class="fas fa-trash-alt remove-item-btn" onclick="removeProductFromCart('${item.id}')"></i>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
    
    cartCount.innerText = totalItems;
    cartTotal.innerText = `S/. ${total.toFixed(2)}`;
}



//NUEVA FUNCIONALIDAD: PROCESAR PAGO ---------------------------------------

//Seleccionar el botón de proceder al pago
const checkoutBtn = document.querySelector('.checkout-btn');

//Escuchar el evento de click en el boton
checkoutBtn.addEventListener('click', () => {
    //Verificamos si el carrito tiene productos antes de proceder
    if (cart.length === 0) {
        alert('El carrito esta vacio');
        return; // Detiene la ejecución si no hay nada que pagar
    }
    
    //Mostrar el mensaje de éxito
    alert('¡Compra exitosa!');

    //Vaciar el arreglo del carrito
    cart = [];

    //Actualizar la interfaz (DOM) para reflejar que esta vacio
    updateCartDOM();

    //Opcional: Cerrar el panel lateral automáticamente despues de la compra
    cartSidebar.classList.remove('open');
});


//NUEVA FUNCIONALIDAD: FILTRADO DESDE EL MENÚ SUPERIOR ------------------------------------------

//Seleccionar todos los enlaces de filtrado de la barra de navegación-----------------
const navFilterButtons = document.querySelectorAll('.nav-filter-btn');

//Seleccionar todas las tarjetas de producto existentes--------------------------------
const productCards = document.querySelectorAll('.product-card');

navFilterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Evita que la página intente recargarse

        // Remover la clase activa de todos los enlaces y ponérsela al seleccionado
        navFilterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const genderFilter = e.target.getAttribute('data-gender').toLowerCase();

        //Recorrer cada tarjeta de producto para decidir si se muestra u oculta
        productCards.forEach(card => {
            //Obtenemos el texto del título (h3) convertido completamente a minúsculas
            const productTitle = card.querySelector('.product-info h3').innerText.toLowerCase();

            //Generamos un logica simple con la funcion if-else para funcione filtrado 
            if (productTitle.includes(genderFilter)){
                //Si el título del producto contiene la palabra "hombre" o "mujer", se muestra
                card.style.display = 'block';
            }else{
                // Si no coincide, se oculta suavemente de la cuadrícula
                card.style.display = 'none';
            }

            
            //if (genderFilter === 'todos') {
            
                //card.style.display = 'none';
            //} else if (productTitle.includes(genderFilter)) {
                //Si el título del producto contiene la palabra "hombre" o "mujer", se muestra
               // card.style.display = 'block';
            //} else {
                // Si no coincide, se oculta suavemente de la cuadrícula
                //card.style.display = 'none';
            //}
        });
    });
});

