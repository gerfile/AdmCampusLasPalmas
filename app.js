const DIAS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

// Si no existe assets/logo.png, se muestra el texto "ADM Campus"
const logoImg = document.getElementById("logo-img");
logoImg.addEventListener("error", () => {
  document.getElementById("logo").innerHTML = "ADM<br>Campus";
});

const aMin = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

// Hora de Bolivia (UTC-4), sin depender de la zona horaria del dispositivo
function ahoraBolivia() {
  const d = new Date(Date.now() - 4 * 3600 * 1000);
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  return {
    dia: d.getUTCDay(),
    min: d.getUTCHours() * 60 + d.getUTCMinutes(),
    texto: `${DIAS[d.getUTCDay()]} ${hh}:${mm}`
  };
}

// Un contacto puede tener varios bloques en "horarios".
// (Si solo trae dias/desde/hasta sueltos, se trata como un único bloque.)
function bloques(c) {
  return c.horarios || [{ dias: c.dias, desde: c.desde, hasta: c.hasta }];
}

function enBloque(b, t) {
  const desde = aMin(b.desde);
  const hasta = aMin(b.hasta);
  if (desde < hasta) {
    return b.dias.includes(t.dia) && t.min >= desde && t.min < hasta;
  }
  // bloque que cruza la medianoche
  const ayer = (t.dia + 6) % 7;
  return (b.dias.includes(t.dia) && t.min >= desde) ||
         (b.dias.includes(ayer) && t.min < hasta);
}

const bloqueActivo = (c, t) => bloques(c).find((b) => enBloque(b, t));
const estaDeTurno = (c, t) => Boolean(bloqueActivo(c, t));

const linkWa = (c) => `https://wa.me/${c.numero}?text=${encodeURIComponent(MENSAJE)}`;
const iniciales = (n) => n.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
const rangoBloque = (b) => `${b.dias.map((i) => DIAS[i]).join(", ")} · ${b.desde} – ${b.hasta}`;
const rango = (c) => bloques(c).map(rangoBloque).join("<br>");

function render() {
  const t = ahoraBolivia();
  document.getElementById("clock").textContent = `Hora local: ${t.texto} (Bolivia)`;

  const activos = CONTACTOS.filter((c) => estaDeTurno(c, t));
  document.getElementById("onduty").innerHTML = activos.length
    ? activos.map((c) => `
        <div class="person">
          <div class="avatar">${iniciales(c.nombre)}</div>
          <div class="info">
            <div class="name">${c.nombre}</div>
            <div class="role">${c.rol}</div>
            <div class="hours">Hasta las ${bloqueActivo(c, t).hasta}</div>
          </div>
          <a class="btn" href="${linkWa(c)}" target="_blank" rel="noopener">WhatsApp</a>
        </div>`).join("")
    : '<div class="empty">No hay nadie de turno en este momento. Revisa todos los horarios.</div>';

  document.getElementById("sched").innerHTML = CONTACTOS.map((c) => `
    <h3>${c.nombre}${estaDeTurno(c, t) ? '<span class="badge">de turno</span>' : ""}</h3>
    <div class="role">${c.rol}</div>
    <div class="hours">${rango(c)}</div>
    <p><a class="btn" href="${linkWa(c)}" target="_blank" rel="noopener">Escribir</a></p>
  `).join("");
}

render();
setInterval(render, 30000);

// QR de la propia página
let qrListo = false;
document.getElementById("qrbtn").addEventListener("click", () => {
  const box = document.getElementById("qrbox");
  box.hidden = !box.hidden;
  if (!qrListo && !box.hidden) {
    try {
      new QRCode(box, { text: location.href, width: 200, height: 200 });
      qrListo = true;
    } catch (e) {
      box.textContent = "No se pudo generar el QR.";
    }
  }
});