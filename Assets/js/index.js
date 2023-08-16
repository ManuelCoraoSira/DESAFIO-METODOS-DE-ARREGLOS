const inputTarea = document.getElementById('input_tarea');
const botonAgregar = document.getElementById('boton_agregar');
const tablaTareas = document.querySelector('tbody');
const totalTareas = document.getElementById('totalTareas');
const tareasRealizadas = document.getElementById('tareasRealizadas');


let tareas = [
  { id: 1, descripcion: 'Hacer Mercado', completado: false },
  { id: 2, descripcion: 'Pasear al perro', completado: false },
  { id: 3, descripcion: 'Ir al GYM', completado: false },
];

botonAgregar.addEventListener('click', () => {
  const descripcion = inputTarea.value;

  
  if (descripcion.trim() !== '') {
    const nuevaTarea = {
      id: tareas.length + 1,
      descripcion: descripcion,
      completado: false,
    };

    tareas.push(nuevaTarea);
    RefreshTareas();
    inputTarea.value = '';
  }
});

function NuevoConteo() {
  totalTareas.textContent = tareas.length;

  const tareasCompletadas = tareas.filter(tarea => tarea.completado).length;
  tareasRealizadas.textContent = tareasCompletadas;
}

RefreshTareas();

function RefreshTareas() {
  tablaTareas.innerHTML = '';

  tareas.forEach((tarea, index) => {
    const fila = document.createElement('tr');
    fila.dataset.index = index;
    
    const idColumna = document.createElement('td');
    idColumna.textContent = tarea.id;
    fila.appendChild(idColumna);

    const descripcionColumna = document.createElement('td');
    descripcionColumna.textContent = tarea.descripcion;
    fila.appendChild(descripcionColumna);

    const completadoColumna = document.createElement('td');
    const checkboxCompletado = document.createElement('input');
    checkboxCompletado.type = 'checkbox';
    checkboxCompletado.checked = tarea.completado;
    completadoColumna.appendChild(checkboxCompletado);
    fila.appendChild(completadoColumna);

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    fila.appendChild(botonEliminar);

    botonEliminar.addEventListener(`click`, () => {
      const fila = botonEliminar.parentNode.parentNode;
      const index = fila.dataset.index;

      tareas.splice(index, 1);
      RefreshTareas();
      NuevoConteo();
    });

    checkboxCompletado.addEventListener('change', () => {
      tarea.completado = checkboxCompletado.checked;
      NuevoConteo();
    });

    tablaTareas.appendChild(fila);
  });

  NuevoConteo();
}