const restaurarviamail = async (paramEmail) =>{
    const token = document.getElementById('token').value;    
    const email = document.getElementById('email').value;
    const url = `http://localhost:8080/api/session/restaurarviamail`;
    const data = {
        email: email,
    };
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,        
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error("Error enviando mail:", response.status, response.statusText);
            return;
        }

        const result = await response.json();
        if (result.success) {
            form.reset(); 
        }
    } catch (error) {
        console.error("Fetch error:", error.message);
    }
}

const restaurar = async () =>{
    const token = document.getElementById('token').value;    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log("token",token);
    const url = `http://localhost:8080/api/session/restaurar`;
    const data = {
        email: email,
        password: password,
    };
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,        
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error("Fallo::", response.status, response.statusText);
            return;
        }

        const result = await response.json();
        if (result.success) {
            form.reset(); 
        }
    } catch (error) {
        console.error("Fetch error:", error.message);
    }
}

const addToCart = async (cartId, _id) => {
    const id = document.getElementById('pid').value;
    const url = `http://localhost:8080/api/cart/${cartId}/products/${id}`;
    const data = {
        cartId: cartId,
        _id: _id,
    };
    console.log("cart", cartId, "product", _id);
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No puedes añadir este producto al carrito.',
            });
            return;
        }
        Swal.fire({
            icon: 'success',
            title: 'Producto añadido',
            text: 'El producto ha sido añadido correctamente',
        });
        const result = await response.json();
        location.reload(true);

    } catch (error) {
        console.error("Fetch error:", error.message);
    }
};


const deleteOne = async (cartId, _id) => {
    const cid = document.getElementById('cartId').value;
    const confirmResult = await Swal.fire({
        title: 'Estas seguro?',
        text: 'Estas a punto de eliminar el producto de tu carrito',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar',
        confirmButtonColor: '#d33', 
        reverseButtons: true
    });

    if (!confirmResult.isConfirmed) {
        return; 
    }

    const url = `http://localhost:8080/api/cart/${cid}/products/${_id}`;
    const data = {
        cartId: cartId,  
        _id: _id,
    };


    try {
        const response = await fetch( url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error("Error en eliminar el producto del carrito", response.status, response.statusText);
            return;
        }
        Swal.fire({
            icon: 'success',
            title: 'Producto eliminado',
            text: 'El producto ha sido eliminado correctamente del carrito',
        });

        const result = await response.json();
        location.reload(true);

    } catch (error) {
        console.error("Fetch error:", error.message);
    }
};


const addProductToCart = async (cartId, _id) => {
    const cid = document.getElementById('cartId').value;

    const url = `http://localhost:8080/api/cart/${cid}/products/${_id}`;
    const data = {
        cartId: cid, 
        _id: _id,
    };

    try {
        const response = await fetch( url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No puedes añadir este producto',
            });
            return;
        }
        Swal.fire({
            icon: 'success',
            title: 'Producto añadido',
            text: 'El producto ha sido añadido correctamente',
        });
        const result = await response.json();
        location.reload(true);

    } catch (error) {
        console.error("Fetch error:", error.message);
    }
};

const deleteAll = async (cartId) => {
    const confirmResult = await Swal.fire({
        title: 'Estas seguro?',
        text: 'Estas a punto de elminar todos los productos del carrito',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar todo',
        cancelButtonText: 'No, cancelar',
        confirmButtonColor: '#d33', 
        reverseButtons: true
    });

    if (!confirmResult.isConfirmed) {
        return; 
    }
    const url = `http://localhost:8080/api/cart/${cartId}`;
    const data = {
        cartId: cartId,  
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
            console.error("Error en eliminar:", response.status, response.statusText);
            return;
        }
        Swal.fire({
            icon: 'success',
            title: 'Producto eliminado',
            text: 'El producto ha sido eliminado completamente del carrito',
        });
        const result = await response.json();
        location.reload(true);

    } catch (error) {
        console.error("Fetch error:", error.message);
    }
};

const createOneProduc = async () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const code = document.getElementById('code').value;
    const category = document.getElementById('category').value;
    const thumbail = document.getElementById('thumbail').value;
    const token = document.getElementById('token').value;
    const data = {
        title: title,
        description: description,
        price: price,
        stock: stock,
        code: code,
        category: category,
        thumbail: thumbail
    };
    const url = 'http://localhost:8080/api/products/';
    try {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,        
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        console.error("Error en añadir al producto: ", response.status, response.statusText);
        return;
    }
    Swal.fire({
        icon: 'success',
        title: 'Producto creado',
        text: 'El producto ha sido creado correctamente',
        confirmButtonColor: '#28a745'
    });
    const result = await response.json();
    location.reload(true);

    } catch (error) {
    console.error("Fetch error:", error.message);
}
};

