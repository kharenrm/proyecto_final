class Page {
    constructor(url) {
        this._url = url;
        this._contenedor = document.getElementById('container');
    }
    pintar() {

    }
}

class InnerPage extends Page {
    constructor(url) {
        super(url);
    }

    pintarHeader() {
        var header = document.createElement('header');
        header.id = "header";
        header.className = "header";
        return header;
    }

    pintarBody() {
        var bodyContainer = document.createElement('div');
        bodyContainer.id = "bodyContainer";
        bodyContainer.className = "bodyContainer";
        return bodyContainer;
    }

    pintarFooter() {
        var footer = document.createElement('footer');
        footer.id = "footer";
        footer.className = "footer";
        return footer;
    }
}

class Login extends Page {
    constructor(navController, apiControl) {
        super('/login');
        this._navController = navController;
        this._apiControl = apiControl;
    }
    pintar() {
        var divLogin = document.createElement('div');
        divLogin.className = "col-sm-12 divLogin";
        divLogin.id = "divLogin";
        var form = document.createElement('form');
        form.className = "form-horizontal col-sm-4 formLogin";
        var divFormGroup = document.createElement('div');
        divFormGroup.className = "form-group grupo";
        var usuario = document.createElement('input');
        usuario.id = "user";
        usuario.placeholder = "Usuario";
        usuario.className = "form-control";
        var pass = document.createElement('input');
        pass.id = "password";
        pass.type = "password";
        pass.placeholder = "Password";
        pass.className = "form-control";
        var check = document.createElement('input');
        check.type = "checkbox";
        check.id = "remember";
        check.addEventListener('click', () =>{
            this.olvidarUser();
        });
        var label = document.createElement('label');
        label.innerHTML = "Recordar password";
        label.appendChild(check);
        var boton = document.createElement('button');
        boton.className = "btn btn-primary";
        boton.innerHTML = "Acceder";
        boton.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.validaUser();
        })

        divFormGroup.appendChild(usuario);
        divFormGroup.appendChild(pass);
        divFormGroup.appendChild(label);
        divFormGroup.appendChild(boton);
        form.appendChild(divFormGroup);
        divLogin.appendChild(form);

        this._contenedor.appendChild(divLogin);

        if(this.hayUser()){
            check.checked = true;
            var datos = JSON.parse(localStorage.getItem('user'));
            usuario.value = datos.username;
            pass.value = datos.password;
        }
    }
    validaUser(){
        console.log('validaUser');
        let data = {
            username: document.getElementById('user').value,
            password: document.getElementById('password').value
        }
                      
        this._apiControl.loginUser(data).then(
            (response) => {
                if(response.status == 200){
                    if(document.getElementById('remember').checked){
                        this.recordarUser();
                    }
                    this._navController.navigateToUrl('/home')
                } else {
                    var alert = document.createElement('div')
                        alert.className = "alert alert-danger alerta";
                        alert.innerHTML = response.statusText;
                        document.getElementById('divLogin').appendChild(alert);
                        setTimeout(() =>{
                            alert.parentNode.removeChild(alert);
                        }, 3000);
                }
            });
    }

    hayUser(){
        return localStorage.getItem('user');
    }

    recordarUser(){
        var dataUsuario = {
            username: document.getElementById('user').value,
            password: document.getElementById('password').value
        }
        localStorage.setItem('user', JSON.stringify(dataUsuario));
    }

    olvidarUser(){
        if(this.hayUser()){
            localStorage.removeItem('user');
            document.getElementById('user').value = '';
            document.getElementById('password').value = '';
        } 
    }
}

class CuentaUsuario extends Page {
    constructor() {
        super('/nuevacuenta');
    }

}

class PerfilUsuario extends Page {
    constructor() {
        super('/perfil');
    }
}

