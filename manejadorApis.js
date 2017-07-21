class APIClient {
    constructor() {

    }

    get(url) {
        var misCabeceras = new Headers();
        var miInit = {
            method: 'GET',
            headers: misCabeceras
        };

        var promise = fetch(url, miInit).then(
            (response) => {
                return response.json();
            }
        );
        return promise;
    }

    post(url, datos) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var init = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(datos)
        };

        return fetch(url, init);
    }

    put(url, datos) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var init = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(datos)
        };

        return fetch(url, init);
    }

    delete(url, datos) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var init = {
            method: 'DELETE',
            headers: myHeaders,
            body: JSON.stringify(datos)
        };

        return fetch(url, init);
    }
}

class Comida {
    constructor(id, nombre, tipo, precio, calorias, existencias) {
        this._id = id;
        this._nombre = nombre;
        this._tipo = tipo;
        this._precio = precio;
        this._calorias = calorias;
        this._existencias = existencias;
    }
    pintar(contexto) {
        var fila = document.createElement('tr');
        var celdaNombre = document.createElement('td');
        celdaNombre.innerHTML = this._nombre;
        fila.appendChild(celdaNombre);

        var celdaTipo = document.createElement('td');
        celdaTipo.innerHTML = this._tipo;
        fila.appendChild(celdaTipo);

        var celdaPrecio = document.createElement('td');
        celdaPrecio.innerHTML = this._precio;
        fila.appendChild(celdaPrecio);

        var celdaAcciones = document.createElement('td');

        var detalle = document.createElement('i');
        detalle.id = "btnDetalle";
        detalle.className = "em em-book";
        var attToggleD = document.createAttribute("data-toggle");
        attToggleD.value = "modal";
        detalle.setAttributeNode(attToggleD);
        var attTargetD = document.createAttribute("data-target");
        attTargetD.value = "#divEditar";
        detalle.setAttributeNode(attTargetD);
        celdaAcciones.appendChild(detalle);
        detalle.addEventListener('click', () => {
            contexto.bodyModalDetalle(this._id, this._nombre, this._tipo, this._precio, this._calorias, this._existencias);
        });
        

        var modif = document.createElement('i');
        modif.id = "btnModificar";
        modif.className = "em em-green_book";
        var attToggle = document.createAttribute("data-toggle");
        attToggle.value = "modal";
        modif.setAttributeNode(attToggle);
        var attTarget = document.createAttribute("data-target");
        attTarget.value = "#divEditar";
        modif.setAttributeNode(attTarget);
        celdaAcciones.appendChild(modif);
        modif.addEventListener('click', () => {
            contexto.bodyModal(this._id, this._nombre, this._tipo, this._precio, this._calorias, this._existencias);
        })

        var eliminar = document.createElement('i');
        eliminar.id = "btnEliminar";
        eliminar.className = "em em-x";
        eliminar.addEventListener('click', () =>{
            contexto.eliminar(this._id);
        });
        
        celdaAcciones.appendChild(eliminar);

        fila.appendChild(celdaAcciones);

        return fila;
    }

}

class ComidasApi {
    constructor() {
        this._urlBase = "http://formacion-indra-franlindebl.com/api";
        this._apiClient = new APIClient();
    }
    getComidas() {
        var promise = this._apiClient.get(this._urlBase + '/comidas').then(
            (comidas) => {
                var objComidas = [];
                for (var i = 0; i < comidas.length; i++) {
                    var comida = comidas[i];
                    objComidas.push(new Comida(comida._id, comida.nombre, comida.tipo, comida.precio, comida.calorias, comida.existencias));
                }
                return objComidas;
            });

        return promise;
    }
    addComida(data) {
       
        var promise = this._apiClient.post(this._urlBase + '/comidas/', data).then(
            (response) => {
                console.log(response);
            });
        return promise;

    }
    updateComida(id, datos) {
        console.log(datos);
        var promise = this._apiClient.put(this._urlBase + '/comidas/' + id, datos).then(
            (response) => {
                console.log(response);
            }
        );

        return promise;
    }
    deleteComida(id) {
        var data = {
            _id: id,
        };
        var promise = this._apiClient.delete(this._urlBase + '/comidas/' + id, data).then(
            (response) => {
                console.log(response);
            }
        );
        return promise;
    }
}

