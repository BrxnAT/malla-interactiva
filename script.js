const ramos = {
  "Introducción a la ingeniería comercial": [],
  "Iniciación a la contabilidad": ["Contabilidad financiera", "Gestión de costos"],
  "Matemática para negocios 1": ["Matemática para negocios 2", "Introducción a la economía"],
  "Lógica y programación para negocios": [],
  "Comunicación en inglés": ["Comunicación en inglés 2"],
  "Comunicación en español": [],
  "Introducción a la economía": ["Microeconomía", "Macroeconomía"],
  "Gestión de empresas y liderazgo": ["Gestión de personas y equipos"],
  "Contabilidad financiera": ["Gestión financiera de corto plazo"],
  "Matemática para negocios 2": ["Estadística y probabilidad"],
  "Sistemas de información para la gestión": ["Análisis de datos 1"],
  "Comunicación en inglés 2": ["Inglés para negocios"],
  "Microeconomía": ["Análisis microeconómico avanzado"],
  "Gestión de personas y equipos": ["Gestión directiva"],
  "Gestión de costos": [],
  "Estadística y probabilidad": ["Econometría"],
  "Fundamentos filosóficos": ["Fundamentos teológicos"],
  "Integración del saber": [],
  "Macroeconomía": [],
  "Legislación para los negocios": [],
  "Gestión directiva": [],
  "Gestión financiera de corto plazo": ["Finanzas e inversiones"],
  "Análisis de datos 1": [],
  "Inglés para negocios": [],
  "Práctica inicial": [],
  "Análisis microeconómico avanzado": ["Economía de empresa"],
  "Dirección estratégica de marketing": ["Marketing y creación de valor"],
  "Finanzas e inversiones": ["Finanzas corporativas", "Estrategia empresarial"],
  "Econometría": ["Metodología de investigación"],
  "Fundamentos teológicos": ["Ética profesional"],
  "Economía de empresa": [],
  "Tributación para los negocios": [],
  "Marketing y creación de valor": ["Investigación de mercado", "Negocios internacionales"],
  "Gestión y sostenibilidad": [],
  "Finanzas corporativas": ["Evaluación de proyectos"],
  "Metodología de investigación": ["Proyecto integrador"],
  "Investigación de mercado": [],
  "Estrategia empresarial": ["Control de gestión", "Negocios internacionales"],
  "Evaluación de proyectos": [],
  "Gestión de operaciones": [],
  "Ética profesional": [],
  "Optativo de profundización": [],
  "Gestión de la innovación": ["Innovación en productos y servicios"],
  "Control de gestión": [],
  "Proyecto integrador": [],
  "Innovación en productos y servicios": [],
  "Negocios internacionales": [],
  "Práctica profesional": []
};

const estadoRamos = {}; // guarda qué ramos están aprobados
const mallaDiv = document.getElementById("malla");

// Crear botones
Object.keys(ramos).forEach(nombre => {
  const div = document.createElement("div");
  div.className = "ramo";
  div.textContent = nombre;
  div.dataset.nombre = nombre;
  mallaDiv.appendChild(div);
  estadoRamos[nombre] = false;
});

// Activar ramos sin requisitos
function inicializarMalla() {
  Object.entries(ramos).forEach(([nombre, requisitos]) => {
    if (requisitos.length === 0) {
      activarRamo(nombre);
    }
  });
}

function activarRamo(nombre) {
  const div = [...document.querySelectorAll(".ramo")].find(d => d.dataset.nombre === nombre);
  if (div) {
    div.classList.add("activo");
  }
}

function aprobarRamo(nombre) {
  if (estadoRamos[nombre]) return;

  estadoRamos[nombre] = true;
  const div = [...document.querySelectorAll(".ramo")].find(d => d.dataset.nombre === nombre);
  if (div) {
    div.classList.add("aprobado");
  }

  // Buscar qué ramos se desbloquean al aprobar este
  Object.entries(ramos).forEach(([otroRamo, requisitos]) => {
    if (requisitos.includes(nombre)) {
      const todosAprobados = requisitos.every(req => estadoRamos[req]);
      if (todosAprobados) {
        activarRamo(otroRamo);
      }
    }
  });
}

document.querySelectorAll(".ramo").forEach(div => {
  div.addEventListener("click", () => {
    const nombre = div.dataset.nombre;
    aprobarRamo(nombre);
  });
});

inicializarMalla();