class Home extends InnerPage {
    constructor(navController, comidasApi, bebidasApi) {
        super('/home');
        this._navController = navController;
        this._comidasApi = comidasApi;
        this._bebidasApi = bebidasApi;
    }
    pintar() {
        this._contenedor.innerHTML = '';
        var divContent = document.createElement('div');
        divContent.class = "divContent";
        //pinta el header
        var header = this.pintarHeader();
        var btnHome = document.createElement('button');
        btnHome.id = "home";
        btnHome.innerHTML = "Home";
        btnHome.className ="boton_menu";
        btnHome.addEventListener('click', () => {
            this._navController.navigateToUrl('/home');
        });
        header.appendChild(btnHome);

        var btnComidas = document.createElement('button');
        btnComidas.id = "comidas";
        btnComidas.className = "boton_menu";
        btnComidas.innerHTML = "Gestion Comidas";
        btnComidas.addEventListener('click', () => {
            this._navController.navigateToUrl('/comidas');
        });
        header.appendChild(btnComidas);

        var btnBebidas = document.createElement('button');
        btnBebidas.id = "bebidas";
        btnBebidas.className = "boton_menu";
        btnBebidas.innerHTML = "Gestion Bebidas";
        btnBebidas.addEventListener('click', () => {
            this._navController.navigateToUrl('/bebidas');
        });
        header.appendChild(btnBebidas);
        divContent.appendChild(header);

        //pinta el body
        var body = this.pintarBody();
            body.innerHTML = "Logeado!";
            divContent.appendChild(body);
        this._contenedor.appendChild(divContent);
    }
    
}

class GestionComidas extends InnerPage {
    constructor(navController, apiControl) {
        super('/comidas');
        this._navController = navController;
        this._apiControl = apiControl;
        this._comidas = [];
    }
    pintar() {
        this._contenedor.innerHTML = '';
        var divContent = document.createElement('div');
        divContent.class = "divContent";

        //pinta el header
        var header = this.pintarHeader();
        var btnHome = document.createElement('button');
        btnHome.id = "home";
        btnHome.className = "boton_menu";
        btnHome.innerHTML = "Home";
        btnHome.addEventListener('click', () => {
            this._navController.navigateToUrl('/home');
        });
        header.appendChild(btnHome);

        var btnComidas = document.createElement('button');
        btnComidas.id = "comidas";
        btnComidas.className = "boton_menu";
        btnComidas.innerHTML = "Gestion Comidas";
        btnComidas.addEventListener('click', () => {
            this._navController.navigateToUrl('/comidas');
        });
        header.appendChild(btnComidas);

        var btnBebidas = document.createElement('button');
        btnBebidas.id = "bebidas";
        btnBebidas.className = "boton_menu";
        btnBebidas.innerHTML = "Gestion Bebidas";
        btnBebidas.addEventListener('click', () => {
            this._navController.navigateToUrl('/bebidas');
        });
        header.appendChild(btnBebidas);
        divContent.appendChild(header);

        //pinta el body
        var bodyContainer = this.pintarBody();
        var divTablaResp = document.createElement('div');
        divTablaResp.className = "table-responsive";
        var cabecera = '<thead><th colspan="4" class="titulo">Listado Comidas'+
        '<i id="btnNuevo" class="em em-heavy_plus_sign" data-toggle="modal" data-target="#divEditar"></i></th>' +
            '<tr><th>Nombre</th><th>Tipo</th><th>Precio</th><th>Acciones</th></tr></thead>';
        var tabla = document.createElement('table');
        tabla.innerHTML = cabecera;
        tabla.className = "table table-striped";
        tabla.id = "tabla_comidas";
        var tbody = document.createElement('tbody');
        tbody.id = "bodyFilas";
        tabla.appendChild(tbody);
        divTablaResp.appendChild(tabla);

        this._apiControl.getComidas().then(
            (comidas) => {
                for (var i = 0; i < comidas.length; i++) {
                    let comida = comidas[i];
                    this._comidas.push(comida);
                    let row = comida.pintar(this);
                    tbody.appendChild(row);
                }
                divContent.appendChild(divTablaResp);
                divContent.appendChild(this.pintarModal());
                this._contenedor.appendChild(divContent);

                 var btnNuevo = document.getElementById('btnNuevo');
                    btnNuevo.addEventListener('click', () => {
                        this.bodyModalNuevo();
                    });
            }
        );
    }

