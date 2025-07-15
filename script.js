const estructuraSemestres = {
  "Primer semestre": [
    "Introducción a la ingeniería comercial",
    "Iniciación a la contabilidad",
    "Matemática para negocios 1",
    "Lógica y programación para negocios",
    "Comunicación en inglés",
    "Comunicación en español"
  ],
  "Segundo semestre": [
    "Introducción a la economía",
    "Gestión de empresas y liderazgo",
    "Contabilidad financiera",
    "Matemática para negocios 2",
    "Sistemas de información para la gestión",
    "Comunicación en inglés 2"
  ],
  "Tercer semestre": [
    "Microeconomía",
    "Gestión de personas y equipos",
    "Gestión de costos",
    "Estadística y probabilidad",
    "Fundamentos filosóficos",
    "Integración del saber"
  ],
  "Cuarto semestre": [
    "Macroeconomía",
    "Legislación para los negocios",
    "Gestión directiva",
    "Gestión financiera de corto plazo",
    "Análisis de datos 1",
    "Inglés para negocios"
  ],
  "Quinto semestre": [
    "Práctica inicial",
    "Análisis microeconómico avanzado",
    "Dirección estratégica de marketing",
    "Finanzas e inversiones",
    "Econometría",
    "Fundamentos teológicos"
  ],
  "Sexto semestre": [
    "Economía de empresa",
    "Tributación para los negocios",
    "Marketing y creación de valor",
    "Gestión y sostenibilidad",
    "Finanzas corporativas",
    "Metodología de investigación"
  ],
  "Séptimo semestre": [
    "Investigación de mercado",
    "Estrategia empresarial",
    "Evaluación de proyectos",
    "Gestión de operaciones",
    "Ética profesional",
    "Optativo de profundización"
  ],
  "Octavo semestre": [
    "Gestión de la innovación",
    "Control de gestión",
    "Proyecto integrador",
    "Optativo de profundización",
    "Integración del saber"
  ],
  "Noveno semestre": [
    "Innovación en productos y servicios",
    "Negocios internacionales",
    "Optativo de profundización",
    "Optativo de profundización",
    "Optativo de profundización",
    "Optativo de profundización"
  ],
  "Décimo semestre": [
    "Práctica profesional"
  ]
};

const dependencias = {
  "Iniciación a la contabilidad": ["Contabilidad financiera", "Gestión de costos"],
  "Matemática para negocios 1": ["Matemática para negocios 2", "Introducción a la economía"],
  "Comunicación en inglés": ["Comunicación en inglés 2"],
  "Introducción a la economía": ["Microeconomía", "Macroeconomía"],
  "Gestión de empresas y liderazgo": ["Gestión de personas y equipos"],
  "Contabilidad financiera": ["Gestión financiera de corto plazo"],
  "Matemática para negocios 2": ["Estadística y probabilidad"],
  "Sistemas de información para la gestión": ["Análisis de datos 1"],
  "Comunicación en inglés 2": ["Inglés para negocios"],
  "Microeconomía": ["Análisis microeconómico avanzado"],
  "Gestión de personas y equipos": ["Gestión directiva"],
  "Estadística y probabilidad": ["Econometría"],
  "Fundamentos filosóficos": ["Fundamentos teológicos"],
  "Gestión financiera de corto plazo": ["Finanzas e inversiones"],
  "Análisis microeconómico avanzado": ["Economía de empresa"],
  "Dirección estratégica de marketing": ["Marketing y creación de valor"],
  "Finanzas e inversiones": ["Finanzas corporativas", "Estrategia empresarial"],
  "Econometría": ["Metodología de investigación"],
  "Fundamentos teológicos": ["Ética profesional"],
  "Marketing y creación de valor": ["Investigación de mercado", "Negocios internacionales"],
  "Finanzas corporativas": ["Evaluación de proyectos"],
  "Metodología de investigación": ["Proyecto integrador"],
  "Estrategia empresarial": ["Control de gestión", "Negocios internacionales"],
  "Gestión de la innovación": ["Innovación en productos y servicios"]
};

const estado = JSON.parse(localStorage.getItem("estadoRamos") || "{}");

function guardarEstado() {
  localStorage.setItem("estadoRamos", JSON.stringify(estado));
}

function crearMalla() {
  const malla = document.getElementById("malla");
  for (const [semestre, ramos] of Object.entries(estructuraSemestres)) {
    const divSemestre = document.createElement("div");
    divSemestre.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = semestre;

    const contenedor = document.createElement("div");
    contenedor.className = "ramos";

    ramos.forEach(nombre => {
      const div = document.createElement("div");
      div.className = "ramo";
      div.textContent = nombre;
      div.dataset.nombre = nombre;

      if (!tieneRequisitos(nombre) || requisitosCumplidos(nombre)) {
        div.classList.add("activo");
      }

      if (estado[nombre]) {
        div.classList.add("aprobado");
      }

      div.addEventListener("click", () => {
        const aprobado = estado[nombre];
        estado[nombre] = !aprobado;
        if (estado[nombre]) {
          div.classList.add("aprobado");
        } else {
          div.classList.remove("aprobado");
        }
        actualizarDesbloqueos();
        guardarEstado();
      });

      contenedor.appendChild(div);
    });

    divSemestre.appendChild(titulo);
    divSemestre.appendChild(contenedor);
    malla.appendChild(divSemestre);
  }
}

function tieneRequisitos(ramo) {
  return Object.values(dependencias).some(lista => lista.includes(ramo));
}

function requisitosCumplidos(ramo) {
  const requisitos = Object.entries(dependencias)
    .filter(([, deps]) => deps.includes(ramo))
    .map(([key]) => key);
  return requisitos.every(r => estado[r]);
}

function actualizarDesbloqueos() {
  document.querySelectorAll(".ramo").forEach(div => {
    const nombre = div.dataset.nombre;
    if (!estado[nombre] && requisitosCumplidos(nombre)) {
      div.classList.add("activo");
    } else if (!estado[nombre] && tieneRequisitos(nombre)) {
      div.classList.remove("activo");
    }
  });
}

crearMalla();
actualizarDesbloqueos();
