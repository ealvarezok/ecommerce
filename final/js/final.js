'use strict';

//------------------------FUNCIONES
let d = document;
let divProductos = d.querySelector('#productos');
let main = d.querySelector('main');
let productosAgregados = d.querySelector('#miniCarrito > ul > li:first-child > span');
let productosTotal = d.querySelector('#miniCarrito > ul > li:last-child > span');
let miniCarrito = d.querySelector('#miniCarrito');
miniCarrito.addEventListener('click', (e) => {
    
    if (e) {
        MostrarCarrito();
    }

});
let modal = d.createElement('div');
modal.setAttribute('class', 'modal');

let div = d.createElement('div');
div.setAttribute('class', 'modalDiv');

let cierreModal = d.createElement('div');
cierreModal.setAttribute('class', 'cierre-modal');
cierreModal.style.cursor = 'pointer';

let aCierre = d.createElement('a');
aCierre.innerText = 'X';
cierreModal.addEventListener('click', (a) => {
    modal.remove();
});

let modalBanner = d.createElement("div");

let filtrosCat = d.querySelectorAll('#filtroCategorias > ul > li');
for (const f of filtrosCat) {

    f.addEventListener('click', Filtros);
    f.setAttribute('class', 'filtros');

    if(f.innerText === 'Todos'){
        f.setAttribute('class', 'filtroSeleccionado');
    }

}
let spanCantidad;
let spanSubtotal;
let spanTotalCarrito;

let btnCarritoComprar;
let btnCarritoCancelar;

let ulProductos;
let eliminarProducto;

//------------------------VARIABLES
let pTotal = 0;
let cTotal = 0;
let productoA = null;



//------------------------ARRAYS Y OBJETOS
let productosArray = [

    {
        id : 1,
        img : 'imgs/buzo1.jpg',
        imgAlt : 'Buzo de frisa negro',
        nombre : 'Buzo negro',
        categoria : 'Todos - Abrigos',
        subcategoria: 'Abrigos',
        precio : 8500,
        descripcion : 'Buzo estilo deportivo compuesto por frisa. Modelo 2021/2022. Fabricado por NBA Official Store.',
    },

    {
        id : 2,
        img : 'imgs/buzo2.jpg',
        imgAlt : 'Buzo de frisa verde',
        nombre : 'Buzo verde',
        categoria : 'Todos - Abrigos',
        subcategoria: 'Abrigos',
        precio : 8500,
        descripcion : 'Buzo estilo deportivo compuesto por frisa. Modelo 2019/2020. Fabricado por NBA Official Store.',
    },

    {
        id : 3,
        img : 'imgs/buzo3.jpg',
        imgAlt : 'Buzo de frisa azul',
        nombre : 'Buzo azul',
        categoria : 'Todos - Abrigos',
        subcategoria: 'Abrigos',
        precio : 8500,
        descripcion : 'Buzo estilo deportivo compuesto por frisa. Modelo 2021/2022. Fabricado por NBA Official Store.',
    },

    {
        id : 4,
        img : 'imgs/gorra1.jpg',
        imgAlt : 'Gorra snapaback beige y verde',
        nombre : 'Gorra snapback',
        categoria : 'Todos - Gorras',
        subcategoria: 'Gorras',
        precio : 5000,
        descripcion : `Gorra de Milwaukee Buck's estilo urbana. Modelo 2021 Champion's. Cierre plástico.`,
    },

    {
        id : 5,
        img : 'imgs/gorra2.jpg',
        imgAlt : 'Gorra baseball negra',
        nombre : 'Gorra baseball',
        categoria : 'Todos - Gorras',
        subcategoria: 'Gorras',
        precio : 5000,
        descripcion : `Gorra de Milwaukee Buck's estilo deportiva. Modelo 2020. Cierre con velcro.`,
    },

    {
        id : 6,
        img : 'imgs/gorra3.jpg',
        imgAlt : 'Gorra snapback negra y verde',
        nombre : 'Gorra snapback 2',
        categoria : 'Todos - Gorras',
        subcategoria: 'Gorras',
        precio : 5000,
        descripcion : `Gorra de Milwaukee Buck's estilo urbana. Modelo 2021 Champion's. Cierre plástico.`,
    },

    {
        id : 7,
        img : 'imgs/remera1.jpg',
        imgAlt : 'Remera estilo clásica verde con estampado de Abdul Jabbar',
        nombre : 'Remera clasic',
        categoria : 'Todos - Remeras',
        subcategoria: 'Remeras',
        precio : 6300,
        descripcion : `Remera 100% algodón peinado 30/1. Modelo clásico color verde con estampado de Abdul Jabbar.`,
    },

    {
        id : 8,
        img : 'imgs/remera2.jpg',
        imgAlt : 'Remera actual negra con estampado de Antetokounmpo',
        nombre : 'Remera actual',
        categoria : 'Todos - Remeras',
        subcategoria: 'Remeras',
        precio : 6300,
        descripcion : `Remera 100% algodón peinado 30/1, Modelo 2020/2021 con estampado de Giannis Antetokumpo.`,
    },

    {
        id : 9,
        img : 'imgs/remera3.jpg',
        imgAlt : 'Remera actual verde con estampado de Antetokounmpo',
        nombre : 'Remera actual 2',
        categoria : 'Todos - Remeras',
        subcategoria: 'Remeras',
        precio : 6300,
        descripcion : `Remera 100% algodón peinado 30/1, Modelo 2020/2021 con estampado de Giannis Antetokumpo.`,
    },


];

let productosEnCarrito = LocalStorageCarrito();

