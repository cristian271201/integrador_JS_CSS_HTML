/**STORE */

import { setProductoActivo } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localStorage";
import { openModal } from "./modal";


export const handleGetProductsToStore = () => {
    const products = handleGetProductLocalStorage();
    handleRenderList(products);
};

//filtrar y renderizar la seccion y sus elementos
export const handleRenderList = (productosIn) => {
    //filtrado de arrays por categoría
    const burguers = productosIn.filter((el) => el.categories === "Hamburguesas");
    const papas = productosIn.filter((el) => el.categories === "Papas");
    const gaseosas = productosIn.filter((el) => el.categories === "Gaseosas");
    //renderizar elementos de la seccion
    const renderProductGroup = (productos, title) => {
        if (productos.length > 0) {
            const productosHTML = productos.map((producto, index) => {
                return `<div 
                class='containerTargetitem'
                id = 'product-${producto.categories}-${index}'>
                <div>
                <img src='${producto.imagen}'/>
                <div>
                <h2>${producto.nombre}</h2>
                </div>
                <div class='targetProps'>
                <p><b>Precio:</b> $ ${producto.precio}</p>
                </div>


                </div>
                </div>
                `;
            });
            //retorna la seccion con elementos dentro
            return `
            <section class='sectionStore'>
            <div clas='containerTittleSection'>
            <h3>${title}</h3>
            </div>
            
            <div class='containerProductStore'>
            ${productosHTML.join("")}
            </div>           
            
            </section>
            `;
        } else {
            return "";
        }
    };
    //renderizar cada producto

    const appContainer = document.getElementById("storeContainer");
    appContainer.innerHTML = `
    ${renderProductGroup(burguers, "Hamburguesas")}
    ${renderProductGroup(papas, "Papas")}
    ${renderProductGroup(gaseosas, "Gaseosas")}    
    `;

    //añaden los eventos
    const addEvents = (productsIn) => {
        if (productsIn) {
            productsIn.forEach((element, index) => {
                const productContainer = document.getElementById(`product-${element.categories}-${index}`);
                productContainer.addEventListener("click", () => {
                    setProductoActivo(element);
                    openModal();
                });
            });
        }
    };
    addEvents(burguers);
    addEvents(papas);
    addEvents(gaseosas);
};