class Bebida {
    constructor(id, nombre, esAlcoholica, grados, precio, calorias, existencias) {
        this._id = id;
        this._nombre = nombre;
        this._esAlcoholica = esAlcoholica;
        this._grados = grados;
        this._precio = precio;
        this._calorias = calorias;
        this._existencias = existencias;
    }
    pintar(contexto) {
        var fila = document.createElement('tr');
        var celdaNombre = document.createElement('td');
        celdaNombre.innerHTML = this._nombre;
        fila.appendChild(celdaNombre);

        var celdaAlcohol = document.createElement('td');
        celdaAlcohol.innerHTML = this._esAlcoholica ? 'SI':'NO';
        fila.appendChild(celdaAlcohol);

        var celdaGrados = document.createElement('td');
        celdaGrados.innerHTML = this._grados;
        fila.appendChild(celdaGrados);

        var celdaPrecio = document.createElement('td');
        celdaPrecio.innerHTML = this._precio;
        fila.appendChild(celdaPrecio);

        var celdaAcciones = document.createElement('td');
        
        var detalle = document.createElement('i');
        detalle.id = "btnDetalle";
        detalle.className = "em em-book";
        var attToggleD = document.createAttribute("data-toggle");
        attToggleD.value = "modal";
        detalle.setAttributeNode(attToggleD);
        var attTargetD = document.createAttribute("data-target");
        attTargetD.value = "#divEditar";
        detalle.setAttributeNode(attTargetD);
        celdaAcciones.appendChild(detalle);
        detalle.addEventListener('click', () => {
            contexto.bodyModalDetalle( this._id, this._nombre, this._esAlcoholica, this._grados, this._precio, this._calorias, this._existencias);
        });

        var modif = document.createElement('i');
        modif.id = "btnModificar";
        modif.className = "em em-green_book"; 
        var attToggle = document.createAttribute("data-toggle");
        attToggle.value = "modal";
        modif.setAttributeNode(attToggle);
        var attTarget = document.createAttribute("data-target");
        attTarget.value = "#divEditar";
        modif.setAttributeNode(attTarget);
        celdaAcciones.appendChild(modif);
        modif.addEventListener('click', () => {
            contexto.bodyModal(this._id, this._nombre, this._esAlcoholica, this._grados, this._precio, this._calorias, this._existencias);
        })

        var eliminar = document.createElement('i');
        eliminar.id = "btnEliminar";
        eliminar.className = "em em-x";
        eliminar.addEventListener('click', () =>{
            contexto.eliminar(this._id);
        });
        celdaAcciones.appendChild(eliminar);

        fila.appendChild(celdaAcciones);

        return fila;
    }
}

class BebidasApi {
    constructor() {
        this._urlBase = "http://formacion-indra-franlindebl.com/api";
        this._apiClient = new APIClient();
    }
    getBebidas() {
        var promise = this._apiClient.get(this._urlBase + '/bebidas').then(
            (bebidas) => {

                var objBebidas = [];
                for (var i = 0; i < bebidas.length; i++) {
                    var bebida = bebidas[i];
                    objBebidas.push(new Bebida(bebida._id, bebida.nombre, bebida.esAlcoholica, bebida.grados, bebida.precio, bebida.calorias, bebida.existencias));
                }
                return objBebidas;
            });

        return promise;
    }
    addBebida(data) {
        var promise = this._apiClient.post(this._urlBase + '/bebidas/', data).then(
            (response) => {
                console.log(response);
            });
        return promise;

    }
    updateBebida(id, datos) {
        var promise = this._apiClient.put(this._urlBase + '/bebidas/' + id, datos).then(
            (response) => {
                console.log(response);
            }
        );

        return promise;
    }
    deleteBebida(id) {
        var data = {
            _id: id,
        };
        var promise = this._apiClient.delete(this._urlBase + '/bebidas/' + id, data).then(
            (response) => {
                console.log(response);
            }
        );
        return promise;
    }
}

class UsuariosApi{
    constructor(){
        this._urlBase = "http://formacion-indra-franlindebl.com/api/users";
        this._apiClient = new APIClient();
    }
    getUsuarios(){
        var promise = this._apiClient.get(this._urlBase ).then(
            (usuarios) => {
                return usuarios;
            });

        return promise;
    }
    loginUser(data){
        return this._apiClient.post(this._urlBase + '/login', data);
    }
    getUsuario(){

    }
    addUsuario(email, apellidos, nombre, username, password){
        var data = {
            email: email,
            apellidos: apellidos,
            nombre: nombre,
            username: username,
            password: password
            };
        return this._apiClient.post(this._urlBase, data)
    }
    updateUsuario(){

    }
    deleteUsuario(){

    }
}

var usuariosApi = new UsuariosApi();