let bannerArray = [
    {
        img: 'imgs/banner1.jpg',
        h3: 'Edición limitada de Remera Clasic',
        p: `Agrega a tu carrito la nueva remera Clasic de los Buck's y comprate la tuya antes que se acaben.`,
        txtColor: 'black',
        botonBackgroundColor: 'rgb(121, 30, 121)',
        botonBackgroundColorHover: 'rgb(177, 58, 177)',
        botonColor: 'white',
        id : 8,
        nombre : 'Remera actual',
        precio : 6300,

    },
    {
        img: 'imgs/banner2.jpg',
        h3: 'Nueva Gorra Baseball verde',
        p: `Agrega a tu carrito la nueva Gorra Baseball de los Buck's y comprala antes que se acaben.`,
        txtColor: 'black',
        botonBackgroundColor: 'rgb(121, 30, 121)',
        botonBackgroundColorHover: 'rgb(177, 58, 177)',
        botonColor: 'white',
        id : 5,
        nombre : 'Gorra baseball',
        precio : 5000,

    },
    {
        img: 'imgs/banner3.jpg',
        h3: `Nuevo Buzo Negro de los Buck's`,
        p: `Agrega a tu carrito el nuevo buzo negro de los Buck's y compralo antes que se acaben.`,
        txtColor: 'white',
        botonBackgroundColor: 'white',
        botonBackgroundColorHover: 'rgb(210, 210, 210)',
        botonColor: 'rgb(121, 30, 121)',
        id : 1,
        nombre : 'Buzo negro',
        precio : 8500,
    }
];
//------------------------FUNCIONES
const MostrarProductos = (array) => {

    for (const productoArray of array) {
        
        //DOM
        let producto = d.createElement('div');
        divProductos.appendChild(producto);
        producto.setAttribute('class', 'producto');
        producto.setAttribute('id', productoArray.id);
        
        let figure = d.createElement('figure');
        producto.appendChild(figure);
        let picture = d.createElement('picture');
        figure.appendChild(picture);
        let imgProducto = d.createElement('img');
        picture.appendChild(imgProducto);
        imgProducto.src = productoArray.img;
        imgProducto.alt = productoArray.imgAlt;

        let textoProducto = d.createElement('div');
        producto.appendChild(textoProducto);
        textoProducto.setAttribute('class', 'texto-producto');
        
        let nombreProducto = d.createElement('h3');
        textoProducto.appendChild(nombreProducto);
        nombreProducto.innerText = productoArray.nombre;

        let categoriaProducto = d.createElement('p');
        textoProducto.appendChild(categoriaProducto);
        categoriaProducto.innerText = productoArray.subcategoria;

        let precioProducto = d.createElement('p');
        textoProducto.appendChild(precioProducto);
        precioProducto.innerText = 'Precio: $';
        let numPrecioProducto = d.createElement('span');
        precioProducto.appendChild(numPrecioProducto);
        numPrecioProducto.innerText = productoArray.precio;

        let botonesProducto = d.createElement('div');
        producto.appendChild(botonesProducto);
        botonesProducto.setAttribute('class', 'botones-producto');

        let btnAgregar = CrearEtiqueta('button', {'class': 'btn-agregar', 'data-id':productoArray.id}, 'Agregar', 'click', AgregarProducto)
        botonesProducto.appendChild(btnAgregar);

        let btnVerMas = CrearEtiqueta('button', {'class': 'btn-ver-mas', 'data-id':productoArray.id}, 'Ver más', 'click', VerMas)
        botonesProducto.appendChild(btnVerMas);
    }
}; //48

const MostrarCarrito = () => {

    CrearModal();
    BorrarEsc();
    BorrarClickOutside();

    let ventanaCarrito = d.createElement('div');
    ventanaCarrito.setAttribute('class', 'ventanaM');
    div.appendChild(ventanaCarrito);

    let h3 = d.createElement('h3');
    h3.innerText = 'Carrito de compras';
    ventanaCarrito.appendChild(h3);

    let ulProductos = d.createElement('ul');
    ulProductos.setAttribute('class', 'productosCarrito');
    ventanaCarrito.appendChild(ulProductos);

    for (const producto in productosEnCarrito) {
        let li = d.createElement('li');
        li.innerText = productosEnCarrito[producto].nombre;
        ulProductos.appendChild(li);

        eliminarProducto = d.createElement('button');
        eliminarProducto.setAttribute('class', 'eliminarProducto');
        eliminarProducto.setAttribute('data-id', parseInt(productosEnCarrito[producto].id));
        li.appendChild(eliminarProducto);
        eliminarProducto.addEventListener('click', (e) => {

            Datos(e);

            if (e) {  

                //ACTUALIZAMOS EL CARRITO
                for (const p in productosEnCarrito) {                    

                    if(productosEnCarrito[p].id == e.target.dataset.id) {
            
                        delete productosEnCarrito[p];
                        
                        ActualizarTotales();
    
                        //ETIQUETAS
                        productosAgregados.innerText = cTotal;
                        productosTotal.innerText = pTotal;
                        spanTotalCarrito.innerText = pTotal;
                        e.target.remove();

                        //MOSTRAMOS CARRITO
                        MostrarCarrito();
                        
                        //GUARDAMOS EN LOCAL STORAGE
                        Guardar();
                           
                    }

                    console.table(productosEnCarrito);

                }
            }
        });

        let ulDetalles = d.createElement('ul');
        li.appendChild(ulDetalles);

        let cantidadU = d.createElement('li');
        cantidadU.innerText = 'Cantidad : ';
        ulDetalles.appendChild(cantidadU);

        spanCantidad = d.createElement('span');
        spanCantidad.setAttribute('class', 'sCantidad');
        cantidadU.appendChild(spanCantidad);
        spanCantidad.innerText = productosEnCarrito[producto].cantidad;

        let subtotal = d.createElement('li');
        subtotal.innerText = 'Subtotal: $';
        ulDetalles.appendChild(subtotal);
        spanSubtotal = d.createElement('span');
        spanSubtotal.setAttribute('class', 'sSubtotal');
        subtotal.appendChild(spanSubtotal);
        spanSubtotal.innerText = productosEnCarrito[producto].subtotal;

        let agregarProducto = CrearEtiqueta('button', {'data-agregar': 'agregarProducto', 'data-id':productosEnCarrito[producto].id}, null, 'click', AgregarProducto);
        spanCantidad.appendChild(agregarProducto);

        let disminuirProducto = CrearEtiqueta('button', {'class': 'disminuirProducto'}, null, 'click', DisminuirProducto);
        spanCantidad.appendChild(disminuirProducto);

    }

    let totalCarrito = d.createElement('p');
    totalCarrito.setAttribute('class', 'totalCarrito');
    totalCarrito.innerText = 'Total: $';
    ventanaCarrito.appendChild(totalCarrito);
    spanTotalCarrito = d.createElement('span');
    spanTotalCarrito.setAttribute('class', 'sTotal');
    spanTotalCarrito.innerText = pTotal;
    totalCarrito.appendChild(spanTotalCarrito);

    btnCarritoComprar = CrearEtiqueta('button', {'class': 'btn-carritoComprar'}, 'Comprar', 'click', CheckOut)
    ventanaCarrito.appendChild(btnCarritoComprar);

    btnCarritoCancelar = CrearEtiqueta('button', {'class': 'btn-carritoCancelar'}, 'Borrar todos los productos', 'click', EliminarTodos);
    ventanaCarrito.appendChild(btnCarritoCancelar);

    //BLOQUEO DE COMPRA
    if (pTotal === 0){


        let carritoVacio = d.createElement('p');
        carritoVacio.innerText = '¡El carrito esta vacio!';
        carritoVacio.setAttribute('class', 'carritoVacio');
        ulProductos.appendChild(carritoVacio)

        btnCarritoCancelar.disabled;
        btnCarritoCancelar.style.color = 'grey';
        btnCarritoCancelar.style.border = 'none';
        btnCarritoCancelar.style.cursor = 'default';
        btnCarritoCancelar.removeEventListener('click', EliminarTodos);


        btnCarritoComprar.disabled;
        btnCarritoComprar.style.background = 'grey';
        btnCarritoComprar.style.cursor = 'default';
        btnCarritoComprar.removeEventListener('click',CheckOut);

    }

    
} //107