const deleteUser = async (users1) => {
    const usersOld = JSON.parse(document.getElementById('users1').value);
    const confirmResult = await Swal.fire({
        title: 'Estas seguro?',
        text: 'Estas por eliminar el usuario',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar',
        confirmButtonColor: '#d33', 
        reverseButtons: true
    });

    if (!confirmResult.isConfirmed) {
        return; 
    }
    const url = `http://localhost:8080/api/users`;
    data = {
        users: usersOld
    }
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
            if (!response.ok) {
                console.error("Error en eliminacion de usuario:", response.status, response.statusText);
                return;
            }
            Swal.fire({
                icon: 'success',
                title: 'Usuario eliminado',
                text: 'El usuario ha sido eliminado correctamente',
            });
            const result = await response.json();
        
        } catch (error) {
            console.error("Fetch error:", error.message);        
        }
    }


const deleteOneProdAll = async () => {
    const id = document.getElementById('id').value;
    const token = document.getElementById('token').value;
    const confirmResult = await Swal.fire({
        title: 'Estas seguro?',
        text: 'Estas a punto de eliminar este producto',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar',
        confirmButtonColor: '#d33', 
        reverseButtons: true
    });

    if (!confirmResult.isConfirmed) {
        return; 
    }
    const url = `http://localhost:8080/api/products/${id}`;
    try {
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,        
        },
        body: JSON.stringify({ id: id }),
    });
    if (!response.ok) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No puedes eliminar este producto ya que no existe',
        });
        // console.error("Error en eliminacion del producto:", response.status, response.statusText);
        return;
    }
    Swal.fire({
        icon: 'success',
        title: 'Producto eliminado',
        text: 'El producto ha sido eliminado correctamente',
    });
    const result = await response.json();
    location.reload(true);
    } catch (error) {
        console.error("Fetch error:", error.message);        
    }
}

async function changeUserRole(uid) {
    const email = document.getElementById('email').value;
    const userid = document.getElementById('uid').value;
    const selectedRole = document.getElementById('role').value;
    try {
        const response = await fetch(`/api/users/premium/${uid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role: selectedRole , email: email }),
        });

        if (!response.ok) {
            console.error('Error en cambio de tipo de usuario:', response.status, response.statusText);
            return;
        }
        Swal.fire({
            icon: 'success',
            title: 'Rol cambiado',
            text: 'Se ha cambiado el rol correctamente',
            confirmButtonColor: '#28a745'
        });
        const result = await response.json();
        location.reload(true);

    } catch (error) {
        console.error('Request error:', error.message);
    }
}
async function changeRole(uid) {
    const email = document.getElementById('email').value;
    const userid = document.getElementById('uid').value;
    const selectedRole = document.getElementById('role').value;
    try {
        const response = await fetch(`/api/users/premium/${userid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role: selectedRole , email: email }),
        });
        if (!response.ok) {
            console.error('Error cambiando tipo de usuario:', response.status, response.statusText);
            return;
        }
        Swal.fire({
            icon: 'success',
            title: 'Rol cambiado',
            text: 'Se ha cambiado el rol correctamente',
            confirmButtonColor: '#28a745'
        });   
        const result = await response.json();
        location.reload(true);

    } catch (error) {
        console.error('Request error:', error.message);
    }
}
async function buy (cartId) {
    const token = document.getElementById('token').value;
    try {
        const response = await fetch(`/api/cart/${cartId}/purchase`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,       
            },
        });

        if (!response.ok) {
            console.error('Error', response.status, response.statusText);
            return;
        }
        if (result.availableProducts && result.availableProducts.length > 0) {
            window.location.href = "/api/views/ticket";
        } else {
            console.error('Compra no exitosa', result.unavailableProducts);
        };
        const result = await response.json();
    } catch (error) {
        console.error('Request error:', error.message);
    }   
}


async function pay () {
    try {
        const response = await fetch(`/api/payments/payments-intents`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response, "front");
        if (!response.ok) {
            console.error('Error', response.status, response.statusText);
            return;
        }
        const result = await response.json();
    } catch (error) {
        console.error('Request error:', error.message);
    }   
}