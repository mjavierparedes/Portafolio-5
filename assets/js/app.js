/* let datosUsuarios = []; // Guarda todos los datos de los usuarios

const formulario = document.getElementById("datos-formulario");
const lista = document.getElementById("datos-lista");
const error = document.getElementById("sin-registro");
const listaTabla = document.getElementById("lista-tabla");

const agregarUsuario = (nuevoUsuario) => {
  datosUsuarios = [...datosUsuarios, nuevoUsuario]; //
  mostrarTabla();
};

const mostrarTabla = () => {
  listaTabla.innerHTML = "";
  if (datosUsuarios.length === 0) {
    error.style.display = "block"
    return;

  } else {
    error.style.display = "none"
  };

  datosUsuarios.forEach((usuario) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
    <td>${usuario.nombre}</td>
    <td>${usuario.apellido}</td>
    <td>${usuario.email}</td>
    <td>${usuario.cargo}</td>
    `;
    listaTabla.appendChild(fila); // Pinta los datos en la tabla
  });
};

const guardarDatos = (e) => {
  e.preventDefault(); // Evita que la pagina se actualiza cuando estas agregando datos, navegando o ante cualquier evento.
  const inputNombre = document.getElementById("imputNombre");
  const inputApellido = document.getElementById("imputApellido");
  const inputEmail = document.getElementById("imputEmail");
  const inputCargo = document.getElementById("imputCargo");

  const nombre = imputNombre.value.trim(); // Captura todo lo que guarde Imput
  const apellido = imputApellido.value.trim();
  const email = imputEmail.value.trim();
  const cargo = imputCargo.value.trim();

  const nuevoUsuario = {
    id: Date.now(),
    nombre: nombre,
    apellido: apellido,
    email: email,
    cargo: cargo,
  };

  agregarUsuario(nuevoUsuario); // ejecuta funcion

  //formulario.reset();
};

formulario.addEventListener("submit", guardarDatos);
mostrarTabla(); */

const formulario = document.getElementById("datos-formulario");
const lista = document.getElementById("datos-lista");
const error = document.getElementById("sin-registro");
const listaTabla = document.getElementById("lista-tabla");

const datosApi = async () =>{
    try{
        const url ="https://jsonplaceholder.typicode.com/users"; //
        const respuesta = await fetch(url);
        if(!respuesta.ok) throw new Error("Error en la Red");
        const datosApi = await respuesta.json();
        console.log(datosApi);

    } catch(error){
        console.error("Falla en la Carga", error);

    }
}

datosApi()