function Filtros(e) {
    if (e) {
        
        console.log('banner abierto')
        divProductos.innerHTML = '';

        const Filtro = productosArray.filter((producto) => producto.categoria.includes(e.target.innerText));
        MostrarProductos(Filtro);

        //EJECUTAMOS BANNER RANDOM
        BannerRandom();

    }

    for (const f of filtrosCat) {

        if(f.innerText === e.target.innerText){
            f.setAttribute('class', 'filtroSeleccionado')
        } else {
            f.setAttribute('class', 'filtros')
        }
    }
}//26

const BannerRandom = () => { 
    let ba = bannerArray[Math.round(Math.random() * 2)];
    
    modalBanner.innerHTML = '';
    modalBanner.setAttribute('class', 'modal');
    modalBanner.setAttribute('data-banner', 'modalBanner');
    main.appendChild(modalBanner);

    let banner = d.createElement('div');
    banner.setAttribute('class', 'bannerDiv');
    modalBanner.appendChild(banner);
    banner.style.backgroundImage = `url(${ba.img})`;

    let cierreModal = d.createElement('div');
    cierreModal.setAttribute('class', 'cierre-modal');
    banner.appendChild(cierreModal);
    cierreModal.style.cursor = 'pointer';

    let aCierre = d.createElement('a');
    aCierre.innerText = 'X';
    cierreModal.appendChild(aCierre);
    cierreModal.addEventListener('click', (a) => {
        modalBanner.remove();
        clearTimeout(fx);
    });

    let divTxtBanner = d.createElement('div');
    divTxtBanner.setAttribute('class', 'div-txt-banner ');
    banner.appendChild(divTxtBanner);

    let txtBanner = d.createElement('div');
    divTxtBanner.appendChild(txtBanner);
    txtBanner.style.color = ba.txtColor;
    txtBanner.setAttribute('class', 'txt-banner');

    let h3Banner = d.createElement('h3');
    txtBanner.appendChild(h3Banner);
    h3Banner.innerText = ba.h3;

    let pBanner = d.createElement('p');
    pBanner.innerText = ba.p;
    txtBanner.appendChild(pBanner);

    let botonBanner = d.createElement('button');
    botonBanner.setAttribute('class', 'btn-banner');
    botonBanner.setAttribute('data-id', ba.id);
    botonBanner.setAttribute('data-nombre', ba.nombre);
    botonBanner.setAttribute('data-precio', ba.precio);
    botonBanner.innerText = 'Agregar a carrito';
    botonBanner.style.backgroundColor = ba.botonBackgroundColor;
    botonBanner.style.color = ba.botonColor;
    botonBanner.addEventListener('mouseover', () => {
        botonBanner.style.backgroundColor = ba.botonBackgroundColorHover;
    })
    botonBanner.addEventListener('mouseout', () => {
        botonBanner.style.backgroundColor = ba.botonBackgroundColor;
    })
    botonBanner.addEventListener('click', AgregarProducto);
    txtBanner.appendChild(botonBanner);

    // CREAMOS TIMER BANNER
    const BannerOut = function(){

        modalBanner.remove();
        console.log('banner cerrado');
        clearTimeout(fx);

    };

    // EJECUTAMOS TIMER BANNER
    let fx = setTimeout(BannerOut, 3000);
    
}//72

const Datos = (e) => {

    if (e){
        
        let id = parseInt(e.target.dataset.id);
    
        for (const productoB of productosArray) {
            if(productoB.id === id) {
    
                productoA = productoB;
    
            }
            
        }
    }

}//16

