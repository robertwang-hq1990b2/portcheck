// Demo data — will be replaced by Tauri backend later
const demoPorts = [
  { port: 3000, process: "node",     pid: 1234 },
  { port: 5173, process: "vite",     pid: 5678 },
  { port: 8080, process: "python",   pid: 9012 },
  { port: 5432, process: "postgres", pid: 3456 },
];

const tbody = document.getElementById("ports");
const searchInput = document.getElementById("search");
const devOnly = document.getElementById("devOnly");
const emptyMsg = document.getElementById("empty");

function render() {
  const query = searchInput.value.trim().toLowerCase();
  const onlyDev = devOnly.checked;

  const filtered = demoPorts.filter((p) => {
    if (onlyDev && p.port <= 1024) return false;
    if (!query) return true;
    return (
      String(p.port).includes(query) ||
      p.process.toLowerCase().includes(query)
    );
  });

  tbody.innerHTML = "";
  emptyMsg.classList.toggle("hidden", filtered.length > 0);

  for (const p of filtered) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="port">${p.port}</td>
      <td>${p.process}</td>
      <td class="pid">${p.pid}</td>
      <td><button data-pid="${p.pid}">Kill</button></td>
    `;
    tbody.appendChild(tr);
  }

  tbody.querySelectorAll("button[data-pid]").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest("tr").remove();
    });
  });
}

searchInput.addEventListener("input", render);
devOnly.addEventListener("change", render);

render();