    pintarModal() {
        var divEditar = document.createElement("div");
        divEditar.id = "divEditar";
        divEditar.className = "modal fade";
        divEditar.role = "dialog";

        var divModal = document.createElement('div');
        divModal.className = "modal-dialog";
        divEditar.appendChild(divModal);

        var divModalContent = document.createElement('div');
        divModalContent.className = "modal-content";
        divModal.appendChild(divModalContent);

        var divModalHeader = document.createElement('div');
        divModalHeader.className = "modal-header";
        var btnClose = document.createElement('button');
        btnClose.className = "close";
        btnClose.innerHTML = "&times";
        var attDismiss = document.createAttribute("data-dismiss");
        attDismiss.value = "modal";
        btnClose.setAttributeNode(attDismiss);

        divModalHeader.appendChild(btnClose);
        var h4 = document.createElement('h4');
        h4.className = "modal-title"
        h4.id ="modal-title";
        divModalHeader.appendChild(h4);
        divModalContent.appendChild(divModalHeader);


        var divModalBody = document.createElement('div');
        divModalBody.className = "modal-body";
        divModalBody.id = "modal-body";
        divModalContent.appendChild(divModalBody);

        var divModalFooter = document.createElement('div');
        divModalFooter.className = "modal-footer";
        divModalContent.appendChild(divModalFooter);

        return divEditar;
    }

    bodyModal(id, nombre, tipo, precio, calorias, existencias){
        var body = document.getElementById('modal-body');
            body.innerHTML = '';
        document.getElementById('modal-title').innerHTML = "Modificar comida";
            
        var formulario = document.createElement('form');
        var inputNombre = document.createElement('input');
            inputNombre.id = "inputNombre";
            inputNombre.value = nombre;
        var inputTipo = document.createElement('input');
            inputTipo.id = "inputTipo";
            inputTipo.value = tipo;
        var inputPrecio = document.createElement('input');
            inputPrecio.id = "inputPrecio";
            inputPrecio.value = precio;
        var inputCalorias = document.createElement('input');
            inputCalorias.id = "inputCalorias";
            inputCalorias.value = calorias;
        var inputExistencias = document.createElement('input');
            inputExistencias.id = "inputExistencias";
            inputExistencias.value = existencias;

        var btnGuardar = document.createElement('button');
            btnGuardar.className = "btn btn-default";
            btnGuardar.innerHTML = "Guardar";
        var attDismissFooter = document.createAttribute("data-dismiss");
            attDismissFooter.value = "modal";
            btnGuardar.setAttributeNode(attDismissFooter);
            btnGuardar.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.modificar(id);
            });
            
            formulario.appendChild(inputNombre);
            formulario.appendChild(inputTipo);
            formulario.appendChild(inputPrecio);
            formulario.appendChild(inputCalorias);
            formulario.appendChild(inputExistencias);
            formulario.appendChild(btnGuardar);

            body.appendChild(formulario);
    }

    bodyModalDetalle(id, nombre, tipo, precio, calorias, existencias){
        var body = document.getElementById('modal-body');

        document.getElementById('modal-title').innerHTML = "Detalle comida";
            body.innerHTML = '<label>Nombre: </label>' + nombre +
                             '<label>Tipo: </label>' + tipo +
                             '<label>Precio: </label>' + precio +
                             '<label>Calorías: </label>' + calorias +
                             '<label>Existencias: </label>' + existencias;
    }

    bodyModalNuevo(){
        var body = document.getElementById('modal-body');
            body.innerHTML = '';
        document.getElementById('modal-title').innerHTML = "Modificar bebida";
            
        var formulario = document.createElement('form');
        var inputNombre = document.createElement('input');
            inputNombre.id = "inputNombreN";
            inputNombre.placeholder = "Nombre";

        var inputTipo = document.createElement('input');
            inputTipo.id = "inputTipoN";
            inputTipo.placeholder = "Tipo";
            
        var inputPrecio = document.createElement('input');
            inputPrecio.id = "inputPrecioN";
            inputPrecio.placeholder = "Precio";
            
        var inputCalorias = document.createElement('input');
            inputCalorias.id = "inputCaloriasN";
            inputCalorias.placeholder = "Calorias";
            
        var inputExistencias = document.createElement('input');
            inputExistencias.id = "inputExistenciasN";
            inputExistencias.placeholder = "Existencias";
            

        var btnGuardar = document.createElement('button');
            btnGuardar.className = "btn btn-default";
            btnGuardar.innerHTML = "Guardar";
        var attDismissFooter = document.createAttribute("data-dismiss");
            attDismissFooter.value = "modal";
            btnGuardar.setAttributeNode(attDismissFooter);
            btnGuardar.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.agregar();
            });
            
            formulario.appendChild(inputNombre);
            formulario.appendChild(inputTipo);
            formulario.appendChild(inputPrecio);
            formulario.appendChild(inputCalorias);
            formulario.appendChild(inputExistencias);
            formulario.appendChild(btnGuardar);

            body.appendChild(formulario);
    }

    eliminar(id) {
        this._apiControl.deleteComida(id).then(
            () => {
                console.log("Eliminado!");
                this.pintar();
            }
        );
    }
    //id, nombre, tipo, precio, calorias, existencias
    modificar(id) {
        console.log(id);
        var data = {};

        data.nombre = document.getElementById('inputNombre').value;
        data.tipo = document.getElementById('inputTipo').value;
        data.precio = document.getElementById('inputPrecio').value;
        data.calorias = document.getElementById('inputCalorias').value
        data.existencias = document.getElementById('inputExistencias').value;

        this._apiControl.updateComida(id, data).then(
            (response) => {
                this.pintar();
            });
    }

     agregar(){
        var data = {};

        data.nombre = document.getElementById('inputNombreN').value;
        data.tipo = document.getElementById('inputTipoN').value;
        data.precio = document.getElementById('inputPrecioN').value;
        data.calorias = document.getElementById('inputCaloriasN').value
        data.existencias = document.getElementById('inputExistenciasN').value;

        this._apiControl.addComida(data).then(
            () => {
                this.pintar();
            });
    }
}