const AgregarProducto = (e) => {

    Datos(e);

    if(e) {
        //CREAMOS PRODUCTO PARA VALIDAR
        const producto = {
            id : parseInt(productoA.id),
            nombre : productoA.nombre,
            cantidad : 1,
            precio: parseInt(productoA.precio),
            subtotal: parseInt(productoA.precio),
        }
        

        //ACTUALIZAMOS EL CARRITO
        for (const p in productosEnCarrito) {                    

            if(productosEnCarrito[p].id === parseInt(e.target.dataset.id)) {
    
                producto.cantidad = productosEnCarrito[producto.id].cantidad + 1;
                producto.subtotal = producto.precio * producto.cantidad;     
            }

        }

        productosEnCarrito[producto.id] = {...producto};

        ActualizarTotales()

        //ETIQUETAS
        modalBanner.remove();
        productosAgregados.innerText = cTotal;
        productosTotal.innerText = pTotal;

        //MOSTRAMOS CARRITO
        MostrarCarrito();

        //GUARDAMOS EN LOCAL STORAGE
        Guardar();

        console.table(productosEnCarrito);

    }

}; //45



const DisminuirProducto = (e) => {
    if(e) {
        //CREAMOS PRODUCTO PARA VALIDAR
        const producto = {
            id : parseInt(productoA.id),
            nombre : productoA.nombre,
            cantidad : 1,
            precio: parseInt(productoA.precio),
            subtotal: parseInt(productoA.precio),
        }
        

        //ACTUALIZAMOS EL CARRITO
        for (const p in productosEnCarrito) {                    

            if(productosEnCarrito[p].cantidad > 1) {
    
                //ACTUALIZAMOS CARRITO
                productosEnCarrito[p].cantidad -= 1;
                productosEnCarrito[p].subtotal -= productosEnCarrito[p].precio;

                ActualizarTotales()
                
                //ETIQUETAS
                productosAgregados.innerText = cTotal;
                productosTotal.innerText = pTotal;
                spanCantidad.innerText = productosEnCarrito[p].cantidad;
                productosTotal.innerText = pTotal;
                spanTotalCarrito.innerText = pTotal;

                //MOSTRAMOS CARRITO
                MostrarCarrito();
                
                //GUARDAMOS EN LOCAL STORAGE
                Guardar();

                console.table(productosEnCarrito);    
            }

        }

    }
}//42

const EliminarProducto = (e) => {
    if (e) {
        e.target.parentNode.remove();

        //ACTUALIZACION DE CARRITO
        delete productosEnCarrito[producto];

        ActualizarTotales()

        //BLOQUEAR CARRITO
        if (ulProductos.innerText === '') {

            btnCarritoComprar.disabled;
            btnCarritoComprar.style.background = 'grey';
            btnCarritoComprar.style.cursor = 'default';

            btnCarritoCancelar.disabled;
            btnCarritoCancelar.style.color = 'grey';
            btnCarritoCancelar.style.border = 'none';
            btnCarritoCancelar.style.cursor = 'default';
        }

        //ETIQUETAS
        productosAgregados.innerText = cTotal;
        productosTotal.innerText = pTotal;
        spanTotalCarrito.innerText = pTotal;

        //MOSTRAMOS CARRITO
        MostrarCarrito();

        //GUARDAMOS LOCAL STORAGE
        Guardar();

        console.table(productosEnCarrito);

    }
}

const EliminarTodos = (e) => {
    if (e) {
        e.target.parentNode.children[1].innerText = '';
        cTotal -= cTotal;
        pTotal -= pTotal;
        productosTotal.innerText = pTotal;
        productosAgregados.innerText = cTotal;
        spanTotalCarrito.innerText = cTotal;

        productosEnCarrito = {};

        //MOSTRAMOS CARRITO
        MostrarCarrito();

        //GUARDAMOS EN LOCAL STORAGE
        Guardar();

        console.table(productosEnCarrito);
    } 
    
}//27

const BorrarEsc = () => {

    let modal = d.querySelector('.modal');

    window.addEventListener('keydown', (e) => {

        if(e.code === 'Escape'){
            modal.remove();
        }

    });
} //11

const BorrarClickOutside = () => {

    let modal = d.querySelector('.modal');

    window.addEventListener('click', (e) => {

        if(e.target === modal){
            modal.remove();
        }

    });

}//12

