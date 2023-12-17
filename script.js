let editMode = false;
let currentRow = null;

function submitForm() {
    if (editMode) {
        updateMovie();
    } else {
        addMovie();
    }
}

function addMovie() {
    const table = document.getElementById("movieTable");
    const row = table.insertRow();
    row.setAttribute("data-id", Date.now()); 

    fillRowWithData(row);

    const actionCell = row.insertCell(6);
    actionCell.innerHTML = `<button onclick="prepareEditMovie(this)">Editar</button> <button onclick="deleteMovie(this)">Eliminar</button>`;
    
    resetForm();
}

function fillRowWithData(row, data = null, isEdit = false) {
    const cellsData = data || {
        title: document.getElementById("title").value,
        year: document.getElementById("year").value,
        duration: document.getElementById("duration").value,
        genre: document.getElementById("genre").value,
        director: document.getElementById("director").value,
        synopsis: document.getElementById("synopsis").value
    };

    if (isEdit) {
        Object.keys(cellsData).forEach((key, index) => {
            row.cells[index].innerText = cellsData[key];
        });
    } else {
        Object.keys(cellsData).forEach((key, index) => {
            row.insertCell(index).innerText = cellsData[key];
        });
    }
}

function deleteMovie(button) {
    if (confirm('¿Estás seguro de querer eliminar esta película?')) {
        const row = button.parentNode.parentNode;
        document.getElementById("movieTable").deleteRow(row.rowIndex);
    }
}

function prepareEditMovie(button) {
    editMode = true;
    currentRow = button.parentNode.parentNode;

    document.getElementById("movieId").value = currentRow.getAttribute("data-id");
    document.getElementById("title").value = currentRow.cells[0].innerText;
    document.getElementById("year").value = currentRow.cells[1].innerText;
    document.getElementById("duration").value = currentRow.cells[2].innerText;
    document.getElementById("genre").value = currentRow.cells[3].innerText;
    document.getElementById("director").value = currentRow.cells[4].innerText;
    document.getElementById("synopsis").value = currentRow.cells[5].innerText;

    document.querySelector("#movieForm button").textContent = 'Actualizar';
}

function updateMovie() {
    fillRowWithData(currentRow, null, true);
    
    resetForm();
}

function resetForm() {
    document.getElementById("movieForm").reset();
    editMode = false;
    currentRow = null;
    document.querySelector("#movieForm button").textContent = 'Enviar';
}