class GestionBebidas extends InnerPage {
    constructor(navController, apiControl) {
        super('/bebidas');
        this._navController = navController;
        this._apiControl = apiControl;
        this._bebidas = [];
    }
    pintar() {
        this._contenedor.innerHTML = '';
        var divContent = document.createElement('div');
        divContent.class = "divContent";

        //pinta el header
        var header = this.pintarHeader();
        var btnHome = document.createElement('button');
        btnHome.id = "home";
        btnHome.className = "boton_menu";
        btnHome.innerHTML = "Home";
        btnHome.addEventListener('click', () => {
            this._navController.navigateToUrl('/home');
        });
        header.appendChild(btnHome);

        var btnComidas = document.createElement('button');
        btnComidas.id = "comidas";
        btnComidas.className = "boton_menu";
        btnComidas.innerHTML = "Gestion Comidas";
        btnComidas.addEventListener('click', () => {
            this._navController.navigateToUrl('/comidas');
        });
        header.appendChild(btnComidas);

        var btnBebidas = document.createElement('button');
        btnBebidas.id = "bebidas";
        btnBebidas.className = "boton_menu";
        btnBebidas.innerHTML = "Gestion Bebidas";
        btnBebidas.addEventListener('click', () => {
            this._navController.navigateToUrl('/bebidas');
        });
        header.appendChild(btnBebidas);
        divContent.appendChild(header);

        //pinta el body
        var bodyContainer = this.pintarBody();
        var divTablaResp = document.createElement('div');
        divTablaResp.className = "table-responsive";
        var cabecera = '<thead><th colspan="5" class="titulo">Listado Bebidas' + 
        '<i id="btnNuevo" class="em em-heavy_plus_sign" data-toggle="modal" data-target="#divEditar"></i></th>' +
            '<tr><th>Nombre</th><th>Alcohol</th><th>Grados</th><th>Precio</th><th>Acciones</th></tr></thead>';
        var tabla = document.createElement('table');
        tabla.innerHTML = cabecera;
        tabla.className = "table table-striped";
        tabla.id = "tabla_comidas";
        var tbody = document.createElement('tbody');
        tbody.id = "bodyFilas";
        tabla.appendChild(tbody);
        divTablaResp.appendChild(tabla);

        this._apiControl.getBebidas().then(
            (bebidas) => {
                for (var i = 0; i < bebidas.length; i++) {
                    let bebida = bebidas[i];
                    this._bebidas.push(bebida);
                    let row = bebida.pintar(this);
                    tbody.appendChild(row);
                }
                divContent.appendChild(divTablaResp);
                divContent.appendChild(this.pintarModal());
                this._contenedor.appendChild(divContent);
                var btnNuevo = document.getElementById('btnNuevo');
                    btnNuevo.addEventListener('click', () => {
                        this.bodyModalNuevo();
                    });
            }
        );

    }