function CheckOut() {

    CrearModal();
    BorrarEsc();
    BorrarClickOutside();

    let atrasModal = d.createElement('div');
    atrasModal.setAttribute('class', 'atras-modal');
    div.appendChild(atrasModal);
    atrasModal.style.cursor = 'pointer';

    let aAtras = d.createElement('a');
    aAtras.innerText = 'X';
    atrasModal.appendChild(aAtras);
    atrasModal.addEventListener('click', (a) => {
        modal.remove();
        MostrarCarrito();
    });

    let ventanaModal = d.createElement('div');
    ventanaModal.setAttribute('class', 'ventanaM');
    div.appendChild(ventanaModal);

    let h3 = d.createElement('h3');
    h3.innerText = 'Proceso de compra';
    ventanaModal.appendChild(h3);

    let resumen = d.createElement('div');
    resumen.setAttribute('class', 'resumen');
    ventanaModal.appendChild(resumen);
    let resumenUl = d.createElement('ul');
    resumen.appendChild(resumenUl);

    let resumenProductosTotales = d.createElement('li');
    resumenProductosTotales.innerText = 'Productos: ';
    resumenProductosTotales.innerHTML += cTotal;
    resumenUl.appendChild(resumenProductosTotales);

    let resumenCostosTotales = d.createElement('li');
    resumenCostosTotales.innerText = 'Total: $';
    resumenCostosTotales.innerHTML += pTotal;
    resumenUl.appendChild(resumenCostosTotales);

    let form = d.createElement('form');
    form.setAttribute('action', '#');
    form.setAttribute('method', 'post');
    form.setAttribute('enctype', 'multipart/form-data');
    form.setAttribute('class', 'checkOutForm');
    ventanaModal.appendChild(form);

    let error1 = d.createElement('p');
    error1.style.color = 'red';
    error1.style.fontSize = '0.7em';
    error1.style.marginBottom = '10px';
    let error2 = error1.cloneNode(true);
    let error3 = error1.cloneNode(true);
    let error4 = error1.cloneNode(true);
    let error5 = error1.cloneNode(true);
    let error6 = error1.cloneNode(true);
    let error7 = error1.cloneNode(true);
    let error8 = error1.cloneNode(true);
    let error9 = error1.cloneNode(true);

    form.addEventListener('submit', (e) => {

        e.preventDefault();
        console.log('Enviando formulario...');

        let invalido = false;

        //VALIDANDO DIRECCIÓN
        if(selectProv.value === 'SelectProv'){
            selectProv.style.border = 'red solid 2px';
            error1.innerText = 'Tenes que seleccionar una provincia*';
            selectProv.after(error1);
            selectProv.setCustomValidity('Tenes que seleccionar una provincia')
            invalido = true;
        } 

        if(selectCiudad.value == 'SelectCiudad'){
            selectCiudad.style.border = 'red solid 2px';
            error2.innerText = 'Tenes que seleccionar una ciudad*';
            selectCiudad.after(error2);
            selectCiudad.setCustomValidity('Tenes que seleccionar una ciudad')
            invalido = true;

        } 

        if(inputDirecion.value == ''){
            inputDirecion.style.border = 'red solid 2px';
            error3.innerText = 'Tenes que escribir una dirección*';
            inputDirecion.after(error3);
            inputDirecion.setCustomValidity('Tenes que escribir una dirección')
            invalido = true;
        }

        //VALIDANDO FORMA DE PAGO
        let formasDePago = d.querySelectorAll('[name="formaDePago"]');
        let formaPSeleccionada = null; 
        for (const formaP of formasDePago) {

            if(formaP.checked === true){
    
                formaPSeleccionada = formaP.value;
    
            }
        }
        if (formaPSeleccionada === null) {

            error4.style.borderTop = 'red solid 2px';
            error4.innerText = 'Tenes que elegír un método de pago*';
            error4.style.paddingTop = '5px';
            divPago.appendChild(error4);  
            invalido = true;
          

        } else if (formaPSeleccionada == 'credito') {
            //VALIDANDO PAGO
            if(checkOutTarjeta.innerHTML !== ''){

                if(input1Tarjeta.value == ''){
                    input1Tarjeta.style.border = 'red solid 2px';
                    error5.innerText = 'Tenes que escribir los números frontales de la tarjeta de crédito*';
                    input1Tarjeta.after(error5);
                    input1Tarjeta.setCustomValidity('Tenes que escribir los números frontales de la tarjeta de crédito');
                    invalido = true;

                } 

                if(input2Tarjeta.value == ''){
                    input2Tarjeta.style.border = 'red solid 2px';
                    error6.innerText = 'Tenes que escribir el nombre y apellido como figuran en la tarjeta de crédito*';
                    error6.style.color = 'red';
                    error6.style.fontSize = '0.7em';
                    error6.style.marginBottom = '10px';
                    input2Tarjeta.after(error6);
                    input2Tarjeta.setCustomValidity('Tenes que escribir el nombre y apellido como figuran en la tarjeta de crédito');
                    invalido = true;

                } 

                if(input3Tarjeta.value == ''){
                    input3Tarjeta.style.border = 'red solid 2px';
                    error7.innerText = 'Tenes que escribir tu fecha de nacimiento*';
                    input3Tarjeta.after(error7);
                    input3Tarjeta.setCustomValidity('Tenes que escribir tu fecha de nacimiento');
                    invalido = true;
    
                } 

                if(input4Tarjeta.value == ''){
                    input4Tarjeta.style.border = 'red solid 2px';
                    error8.innerText = 'Tenes que escribir el codigo de seguridad de tres dígitos de tu tarjeta de crédito*';
                    input4Tarjeta.after(error8);
                    input4Tarjeta.setCustomValidity('Tenes que escribir el codigo de seguridad de tres dígitos de tu tarjeta de crédito');
                    invalido = true;

                } 
                if(selectTarjeta.value == 'cantidadCuotas'){
                    selectTarjeta.style.border = 'red solid 2px';
                    error9.innerText = 'Tenes que elegir la cantidad de cuotas que desees*';
                    selectTarjeta.after(error9);
                    selectTarjeta.setCustomValidity('Tenes que elegir la cantidad de cuotas que desees');
                    invalido = true;


                }

            } else {

                invalido = true;

            }
        }

        if (invalido) {
            console.log('El formulario es invalido')
        } else {
            console.log('ES VALIDO');
            modal.remove();
            CompraFinalizada();
            pTotal = 0;
            cTotal = 0;
            productosEnCarrito = {};
            productosAgregados.innerText = cTotal;
            productosTotal.innerText = pTotal;
            localStorage.clear();
            console.table(productosEnCarrito);
        }
    });

    //ENVIO
    let divEnvio = d.createElement('div');
    divEnvio.setAttribute('class', 'checkOutEnvio');
    form.appendChild(divEnvio);

    let h4Envio = d.createElement('h4');
    h4Envio.innerText = 'Envio';
    divEnvio.appendChild(h4Envio);

    let ulEnvio = d.createElement('ul');
    divEnvio.appendChild(ulEnvio);
    ulEnvio.style.width = "100%";

    let liEnvio1 = d.createElement('li');
    ulEnvio.appendChild(liEnvio1);
    
    let selectProv = d.createElement('select');
    selectProv.setAttribute('name', 'provincia');
    liEnvio1.appendChild(selectProv);

    let optionProv1 = d.createElement('option');
    optionProv1.setAttribute('value', 'SelectProv');
    optionProv1.innerText = 'Seleccionar provincia*';
    optionProv1.selected;
    optionProv1.disabled;
    selectProv.appendChild(optionProv1);

    let optionProv2 = d.createElement('option');
    optionProv2.innerText = 'Buenos Aires';
    optionProv2.setAttribute('value', 'buenosAires')
    selectProv.appendChild(optionProv2);

    selectProv.addEventListener('change', (e) => {
        if(selectProv.value == 'Seleccionar provincia*'){
            selectProv.style.border = 'red solid 2px';
        
        } else {
            selectProv.style.border = 'green 2px solid';
            error1.remove();
            selectProv.setCustomValidity('');
        }
    })

    let liEnvio2 = d.createElement('li');
    ulEnvio.appendChild(liEnvio2);

    let selectCiudad = d.createElement('select');
    selectCiudad.setAttribute('name', 'ciudad');
    liEnvio2.appendChild(selectCiudad);

    let optionCiudad1 = d.createElement('option');
    optionCiudad1.setAttribute('value', 'SelectCiudad');
    optionCiudad1.innerText = 'Seleccionar ciudad*';
    optionCiudad1.selected;
    optionCiudad1.disabled;
    selectCiudad.appendChild(optionCiudad1);

    let optionCiudad2 = d.createElement('option');
    optionCiudad2.innerText = 'Ciudad Autónoma de Buenos Aires';
    optionCiudad2.setAttribute('value', 'ciudad')
    selectCiudad.appendChild(optionCiudad2);

    selectCiudad.addEventListener('change', (e) => {
        if(selectCiudad.value == 'Seleccionar ciudad*'){
            selectCiudad.style.border = 'red solid 2px';
            
        } else {
            selectCiudad.style.border = 'green 2px solid';
            error2.remove();
            selectCiudad.setCustomValidity('')

        }
    });

    let liEnvio3 = d.createElement('li');
    ulEnvio.appendChild(liEnvio3);

    let inputDirecion = d.createElement('input');
    inputDirecion.setAttribute('type', 'text');
    inputDirecion.setAttribute('placeholder', 'Dirección de envio*');
    liEnvio3.appendChild(inputDirecion);
    inputDirecion.addEventListener('blur', (e) => {

        if(e){

            if(inputDirecion.value == ''){
                inputDirecion.style.border = 'red solid 2px';
    
            } else {
                inputDirecion.style.border = 'green 2px solid';
                error3.remove();
                inputDirecion.setCustomValidity('');
            }
        }
    })

    //FORMA DE PAGO
    let divPago = d.createElement('div');
    divPago.setAttribute('class', 'checkOutPago');
    form.appendChild(divPago);

    let h4Pago = d.createElement('h4');
    h4Pago.innerText = 'Pago';
    divPago.appendChild(h4Pago);

    let labelPago1 = d.createElement('label');
    divPago.appendChild(labelPago1);
    labelPago1.required;
    let inputPago1 = d.createElement('input');
    inputPago1.setAttribute('type', 'radio');
    inputPago1.setAttribute('name', 'formaDePago');
    inputPago1.setAttribute('value', 'transferencia');
    labelPago1.appendChild(inputPago1);
    labelPago1.innerHTML += ' Transferencia';
    let transfer = d.createElement('div');

    labelPago1.children[0].addEventListener('click', (e) => {

        if(e) {

            //REINICIAR CONTENIDO
            transfer.innerHTML = '';
            checkOutTarjeta.remove();
            if(error4){
                error4.remove();
            }

            //TRANSFERENCIA
            transfer.setAttribute('class', 'checkOutTrans');
            divSubmit.before(transfer);

            let h4Transfer = d.createElement('h4');
            h4Transfer.innerText = 'Datos bancarios';
            transfer.appendChild(h4Transfer);

            let ulTransfer = d.createElement('ul');
            transfer.appendChild(ulTransfer);

            let li1Transfer = d.createElement('li');
            ulTransfer.appendChild(li1Transfer);
            let strongL1Transfer = d.createElement('strong');
            li1Transfer.appendChild(strongL1Transfer);
            strongL1Transfer.innerText = 'Cuenta Corriente';

            let li2Transfer = d.createElement('li');
            li2Transfer.innerText = 'CBU: 1234567890123456789012';
            ulTransfer.appendChild(li2Transfer);
            
            let li3Transfer = d.createElement('li');
            li3Transfer.innerText = 'Alias: AAAA.AAAA.AAAA';
            ulTransfer.appendChild(li3Transfer);

            let li4Transfer = d.createElement('li');
            li4Transfer.innerText = 'Número de cuenta: 123456-7';
            ulTransfer.appendChild(li4Transfer);

            let pTrasnfer = d.createElement('p');
            transfer.appendChild(pTrasnfer);

            let strongPTransfer = d.createElement('strong');
            strongPTransfer.innerText = 'IMPORTANTE: ';
            pTrasnfer.innerHTML += 'Una vez realizada la compra enviar el comprobante  de pago a ';
            pTrasnfer.appendChild(strongPTransfer);

            let aTransfer = d.createElement('a');
            aTransfer.setAttribute('href', 'mailto:email@email.com')
            aTransfer.setAttribute('target', '_blank') 
            aTransfer.innerText = 'email@email.com';
            pTrasnfer.appendChild(aTransfer);
        }

    })

    let labelPago2 = d.createElement('label');
    divPago.appendChild(labelPago2);
    labelPago2.required;
    let inputPago2 = d.createElement('input');
    inputPago2.setAttribute('type', 'radio');
    inputPago2.setAttribute('name', 'formaDePago');
    inputPago2.setAttribute('value', 'credito');
    labelPago2.appendChild(inputPago2);
    labelPago2.innerHTML += ' Tarjeta de crédito';
    let checkOutTarjeta = d.createElement('div');
    let h4Tarjeta = d.createElement('h4');
    let ulTarjeta = d.createElement('ul');
    let li1Tarjeta = d.createElement('li');
    let input1Tarjeta = d.createElement('input');
    let li2Tarjeta = d.createElement('li');
    let input2Tarjeta = d.createElement('input');
    let li3Tarjeta = d.createElement('li');
    let input3Tarjeta = d.createElement('input');
    let li4Tarjeta = d.createElement('li');
    let input4Tarjeta = d.createElement('input');
    let li5Tarjeta = d.createElement('li');
    let selectTarjeta = d.createElement('select');
    let o1SelectTarjeta = d.createElement('option');
    let o2SelectTarjeta = d.createElement('option');


    labelPago2.children[0].addEventListener('click', (e) => {

        if(e) {

            //REINICIAR CONTENIDO
            transfer.remove();
            checkOutTarjeta.innerHTML = '';
            if(error4){
                error4.remove();
            }

            //TARJETA
            checkOutTarjeta.setAttribute('class', 'checkOutTarjeta'); //
            divSubmit.before(checkOutTarjeta);

            checkOutTarjeta.appendChild(h4Tarjeta);
            h4Tarjeta.innerText = 'Datos de la tarjeta';

            checkOutTarjeta.appendChild(ulTarjeta);

            ulTarjeta.appendChild(li1Tarjeta);
            input1Tarjeta.setAttribute('type', 'number');
            input1Tarjeta.setAttribute('placeholder', 'Número de la tarjeta*');
            li1Tarjeta.appendChild(input1Tarjeta);
            input1Tarjeta.addEventListener('blur', (e) => {

                if(e){

                    if(input1Tarjeta.value === ''){
                        input1Tarjeta.style.border = 'red 2px solid';
                        
                    } else {
                        input1Tarjeta.style.border = 'green 2px solid';
                        error5.remove();
                        input1Tarjeta.setCustomValidity('');

                        
                    }
                }
            })

            ulTarjeta.appendChild(li2Tarjeta);
            input2Tarjeta.setAttribute('type', 'text');
            input2Tarjeta.setAttribute('placeholder', 'Nombre y apellido*');
            li2Tarjeta.appendChild(input2Tarjeta);
            input2Tarjeta.addEventListener('blur', (e) => {

                if(e){

                    if(input2Tarjeta.value === ''){
                        input2Tarjeta.style.border = 'red 2px solid';

                    } else {
                        input2Tarjeta.style.border = 'green 2px solid';
                        error6.remove();
                        input2Tarjeta.setCustomValidity('');

                    }
                }
            })

            ulTarjeta.appendChild(li3Tarjeta);
            input3Tarjeta.setAttribute('type', 'text');
            input3Tarjeta.setAttribute('placeholder', 'Fecha de nacimiento*');
            li3Tarjeta.appendChild(input3Tarjeta);
            input3Tarjeta.addEventListener('click', (e) => {

                if(e){
                    input3Tarjeta.type = 'date';
                    input3Tarjeta.addEventListener('blur', (a) => {
                        
                        if(a){

                            if(input3Tarjeta.value === ''){
                                input3Tarjeta.type = 'text';
                                input3Tarjeta.style.border = 'red 2px solid';

                            } else {
                                input3Tarjeta.style.border = 'green 2px solid';
                                error7.remove();
                                input3Tarjeta.setCustomValidity('');
                            }
                        }
                    })
                }
            })

            ulTarjeta.appendChild(li4Tarjeta);
            input4Tarjeta.setAttribute('type', 'number');
            input4Tarjeta.setAttribute('placeholder', 'Código de seguridad*');
            input4Tarjeta.setAttribute('maxlength', '3');
            li4Tarjeta.appendChild(input4Tarjeta);
            input4Tarjeta.addEventListener('blur', (e) => {

                if(e){

                    if(input4Tarjeta.value === '' || input4Tarjeta.value.length !== 3){
                        input4Tarjeta.style.border = 'red 2px solid';

                    } else {
                        input4Tarjeta.style.border = 'green 2px solid';
                        error8.remove();
                        input4Tarjeta.setCustomValidity('');
                    }
                }
            })

            ulTarjeta.appendChild(li5Tarjeta);
            selectTarjeta.setAttribute('name', 'cuotas');
            li5Tarjeta.appendChild(selectTarjeta);
            o1SelectTarjeta.setAttribute('value', 'cantidadCuotas');
            o1SelectTarjeta.disabled;
            o1SelectTarjeta.innerText = 'Cantidad de cuotas*';
            selectTarjeta.appendChild(o1SelectTarjeta);
            o2SelectTarjeta.setAttribute('value', 'C1');
            o2SelectTarjeta.innerText = '1 cuota';
            selectTarjeta.appendChild(o2SelectTarjeta);
            selectTarjeta.addEventListener('change', (e) => {

                if(e){

                    if(selectTarjeta.value === 'cantidadCuotas'){
                        selectTarjeta.style.border = 'red 2px solid';
                        
                    } else {
                        selectTarjeta.style.border = 'green 2px solid';
                        error9.remove();
                        selectTarjeta.setCustomValidity('');

                    }
                }
            })
        }
    })
    
    //BOTONES
    let divSubmit = d.createElement('div');
    form.appendChild(divSubmit);

    let inputSubmit = d.createElement('input');
    inputSubmit.setAttribute('type', 'submit');
    inputSubmit.setAttribute('name', 'Enviar');
    inputSubmit.setAttribute('value', 'Finalizar compra');
    inputSubmit.setAttribute('class', 'btn-carritoComprar');
    inputSubmit.style.border = 'none';
    divSubmit.appendChild(inputSubmit);

    let btnCarritoCancelar = d.createElement('button');
    btnCarritoCancelar.setAttribute('class', 'btn-carritoCancelar');
    btnCarritoCancelar.innerText = 'Cancelar compra';
    btnCarritoCancelar.addEventListener('click', (e) => {
        if (e){
            modal.remove();
        }
    })
    ventanaModal.appendChild(btnCarritoCancelar);

} //546

