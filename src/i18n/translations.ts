export type Lang = "es" | "en";

export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

/**
 * UI string dictionary. Spanish is the default. Use `*term*` to emphasize a
 * term as <strong> (rendered by the `T`/`renderEmphasis` helper).
 */
export const translations = {
  es: {
    nav: {
      how: "Cómo funciona",
      science: "La ciencia",
      metrics: "Métricas",
      openCalculator: "Abrir calculadora",
    },
    hero: {
      badge: "Método de daylighting de la Universidad de Sevilla · validado",
      titlePre: "Convierte un ",
      titleHighlight: "Factor de Luz Diurna",
      titlePost: " en Autonomía Lumínica de cielo cubierto, al instante.",
      subtitle:
        "Una calculadora científica que convierte el *DF* estático en las métricas dinámicas *DAo* y *DAo.con* — para puntos individuales, secciones verticales y matrices completas de planta, con mapas de calor y curvas de respuesta.",
      ctaOpen: "Abrir la calculadora",
      ctaMethod: "Ver el método",
      statModes: "Modos de cálculo",
      statSamples: "Muestras de cielo / punto",
      statError: "Error vs. referencia",
      liveConversion: "Conversión en vivo",
      daylightFactor: "Factor de Luz Diurna",
      demoNote:
        "Calculado para latitud 37°, horario 08:00–17:00 y objetivo de 300 lx — todo ajustable dentro.",
    },
    how: {
      eyebrow: "Cómo funciona",
      title: "Ciencia de la luz compleja, en tres pasos simples",
      subtitle:
        "La parte difícil — una simulación anual completa de cielo cubierto — se ejecuta al instante en tu navegador. Tú solo piensas en Factor de Luz Diurna.",
      step1Title: "Introduce tu Factor de Luz Diurna",
      step1Body:
        "Aporta el DF en un punto, a lo largo de una sección vertical o en una rejilla de planta completa. El DF es un indicador estático e independiente de la ubicación del comportamiento lumínico de un espacio.",
      step2Title: "Modelamos el cielo cubierto",
      step2Body:
        "Para cada paso de 15 minutos del año ocupado calculamos la iluminancia exterior del cielo cubierto CIE a partir de la geometría solar, y luego la iluminancia interior como E = DF × E_ext.",
      step3Title: "Lee DAo y DAo.con",
      step3Body:
        "DAo es la fracción de tiempo ocupado en que el espacio supera tu objetivo de lux; DAo.con además acredita la luz parcial. Los resultados se muestran como medidores, curvas y mapas de calor.",
    },
    science: {
      eyebrow: "La ciencia",
      title: "Un modelo anual de luz natural fiel",
      subtitle:
        "Esta herramienta reproduce exactamente el libro de cálculo original de la Universidad de Sevilla. El DAo es *independiente de la orientación y la ubicación* porque parte del Factor de Luz Diurna estático — aunque la conversión sí tiene en cuenta la latitud, el horario y tu umbral de iluminancia.",
      tryNow: "Pruébalo ahora",
      skyNote: "Cielo cubierto estándar CIE · 300 lx por defecto",
      chain1: "Geometría solar",
      chain1d: "δ, ecuación del tiempo, ángulo horario",
      chain2: "Elevación solar",
      chain2d: "γ = f(δ, latitud, H)",
      chain3: "Iluminancia exterior",
      chain3d: "Cielo cubierto: (7/9)π(100 + 7580·sinγ^1.36)",
      chain4: "Iluminancia interior",
      chain4d: "E_int = E_ext × DF/100",
      chain5: "DAo / DAo.con",
      chain5d: "conteo y crédito continuo frente al umbral",
    },
    metrics: {
      eyebrow: "Las métricas",
      title: "Dos métricas, una imagen clara",
      daoTitle: "Autonomía Lumínica con cielo cubierto",
      daoBody:
        "El porcentaje de tiempo ocupado que un punto se mantiene en o por encima de la iluminancia objetivo (típicamente 300 lx) bajo cielo cubierto — el peor escenario de luz natural.",
      daoExample: "DAo = 50% → la mitad de las horas ocupadas no necesitan luz eléctrica.",
      conTitle: "Autonomía Lumínica Continua con cielo cubierto",
      conBody:
        "Una versión matizada que también acredita la luz parcial: un punto a 150 lx frente a un objetivo de 300 lx aporta 0,5 en lugar de descartarse.",
      conExample: "DAo.con = 0,75 → de media se alcanza el 75% del objetivo.",
      modesTitle: "Tres formas de calcular",
      modesSubtitle: "Desde una sola lectura de DF hasta un mapa de calor de planta completo.",
      modeSingle: "Punto individual",
      modeSection: "Sección vertical",
      modeMatrix: "Matriz de planta",
    },
    cta: {
      title: "Haz evidente el comportamiento lumínico.",
      subtitle:
        "Abre la calculadora y convierte tus Factores de Luz Diurna en DAo y DAo.con — sin instalar nada, sin hojas de cálculo, con visuales instantáneos.",
      button: "Lanzar la calculadora",
    },
    footer: {
      tagline:
        "Una herramienta científica abierta para convertir el Factor de Luz Diurna en Autonomía Lumínica con cielo cubierto, fiel al método original de la Universidad de Sevilla.",
      calculator: "Calculadora",
      method: "Método",
      referencesTitle: "Metodología y referencias",
      copyright:
        "Método de cálculo © I. Acosta y M. A. Campano, Universidad de Sevilla. Reimplementado para la web.",
      validated: "Validado a 0,000% de error frente al libro de cálculo de referencia.",
    },
    calc: {
      title: "Calculadora DAo",
      subtitle:
        "Convierte el Factor de Luz Diurna en Autonomía Lumínica con cielo cubierto — ajusta los parámetros y elige un modo de cálculo.",
      tabSingle: "Punto individual",
      tabSection: "Sección vertical",
      tabMatrix: "Matriz de planta",
    },
    params: {
      title: "Parámetros",
      reset: "Restablecer",
      location: "Ubicación",
      latitude: "Latitud",
      latitudeHint:
        "Latitud del emplazamiento en grados. Define el perfil anual de elevación solar que alimenta la iluminancia del cielo cubierto.",
      longitude: "Longitud",
      longitudeHint: "Grados al este de Greenwich. Solo afecta a la pequeña corrección de tiempo solar.",
      timezone: "Huso horario",
      timezoneHint: "Desfase horario estándar respecto a UTC (p. ej. +1 para hora central europea).",
      dst: "Horario de verano",
      dstHint: "Aplica el cambio de hora de verano europeo al convertir hora civil en tiempo solar.",
      schedule: "Horario de ocupación",
      checkin: "Entrada",
      checkinHint: "Inicio del periodo ocupado (hora civil local).",
      checkout: "Salida",
      checkoutHint: "Fin del periodo ocupado (exclusivo).",
      weekend: "Excluir fines de semana",
      weekendHint: "Cuenta solo los 260 días laborables del modelo, igual que el libro de referencia.",
      break: "Pausa de comida",
      breakHint: "Elimina de las métricas una ventana diaria no ocupada (p. ej. 11:00–12:00).",
      breakStart: "Inicio pausa",
      breakEnd: "Fin pausa",
      target: "Objetivo de iluminancia",
      threshold: "Umbral",
      thresholdHint: "Iluminancia mínima considerada «luz suficiente» (típicamente 300 lx).",
    },
    single: {
      title: "Punto individual",
      subtitle: "Convierte una lectura de Factor de Luz Diurna en DAo y DAo.con.",
      dfHint:
        "El Factor de Luz Diurna del punto: iluminancia horizontal interior/exterior bajo cielo cubierto, en porcentaje.",
      performance: "Rendimiento",
      exportCsv: "Exportar CSV",
      curveTitle: "Curva de respuesta",
      curveSubtitle: "Cómo crecen DAo y DAo.con con el Factor de Luz Diurna.",
    },
    section: {
      title: "Sección vertical",
      subtitle:
        "Una lista de puntos a lo largo de una sección — típicamente con el DF decreciendo con la profundidad desde la ventana.",
      colDist: "Dist. (m)",
      colDf: "DF (%)",
      colDao: "DAo",
      addPoint: "Añadir punto",
      profileTitle: "Perfil de sección",
      profileSubtitle: "DAo y DAo.con a lo largo de la profundidad de la sección.",
      byDepth: "Autonomía lumínica por profundidad",
      emptyTitle: "Añade al menos dos puntos",
      emptyBody:
        "Una sección necesita dos o más lecturas para trazar cómo cambia la autonomía lumínica con la profundidad.",
      distanceAxis: "Distancia a la fachada (m)",
      window: "Ventana",
      deep: "Fondo",
    },
    matrix: {
      title: "Matriz de planta",
      subtitle:
        "Una rejilla de lecturas de DF en una planta. Las celdas se tintan según su DAo mientras escribes.",
      rows: "Filas",
      rowsHint: "Número de filas de la rejilla (profundidad de la sala).",
      cols: "Columnas",
      colsHint: "Número de columnas de la rejilla (anchura de la sala).",
      spacing: "Separación",
      spacingHint: "Distancia entre nodos de la rejilla, para las etiquetas de los ejes.",
      sampleFill: "Relleno de ejemplo",
      heatmap: "Mapa de calor",
      meanDao: "DAo medio",
      min: "Mín",
      max: "Máx",
      coverage: "Área ≥ 50%",
      metricDao: "DAo",
      metricCon: "DAo.con",
      metricDf: "Factor de Luz Diurna",
      noteDf: "Mostrando el Factor de Luz Diurna de entrada.",
      noteOther:
        "Cada nodo convierte su DF en la métrica seleccionada usando los parámetros de la izquierda.",
    },
    heatmap: {
      depth: "Profundidad →",
      window: "Ventana",
      width: "Anchura →",
      cell: "Celda",
    },
    bands: {
      excellent: "Excelente",
      excellentDesc: "Excelente luz natural incluso bajo cielos cubiertos.",
      good: "Bueno",
      goodDesc: "Luz natural fiable durante la mayoría de las horas ocupadas.",
      fair: "Aceptable",
      fairDesc: "La luz natural cubre parte del tiempo ocupado.",
      low: "Bajo",
      lowDesc: "Se necesita luz eléctrica la mayor parte del tiempo.",
    },
    chart: {
      dfAxis: "Factor de Luz Diurna (%)",
    },
    widgets: {
      solar: {
        title: "Trayectoria solar y luz disponible",
        time: "Hora",
        elevation: "Elevación solar",
        extIll: "Luz exterior",
        day: "Día del año",
        latitude: "Latitud",
        note: "Elevación máxima del día: {peak}°. Cuanto más alto está el sol, más iluminancia aporta el cielo cubierto — y mayor es el DAo.",
      },
      annual: {
        title: "Calendario anual de luz",
        subtitle:
          "Iluminancia exterior de cielo cubierto a lo largo del año y del día. Ajusta la latitud para ver el efecto.",
        hover: "{date} a las {time}: {value} lx",
        hint: "Pasa el ratón por el mapa para leer la luz exterior en cada momento.",
      },
      depth: {
        title: "Cómo cae la luz con la profundidad",
        subtitle:
          "El DF — y con él el DAo — disminuye al alejarse de la ventana. Cada círculo es el DAo en ese punto.",
        window: "Ventana",
        back: "Fondo de la sala",
        windowDf: "DF junto a la ventana",
        roomDepth: "Profundidad de la sala",
        note: "Modelo ilustrativo del decaimiento del DF con la profundidad; cada punto convierte su DF en DAo con el motor real.",
      },
      compare: {
        title: "Compara dos escenarios",
        subtitle:
          "Cambia DF, latitud y umbral en cada columna y compara su DAo al instante.",
        delta: "Diferencia:",
        deltaTail: "de DAo",
        scenario: "Escenario",
      },
    },
    explore: {
      eyebrow: "Explóralo",
      title: "Llévalo a tu espacio",
      subtitle:
        "Juega con la profundidad de la sala y compara escenarios de proyecto, todo con el motor de cálculo real.",
    },
    common: {
      autonomy: "autonomía",
      continuous: "continua",
      language: "Idioma",
      theme: "Cambiar tema",
    },
  },

  en: {
    nav: {
      how: "How it works",
      science: "The science",
      metrics: "Metrics",
      openCalculator: "Open calculator",
    },
    hero: {
      badge: "University of Seville daylighting method · validated",
      titlePre: "Turn a ",
      titleHighlight: "Daylight Factor",
      titlePost: " into Overcast Daylight Autonomy — instantly.",
      subtitle:
        "A scientific calculator that converts the static *DF* into the dynamic *DAo* and *DAo.con* metrics — for single points, vertical sections and full floor-plan matrices, with heatmaps and response curves.",
      ctaOpen: "Open the calculator",
      ctaMethod: "See the method",
      statModes: "Calculation modes",
      statSamples: "Sky samples / point",
      statError: "Error vs. reference",
      liveConversion: "Live conversion",
      daylightFactor: "Daylight Factor",
      demoNote:
        "Computed for latitude 37°, an 08:00–17:00 schedule and a 300 lx target — fully adjustable inside.",
    },
    how: {
      eyebrow: "How it works",
      title: "Complex daylight science, three simple steps",
      subtitle:
        "The hard part — a full annual overcast-sky simulation — runs instantly in your browser. You only ever think in Daylight Factor.",
      step1Title: "Enter your Daylight Factor",
      step1Body:
        "Provide DF at a point, along a vertical section, or across a whole floor-plan grid. DF is a static, location-independent indicator of a space's daylight performance.",
      step2Title: "We model the overcast sky",
      step2Body:
        "For every 15-minute step of the occupied year we compute the CIE overcast-sky exterior illuminance from solar geometry, then the interior illuminance as E = DF × E_ext.",
      step3Title: "Read DAo & DAo.con",
      step3Body:
        "DAo is the share of occupied time the space stays above your lux target; DAo.con also credits partial daylight. Results render as gauges, curves and heatmaps.",
    },
    science: {
      eyebrow: "The science",
      title: "A faithful annual daylight model",
      subtitle:
        "This tool reproduces the original University of Seville workbook exactly. DAo is *independent of orientation and location* because it builds on the static Daylight Factor — yet the conversion still accounts for latitude, schedule and your illuminance threshold.",
      tryNow: "Try it now",
      skyNote: "CIE Standard Overcast Sky · 300 lx default",
      chain1: "Solar geometry",
      chain1d: "δ, equation of time, hour angle",
      chain2: "Solar elevation",
      chain2d: "γ = f(δ, latitude, H)",
      chain3: "Exterior illuminance",
      chain3d: "CIE overcast: (7/9)π(100 + 7580·sinγ^1.36)",
      chain4: "Interior illuminance",
      chain4d: "E_int = E_ext × DF/100",
      chain5: "DAo / DAo.con",
      chain5d: "count & continuous credit vs. threshold",
    },
    metrics: {
      eyebrow: "The metrics",
      title: "Two metrics, one clear picture",
      daoTitle: "Overcast Daylight Autonomy",
      daoBody:
        "The percentage of occupied time a point stays at or above the target illuminance (typically 300 lx) under overcast skies — the worst-case daylight scenario.",
      daoExample: "DAo = 50% → half the occupied hours need no electric light.",
      conTitle: "Continuous Overcast Daylight Autonomy",
      conBody:
        "A nuanced version that also credits partial daylight: a point at 150 lx against a 300 lx target contributes 0.5 instead of being discarded.",
      conExample: "DAo.con = 0.75 → on average 75% of the target is reached.",
      modesTitle: "Three ways to calculate",
      modesSubtitle: "From a single DF reading to a full floor-plan heatmap.",
      modeSingle: "Single point",
      modeSection: "Vertical section",
      modeMatrix: "Plan matrix",
    },
    cta: {
      title: "Make daylight performance obvious.",
      subtitle:
        "Open the calculator and convert your Daylight Factors into DAo and DAo.con — no install, no spreadsheet, instant visuals.",
      button: "Launch the calculator",
    },
    footer: {
      tagline:
        "An open scientific tool to convert Daylight Factor into Overcast Daylight Autonomy, faithful to the original University of Seville method.",
      calculator: "Calculator",
      method: "Method",
      referencesTitle: "Methodology & references",
      copyright:
        "Calculation method © I. Acosta & M. A. Campano, University of Seville. Reimplemented for the web.",
      validated: "Validated to 0.000% error against the reference workbook.",
    },
    calc: {
      title: "DAo Calculator",
      subtitle:
        "Convert Daylight Factor into Overcast Daylight Autonomy — adjust the parameters and pick a calculation mode.",
      tabSingle: "Single point",
      tabSection: "Vertical section",
      tabMatrix: "Plan matrix",
    },
    params: {
      title: "Parameters",
      reset: "Reset",
      location: "Location",
      latitude: "Latitude",
      latitudeHint:
        "Site latitude in degrees. Drives the annual solar-elevation profile that feeds the overcast-sky illuminance.",
      longitude: "Longitude",
      longitudeHint: "Degrees east of Greenwich. Affects only the small solar-time correction.",
      timezone: "Time zone",
      timezoneHint: "Standard UTC offset in hours (e.g. +1 for Central European Time).",
      dst: "Daylight saving",
      dstHint: "Apply the European summer-time shift when converting clock time to solar time.",
      schedule: "Occupancy schedule",
      checkin: "Check-in",
      checkinHint: "Start of the occupied period (local clock time).",
      checkout: "Check-out",
      checkoutHint: "End of the occupied period (exclusive).",
      weekend: "Exclude weekends",
      weekendHint: "Count only the 260 model weekdays, matching the reference workbook.",
      break: "Lunch break",
      breakHint: "Remove a daily non-occupied window (e.g. 11:00–12:00) from the metrics.",
      breakStart: "Break start",
      breakEnd: "Break end",
      target: "Illuminance target",
      threshold: "Threshold",
      thresholdHint: "Minimum illuminance considered 'enough daylight' (typically 300 lx).",
    },
    single: {
      title: "Single point",
      subtitle: "Convert one Daylight Factor reading into DAo and DAo.con.",
      dfHint:
        "The point's Daylight Factor: interior/exterior horizontal illuminance under an overcast sky, as a percentage.",
      performance: "Performance",
      exportCsv: "Export CSV",
      curveTitle: "Response curve",
      curveSubtitle: "How DAo and DAo.con grow with the Daylight Factor.",
    },
    section: {
      title: "Vertical section",
      subtitle:
        "A list of points across a section — typically DF decreasing with depth from the window.",
      colDist: "Dist. (m)",
      colDf: "DF (%)",
      colDao: "DAo",
      addPoint: "Add point",
      profileTitle: "Section profile",
      profileSubtitle: "DAo and DAo.con along the section depth.",
      byDepth: "Daylight autonomy by depth",
      emptyTitle: "Add at least two points",
      emptyBody:
        "A section needs two or more readings to plot how daylight autonomy changes with depth.",
      distanceAxis: "Distance from façade (m)",
      window: "Window",
      deep: "Deep",
    },
    matrix: {
      title: "Plan matrix",
      subtitle:
        "A grid of DF readings across a floor plan. Cells are tinted by their DAo as you type.",
      rows: "Rows",
      rowsHint: "Number of grid rows (depth into the room).",
      cols: "Columns",
      colsHint: "Number of grid columns (room width).",
      spacing: "Spacing",
      spacingHint: "Distance between grid nodes, for axis labels.",
      sampleFill: "Sample fill",
      heatmap: "Heatmap",
      meanDao: "Mean DAo",
      min: "Min",
      max: "Max",
      coverage: "Area ≥ 50%",
      metricDao: "DAo",
      metricCon: "DAo.con",
      metricDf: "Daylight Factor",
      noteDf: "Showing the raw Daylight Factor input.",
      noteOther:
        "Each node converts its DF into the selected metric using the parameters on the left.",
    },
    heatmap: {
      depth: "Depth →",
      window: "Window",
      width: "Width →",
      cell: "Cell",
    },
    bands: {
      excellent: "Excellent",
      excellentDesc: "Strong daylighting even under overcast skies.",
      good: "Good",
      goodDesc: "Reliable daylight for most occupied hours.",
      fair: "Fair",
      fairDesc: "Daylight supports part of the occupied time.",
      low: "Low",
      lowDesc: "Electric lighting needed most of the time.",
    },
    chart: {
      dfAxis: "Daylight Factor (%)",
    },
    widgets: {
      solar: {
        title: "Solar path & available light",
        time: "Time",
        elevation: "Solar elevation",
        extIll: "Exterior light",
        day: "Day of year",
        latitude: "Latitude",
        note: "Peak elevation today: {peak}°. The higher the sun climbs, the more overcast-sky illuminance there is — and the higher the DAo.",
      },
      annual: {
        title: "Annual light calendar",
        subtitle:
          "Overcast-sky exterior illuminance across the year and the day. Adjust the latitude to see the effect.",
        hover: "{date} at {time}: {value} lx",
        hint: "Hover the map to read the exterior light at any moment.",
      },
      depth: {
        title: "How light falls with depth",
        subtitle:
          "DF — and with it DAo — drops as you move away from the window. Each circle is the DAo at that point.",
        window: "Window",
        back: "Room back",
        windowDf: "DF at the window",
        roomDepth: "Room depth",
        note: "Illustrative model of DF decay with depth; each point converts its DF into DAo with the real engine.",
      },
      compare: {
        title: "Compare two scenarios",
        subtitle:
          "Change DF, latitude and threshold in each column and compare their DAo instantly.",
        delta: "Difference:",
        deltaTail: "in DAo",
        scenario: "Scenario",
      },
    },
    explore: {
      eyebrow: "Explore",
      title: "Bring it to your space",
      subtitle:
        "Play with room depth and compare design scenarios — all driven by the real calculation engine.",
    },
    common: {
      autonomy: "autonomy",
      continuous: "continuous",
      language: "Language",
      theme: "Toggle theme",
    },
  },
} as const;
