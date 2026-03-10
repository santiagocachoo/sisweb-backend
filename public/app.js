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
    tableBody.innerHTML = `<tr><td colspan="6">Sin empresas registradas</td></tr>`;
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