const CompraFinalizada = function () {

    CrearModal();
    BorrarEsc();
    BorrarClickOutside();


    let ventanaModal = d.createElement('div');
    ventanaModal.setAttribute('class', 'ventanaM');
    div.appendChild(ventanaModal);

    let h3 = d.createElement('h3');
    h3.innerText = 'Compra finalizada';
    ventanaModal.appendChild(h3);

    let graciasP = d.createElement('p');
    graciasP.innerText = '¡Gracias por comprar nuestros productos!';
    graciasP.setAttribute('class', 'gracias');
    ventanaModal.appendChild(graciasP);

    let btnVolverinicio = d.createElement('button');
    btnVolverinicio.setAttribute('class', 'btn-carritoComprar');
    btnVolverinicio.innerText = 'Volver a inicio';
    ventanaModal.appendChild(btnVolverinicio);
    btnVolverinicio.addEventListener('click',(e) => {
        if(e) {
            modal.remove();
        }
    })
} //39

function LocalStorageCarrito() {
    let productosEnCarrito;

    if (localStorage.productosEnCarrito){

        productosEnCarrito = JSON.parse(localStorage.productosEnCarrito);

        cTotal = Object.values(productosEnCarrito).reduce((acum, {cantidad}) => acum+cantidad, 0);
        pTotal = Object.values(productosEnCarrito).reduce((acum, {cantidad, precio}) => acum + cantidad * precio, 0);

        productosAgregados.innerText = cTotal;
        productosTotal.innerText = pTotal;

 
    } else {
        
        productosEnCarrito = {};
        localStorage.productosEnCarrito = JSON.stringify(productosEnCarrito);
    }
    return productosEnCarrito;
} //20

