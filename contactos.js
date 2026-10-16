// ===== EDITA AQUÍ LOS CONTACTOS =====
// numero: con código de país, sin + ni espacios (Bolivia = 591)
// dias: 0=Dom, 1=Lun, 2=Mar, 3=Mié, 4=Jue, 5=Vie, 6=Sáb
// desde / hasta: "HH:MM" (si hasta es menor que desde, el bloque cruza la medianoche)
// Cada contacto tiene una lista "horarios": un bloque por cada tramo del día.

const MENSAJE = "Hola, necesito ayuda urgente en el campus LAS PALMAS , En el aula....";

const CONTACTOS = [
  {
    nombre: "German F Ayaviri Negrete", rol: "Mantenimiento audiovisual", numero: "59174772841",
    horarios: [
      { dias: [1, 2, 3, 4, 5], desde: "07:00", hasta: "15:00" }
    ]
  },
  {
    nombre: "Roger Leonel Chui Calle", rol: "Mantenimiento audiovisual", numero: "59177105077",
    horarios: [
      { dias: [1, 2, 3, 4, 5], desde: "15:00", hasta: "23:00" }
    ]
  },
  {
    nombre: "Henry E Cordero Balcazar", rol: "Apertura y cierre de aulas", numero: "59172916085",
    horarios: [
      { dias: [1, 2, 3, 4, 5], desde: "15:00", hasta: "23:00" }
    ]
  },
  {
    nombre: "Duglas Alpires Añez", rol: "Apertura y cierre de aulas", numero: "59167665366",
    horarios: [
      { dias: [1, 2, 3, 4, 5], desde: "08:00", hasta: "12:00" },
      { dias: [1, 2, 3, 4, 5], desde: "14:00", hasta: "18:00" }
    ]
  },
  {
    nombre: "Lubdin S Galier Coronel", rol: "Apertura y cierre de aulas", numero: "59167097818",
    horarios: [
      { dias: [1, 2, 3, 4, 5], desde: "07:00", hasta: "15:00" }
     
    ]
  }
];