    pintarModal() {
        var divEditar = document.createElement("div");
        divEditar.id = "divEditar";
        divEditar.className = "modal fade";
        divEditar.role = "dialog";

        var divModal = document.createElement('div');
        divModal.className = "modal-dialog";
        divEditar.appendChild(divModal);

        var divModalContent = document.createElement('div');
        divModalContent.className = "modal-content";
        divModal.appendChild(divModalContent);

        var divModalHeader = document.createElement('div');
        divModalHeader.className = "modal-header";
        var btnClose = document.createElement('button');
        btnClose.className = "close";
        btnClose.innerHTML = "&times";
        var attDismiss = document.createAttribute("data-dismiss");
        attDismiss.value = "modal";
        btnClose.setAttributeNode(attDismiss);

        divModalHeader.appendChild(btnClose);
        var h4 = document.createElement('h4');
        h4.className = "modal-title"
        h4.id ="modal-title";
        divModalHeader.appendChild(h4);
        divModalContent.appendChild(divModalHeader);


        var divModalBody = document.createElement('div');
        divModalBody.className = "modal-body";
        divModalBody.id = "modal-body";
        divModalContent.appendChild(divModalBody);

        var divModalFooter = document.createElement('div');
        divModalFooter.className = "modal-footer";
        divModalContent.appendChild(divModalFooter);

        return divEditar;
    }