function Guardar () {
    localStorage.productosEnCarrito = JSON.stringify(productosEnCarrito)
} //2

const VerMas = (e) => {

    if (e){

        CrearModal();
        BorrarEsc();
        BorrarClickOutside();

        Datos(e);

        let ventanaProducto = d.createElement('div');
        ventanaProducto.setAttribute('class', 'ventana-producto');
        div.appendChild(ventanaProducto);

        let divImgProductoModal = d.createElement('div');
        divImgProductoModal.setAttribute('class', 'img-produto-modal');
        divImgProductoModal.setAttribute('data', productoA.id)
        ventanaProducto.appendChild(divImgProductoModal );
            
        let figure = d.createElement('figure');
        divImgProductoModal.appendChild(figure);
        let picture = d.createElement('picture');
        figure.appendChild(picture);
        let imgProducto = d.createElement('img');
        picture.appendChild(imgProducto);
        imgProducto.src = productoA.img;
        imgProducto.alt = productoA.imgAlt;

        let txtProductoModal = d.createElement('div');
        txtProductoModal.setAttribute('class', 'txt-producto-modal');
        ventanaProducto.appendChild(txtProductoModal);

        let nombreProducto = d.createElement('h3');
        nombreProducto.innerText = productoA.nombre
        txtProductoModal.appendChild(nombreProducto);
        
        let categoriaProducto = d.createElement('p');
        categoriaProducto.innerText = productoA.subcategoria;
        txtProductoModal.appendChild(categoriaProducto);

        let precioProducto = d.createElement('p');
        txtProductoModal.appendChild(precioProducto);
        precioProducto.innerText = 'Precio: $';
        let numPrecioProducto = d.createElement('span');
        precioProducto.appendChild(numPrecioProducto);
        numPrecioProducto.innerText = productoA.precio;

        let descripcionProductoModal = d.createElement('p');
        descripcionProductoModal.setAttribute('class', 'descripcion-modal');
        descripcionProductoModal.innerText = productoA.descripcion;
        txtProductoModal.appendChild(descripcionProductoModal);

        let btnAgregarModal = CrearEtiqueta('button', {'data-id': e.target.dataset.id, 'data-botones-agregar': 'agregar'}, 'Agregar al carrito', 'click', AgregarProducto);
        txtProductoModal.appendChild(btnAgregarModal);
    }

}//56

const CrearModal = () => {
    modal.innerHTML = '';
    main.appendChild(modal);

    div.innerHTML = '';
    modal.appendChild(div);

    cierreModal.innerHTML = '';
    div.appendChild(cierreModal);


    aCierre.innerHTML = '';
    cierreModal.appendChild(aCierre);
}//13

const ActualizarTotales = () => {

    //PRODUCTOS TOTALES
    cTotal = Object.values(productosEnCarrito).reduce((acum, {cantidad}) => acum+cantidad, 0);

    //COSTOS TOTALES
    pTotal = Object.values(productosEnCarrito).reduce((acum, {cantidad, precio}) => acum + cantidad * precio, 0);
        

}//20

function CrearEtiqueta (tipo = null, atributos = null, txt = null, evento = null, funcion = null){

    let etiqueta = d.createElement(tipo);

    for (const atr in atributos) {

        etiqueta.setAttribute(atr, atributos[atr]);
    }

    etiqueta.innerText = txt;

    etiqueta.addEventListener(evento, funcion);

    return etiqueta;

}//15


//------------------------ EJECUCIÓN
MostrarProductos(productosArray);
