const deleteOne = async (cid, _id, product) => {
    const cartId = document.getElementById('cid').value;

    const url = `http://localhost:8080/api/cart/${cid}/products/${product._id}`;
    const data = {
        cartId: cid,  // Use the parameter cid here
        _id: product._id,
    };

    console.log("cartId", cd, "product", _id);

    try {
        const response = await fetch( url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            
            console.error("Error en eliminar el producto", response.status, response.statusText);
            return;
        }

        const result = await response.json();
        console.log("Eliminar producto:", result);
    } catch (error) {
      
        console.error("Fetch error:", error.message);
    }
};


const addProductToCart = async (cid, _id, product) => {
    const cid = document.getElementById('cid').value;
    // const token = document.getElementById('token').value;

    const url = `http://localhost:8080/api/cart/${cid}/products/${product._id}`;
    const data = {
        cid: cid, 
        _id: product._id,
    };

    console.log("cartId", cid, "product", product._id);

    try {
        const response = await fetch( url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${token}`,        
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
         
            console.error("Error en añadir al producto", response.status, response.statusText);
            return;
        }

        const result = await response.json();
        console.log("Producto añadido al carrito", result);
    } catch (error) {
        console.error("Fetch error:", error.message);
    }
};

const deleteAll = async (cid) => {
    const cartId = document.getElementById('cid').value;

    const url = `http://localhost:8080/api/cart/${cid}`;
    const data = {
        cid: cid,  
    };

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
              
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
           
            console.error("Error en eliminar el carrito", response.status, response.statusText);
            return;
        }

        const result = await response.json();
        console.log(" borrar del carrito", result);
    } catch (error) {
       
        console.error("Fetch error:", error.message);
    }
};