    bodyModal(id, nombre, esAlcoholica, grados, precio, calorias, existencias){
        var body = document.getElementById('modal-body');
            body.innerHTML = '';
        document.getElementById('modal-title').innerHTML = "Modificar bebida";
            
        var formulario = document.createElement('form');
        var inputNombre = document.createElement('input');
            inputNombre.id = "inputNombre";
            inputNombre.value = nombre;
        var inputAlcoholica = document.createElement('input');
            inputAlcoholica.id = "inputAlcoholica";
            inputAlcoholica.value = esAlcoholica;
        var inputGrados = document.createElement('input');
            inputGrados.id = "inputGrados";
            inputGrados.value = grados;
        var inputPrecio = document.createElement('input');
            inputPrecio.id = "inputPrecio";
            inputPrecio.value = precio;
        var inputCalorias = document.createElement('input');
            inputCalorias.id = "inputCalorias";
            inputCalorias.value = calorias;
        var inputExistencias = document.createElement('input');
            inputExistencias.id = "inputExistencias";
            inputExistencias.value = existencias;

        var btnGuardar = document.createElement('button');
            btnGuardar.className = "btn btn-default";
            btnGuardar.innerHTML = "Guardar";
        var attDismissFooter = document.createAttribute("data-dismiss");
            attDismissFooter.value = "modal";
            btnGuardar.setAttributeNode(attDismissFooter);
            btnGuardar.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.modificar(id);
            });
            
            formulario.appendChild(inputNombre);
            formulario.appendChild(inputAlcoholica);
            formulario.appendChild(inputGrados);
            formulario.appendChild(inputPrecio);
            formulario.appendChild(inputCalorias);
            formulario.appendChild(inputExistencias);
            formulario.appendChild(btnGuardar);

            body.appendChild(formulario);
    }
    //id, nombre, esAlcoholica, grados, precio, calorias, existencias
    bodyModalDetalle(id, nombre, esAlcoholica, grados, precio, calorias, existencias){
        var body = document.getElementById('modal-body');
        var alcohol = esAlcoholica ? 'SI' : 'NO';
        document.getElementById('modal-title').innerHTML = "Detalle bebida";
            body.innerHTML = '<label>Nombre: </label>' + nombre +
                             '<label>Alcohol: </label>' + alcohol +
                             '<label>Grados: </label>' + grados +
                             '<label>Precio: </label>' + precio +
                             '<label>Calorías: </label>' + calorias +
                             '<label>Existencias: </label>' + existencias;
    }

    bodyModalNuevo(){
        var body = document.getElementById('modal-body');
            body.innerHTML = '';
        document.getElementById('modal-title').innerHTML = "Modificar bebida";
            
        var formulario = document.createElement('form');
        var inputNombre = document.createElement('input');
            inputNombre.id = "inputNombreN";
            inputNombre.placeholder = "Nombre";

        var inputAlcoholica = document.createElement('input');
            inputAlcoholica.id = "inputAlcoholicaN";
            inputAlcoholica.placeholder = "Alcohol";
            
        var inputGrados = document.createElement('input');
            inputGrados.id = "inputGradosN";
            inputGrados.placeholder = "Grados";
            
        var inputPrecio = document.createElement('input');
            inputPrecio.id = "inputPrecioN";
            inputPrecio.placeholder = "Precio";
            
        var inputCalorias = document.createElement('input');
            inputCalorias.id = "inputCaloriasN";
            inputCalorias.placeholder = "Calorias";
            
        var inputExistencias = document.createElement('input');
            inputExistencias.id = "inputExistenciasN";
            inputExistencias.placeholder = "Existencias";
            

        var btnGuardar = document.createElement('button');
            btnGuardar.className = "btn btn-default";
            btnGuardar.innerHTML = "Guardar";
        var attDismissFooter = document.createAttribute("data-dismiss");
            attDismissFooter.value = "modal";
            btnGuardar.setAttributeNode(attDismissFooter);
            btnGuardar.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.agregar();
            });
            
            formulario.appendChild(inputNombre);
            formulario.appendChild(inputAlcoholica);
            formulario.appendChild(inputGrados);
            formulario.appendChild(inputPrecio);
            formulario.appendChild(inputCalorias);
            formulario.appendChild(inputExistencias);
            formulario.appendChild(btnGuardar);

            body.appendChild(formulario);
    }

    eliminar(id) {
        this._apiControl.deleteBebida(id).then(
            () => {
                console.log("Eliminado!");
                this.pintar();
            }
        );
    }
    //id, nombre, tipo, precio, calorias, existencias
    modificar(id) {
        var data = {};

        data.nombre = document.getElementById('inputNombre').value;
        data.esAlcoholica = document.getElementById('inputAlcoholica').value;
        data.grados = document.getElementById('inputGrados').value;
        data.precio = document.getElementById('inputPrecio').value;
        data.calorias = document.getElementById('inputCalorias').value
        data.existencias = document.getElementById('inputExistencias').value;

        this._apiControl.updateBebida(id, data).then(
            (response) => {
                this.pintar();
            });
    }

    agregar(){
        var data = {};

        data.nombre = document.getElementById('inputNombreN').value;
        data.esAlcoholica = document.getElementById('inputAlcoholicaN').value;
        data.grados = document.getElementById('inputGradosN').value;
        data.precio = document.getElementById('inputPrecioN').value;
        data.calorias = document.getElementById('inputCaloriasN').value
        data.existencias = document.getElementById('inputExistenciasN').value;

        this._apiControl.addBebida(data).then(
            () => {
                this.pintar();
            });
    }
}


class NavigationController {
    constructor() {
        this.pages = [];
    }
    addPage(pagina) {
        this.pages.push(pagina);
    }
    navigateToUrl(url) {
        for (var i = 0; i < this.pages.length; i++) {
            if (this.pages[i]._url == url) {
                history.pushState(null, null, url);
                this.pages[i].pintar();
            }
        }

    }
    navigateToHome() {
        for (var i = 0; i < this.pages.length; i++) {
            console.log(this.pages[i]._url);
            if (this.pages[i]._url == '/login') {
                history.pushState(null, null, '/login');
                this.pages[i].pintar();
            }
        }
    }
}

class App {
    constructor() {
        this._navControl = new NavigationController();
        this._comidasApi = new ComidasApi();
        this._bebidasApi = new BebidasApi();
        this._authApi = new UsuariosApi();
    }
    init() {
        this._navControl.addPage(new Login(this._navControl, this._authApi));
        this._navControl.addPage(new Home(this._navControl, this._comidasApi, this._bebidasApi));
        this._navControl.addPage(new GestionComidas(this._navControl, this._comidasApi));
        this._navControl.addPage(new GestionBebidas(this._navControl, this._bebidasApi));
        
        this._navControl.pages[0].pintar();
    }
}

let app = null;

window.onload = () => {
    app = new App();
    app.init();
}