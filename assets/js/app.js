// ---------------- SELECTORES ----------------

const listaTabla = document.getElementById("lista-tabla");
const error = document.getElementById("sin-registro");
//const form = document.querySelector("form");

// ---------------- ESTADO ----------------
let usuarios = [];


// ---------------- API BASE ----------------
const url = "https://jsonplaceholder.typicode.com/users";
const delay = (ms) => new Promise(res => setTimeout(res, ms));

// ---------------- OBTENER USUARIOS (GET) ----------------
const obtenerUsuarios = async () => {
  try {
    mostrarLoader();

    const [resp] = await Promise.all([
      fetch(url),
      delay(1500)
    ]);

    if (!resp.ok) throw new Error("Error");

    const data = await resp.json();

    usuarios = data.map(({ id, name, username, email }) => ({
      id,
      nombre: name,
      username,
      email
    }));

    ocultarLoader();
    renderizarUsuarios();

  } catch (err) {
    ocultarLoader();
    mostrarError("Error al cargar usuarios");
  }
};

// ---------------- AGREGAR USUARIO (POST) ----------------

const agregarUsuario = async (nuevoUsuario) => {
  try {
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(nuevoUsuario),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!resp.ok) throw new Error("Error al crear usuario");

    const data = await resp.json();

    // Simulación (jsonplaceholder no guarda realmente)

    usuarios = [...usuarios, { ...nuevoUsuario, id: Date.now() }];

    renderizarUsuarios();

  } catch (err) {
    mostrarError("No se pudo agregar el usuario");
    console.error(err);
  }
};

// ---------------- ELIMINAR USUARIO ----------------
const eliminarUsuario = (id) => {
  usuarios = usuarios.filter(user => user.id !== id);
  renderizarUsuarios();
};

// ---------------- RENDER ----------------
const renderizarUsuarios = () => {
  listaTabla.innerHTML = "";

if (usuarios.length === 0) {
    error.style.display = "block";
    return;
  }

  error.style.display = "none";

  usuarios.forEach(({ id, nombre, username, email }) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${nombre}</td>
      <td>${username}</td>
      <td>${email}</td>
      <td>
        <button class="btn btn-danger btn-sm" data-id="${id}">X</button>
      </td>`;

    listaTabla.appendChild(fila);
  });
};

// ---------------- FORMULARIO ----------------
/*form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("name").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!nombre || !username || !email) {
    return mostrarError("Todos los campos son obligatorios");
  }

  const nuevoUsuario = { nombre, username, email };

  agregarUsuario(nuevoUsuario);
  form.reset();
});*/

// ---------------- EVENTO ELIMINAR ----------------
listaTabla.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const id = Number(e.target.dataset.id);
    eliminarUsuario(id);
  }
});

// ---------------- UI ----------------
const mostrarLoader = () => {
  loader.classList.remove("hidden");
  listaTabla.innerHTML = "";
};

const ocultarLoader = () => {
  loader.classList.add("hidden");
};


const mostrarError = (msg) => {
  error.style.display = "block";
  error.textContent = msg;
};

// ---------------- INIT ----------------
obtenerUsuarios();

// ------- FUNCION AGREGAR NUEVO USUARIO --------

const btnAgregar = document.getElementById("btn-agregar");
const formContainer = document.getElementById("form-container");
const form = document.getElementById("form-usuario");
const modal = document.getElementById("modal");
const cerrarModal = document.getElementById("cerrar-modal");

btnAgregar.addEventListener("click", () => {
  formContainer.classList.toggle("hidden");
  modal.classList.remove("hidden");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("name").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!nombre || !username || !email) {
    return mostrarError("Todos los campos son obligatorios");
  }

  const nuevoUsuario = {
    id: Date.now(),
    nombre,
    username,
    email
  };

  // agregar al estado
  usuarios = [...usuarios, nuevoUsuario];

  renderizarUsuarios();

  form.reset();
  //formContainer.classList.add("hidden"); // cerrar form
});

// -----MODAL -----

//const modal = document.getElementById("modal");
//const agregarUser = document.getElementById("btn-agregar");
//const cerrarModal = document.getElementById("cerrar-modal");

// abrir
//agregarUser.addEventListener("click", () => {
  //modal.classList.remove("hidden");
//});

// cerrar con X
//cerrarModal.addEventListener("click", () => {
  //modal.classList.add("hidden");
//});

// cerrar clic fuera
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});