const tableBody = document.getElementById("empresaTableBody");
const messageEl = document.getElementById("message");
const refreshBtn = document.getElementById("refreshBtn");
const empresaForm = document.getElementById("empresaForm");
const nameInput = document.getElementById("name");
const sectorInput = document.getElementById("sector");
const contactEmailInput = document.getElementById("contactEmail");
const phoneInput = document.getElementById("phone");
const isActiveInput = document.getElementById("isActive");


function setMessage(text, isError = false) {
  messageEl.textContent = text;
  messageEl.style.color = isError ? "red" : "green";
}

function renderRows(items) {
  tableBody.innerHTML = "";

  if (!items.length) {
    tableBody.innerHTML = `<tr><td colspan="7">Sin empresas registradas</td></tr>`;
    return;
  }

  for (const item of items) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name ?? ""}</td>
      <td>${item.sector ?? ""}</td>
      <td>${item.contactEmail ?? ""}</td>
      <td>${item.phone ?? ""}</td>
      <td>${item.isActive ? "Sí" : "No"}</td>
      <td>
        <button class="edit-btn" data-id="${item.id}">Editar</button>
        <button class="delete-btn" data-id="${item.id}">Eliminar</button>
      </td>
    `;
    tableBody.appendChild(row);
  }
}

async function loadEmpresas() {
  try {
    setMessage("Cargando...");
    const res = await fetch("/empresa-miembro");
    const data = await res.json();

    if (!res.ok || data.status !== "success") {
      setMessage(data.message || "Error al cargar empresas", true);
      return;
    }

    renderRows(data.payload || []);
    setMessage("Empresas cargadas");
  } catch (err) {
    setMessage("Error de red al cargar empresas", true);
  }
}

async function createEmpresaMiembro(payload) {
  const res = await fetch("/empresa-miembro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return { res, data };
}

async function deleteEmpresaMiembro(id) {
  const res = await fetch(`/empresa-miembro/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return { res, data };
}

async function updateEmpresaMiembro(id, payload) {
  const res = await fetch(`/empresa-miembro/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return { res, data };
}

tableBody.addEventListener("click", async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const id = target.dataset.id;
  if (!id) return;

  if (target.classList.contains("delete-btn")) {
    const confirmDelete = confirm("¿Eliminar esta empresa?");
    if (!confirmDelete) return;

    try {
      const { res, data } = await deleteEmpresaMiembro(id);
      if (!res.ok || data.status !== "success") {
        setMessage(data.message || "Error al eliminar", true);
        return;
      }
      setMessage("Empresa eliminada");
      await loadEmpresas();
    } catch (err) {
      setMessage("Error de red al eliminar", true);
    }
  }

  if (target.classList.contains("edit-btn")) {
    const newName = prompt("Nuevo nombre (deja vacío para no cambiar):");
    const newSector = prompt("Nuevo sector (deja vacío para no cambiar):");

    const payload = {};
    if (newName && newName.trim()) payload.name = newName.trim();
    if (newSector && newSector.trim()) payload.sector = newSector.trim();

    if (Object.keys(payload).length === 0) {
      setMessage("No se enviaron cambios", true);
      return;
    }

    try {
      const { res, data } = await updateEmpresaMiembro(id, payload);
      if (!res.ok || data.status !== "success") {
        setMessage(data.message || "Error al actualizar", true);
        return;
      }
      setMessage("Empresa actualizada");
      await loadEmpresas();
    } catch (err) {
      setMessage("Error de red al actualizar", true);
    }
  }
});



refreshBtn.addEventListener("click", loadEmpresas);

empresaForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const payload = {
      name: nameInput.value.trim(),
      sector: sectorInput.value.trim(),
      contactEmail: contactEmailInput.value.trim(),
      phone: phoneInput.value.trim(),
      isActive: isActiveInput.checked,
    };

    const { res, data } = await createEmpresaMiembro(payload);

    if (!res.ok || data.status !== "success") {
      setMessage(data.message || "Error al crear empresa", true);
      return;
    }

    empresaForm.reset();
    isActiveInput.checked = true;
    setMessage("Empresa creada correctamente");
    await loadEmpresas();
  } catch (err) {
    setMessage("Error de red al crear empresa", true);
  }
});

loadEmpresas();
