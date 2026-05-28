export type Lang = "es" | "en";

export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

/**
 * UI string dictionary. Spanish is written natively (not translated from the
 * English) and the English mirrors it. Use `*term*` to emphasise a term as
 * <strong> (rendered by the `T` / `renderEmphasis` helper).
 */
export const translations = {
  es: {
    nav: {
      how: "Cómo funciona",
      science: "El método",
      metrics: "Métricas",
      openCalculator: "Abrir calculadora",
    },
    hero: {
      badge: "Método de la Universidad de Sevilla, reproducido con fidelidad",
      titlePre: "Convierte un ",
      titleHighlight: "Factor de Luz Diurna",
      titlePost: " en autonomía de luz natural con cielo cubierto, al instante.",
      subtitle:
        "Una calculadora científica que traduce el *DF*, un dato estático, a las métricas dinámicas *DAo* y *DAo.con*: para un punto, una sección vertical o la planta completa, con mapas de calor y curvas de respuesta.",
      ctaOpen: "Abrir la calculadora",
      ctaMethod: "Ver el método",
      statModes: "Modos de cálculo",
      statSamples: "Muestras de cielo por punto",
      statError: "Error frente a la referencia",
      liveConversion: "Conversión interactiva",
      daylightFactor: "Factor de Luz Diurna",
      scroll: "Desliza",
      demoNote:
        "Calculado para 37° de latitud, jornada de 08:00 a 17:00 y un objetivo de 300 lx. Todo se puede ajustar dentro de la calculadora.",
    },
    how: {
      eyebrow: "Cómo funciona",
      title: "Del Factor de Luz Diurna al DAo, paso a paso",
      subtitle:
        "Lo difícil, simular un año entero de cielo cubierto, sucede en tu navegador en milisegundos. Tú solo aportas el Factor de Luz Diurna.",
      step1Title: "Introduce el Factor de Luz Diurna",
      step1Body:
        "Aporta el DF en un punto, a lo largo de una sección vertical o en una malla de toda la planta. El DF es un indicador estático del comportamiento lumínico del espacio y, bajo cielo cubierto, no depende de hacia dónde miren las ventanas.",
      step2Title: "Modelamos el cielo cubierto",
      step2Body:
        "Para cada intervalo de 15 minutos del año ocupado calculamos, a partir de la geometría solar, la iluminancia exterior bajo cielo cubierto CIE; de ahí sale la interior: E_int = E_ext · DF / 100.",
      step3Title: "Lee el DAo y el DAo.con",
      step3Body:
        "El DAo es la fracción del tiempo ocupado en que el punto iguala o supera tu objetivo en lux; el DAo.con, además, reconoce la luz parcial. Lo verás en medidores, curvas y mapas de calor.",
    },
    science: {
      eyebrow: "El método",
      title: "Un modelo anual de luz natural fiel al original",
      subtitle:
        "Esta herramienta reproduce con exactitud la hoja de cálculo original de la Universidad de Sevilla. El *Factor de Luz Diurna no depende de la orientación*, porque el cielo cubierto reparte su luz por igual en todas las direcciones; el *DAo*, en cambio, sí depende de la latitud, del horario y del umbral de iluminancia que fijes.",
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
      chain5d: "recuento y crédito continuo frente al umbral",
      legend:
        "γ elevación solar · δ declinación · φ latitud · H ángulo horario · d día del año (d₀ referencia) · E_ext luz exterior · Eₜ umbral · N pasos ocupados al año · ⟨·⟩ media.",
    },
    metrics: {
      eyebrow: "Las métricas",
      title: "Dos cifras que se entienden a la primera",
      daoTitle: "Autonomía lumínica con cielo cubierto",
      daoBody:
        "Porcentaje del tiempo ocupado en que un punto iguala o supera la iluminancia objetivo (habitualmente 300 lx) con cielo cubierto, el escenario más desfavorable para la luz natural.",
      daoExample: "DAo = 50 % → durante la mitad de la jornada no hace falta encender la luz.",
      daoUnit: "% del tiempo",
      conTitle: "Autonomía lumínica continua con cielo cubierto",
      conBody:
        "Una versión más fina que también puntúa la luz parcial: un punto con 150 lx frente a un objetivo de 300 lx suma 0,5 en lugar de descartarse.",
      conExample: "DAo.con = 75 % → de media se alcanza el 75 % del objetivo.",
      conUnit: "% del objetivo",
      modesTitle: "Tres formas de calcular",
      modesSubtitle: "Desde una sola lectura de DF hasta el mapa de calor de toda la planta.",
      modeSingle: "Punto individual",
      modeSection: "Sección vertical",
      modeMatrix: "Matriz de planta",
    },
    cta: {
      title: "Pon números a la luz natural de tu proyecto.",
      subtitle:
        "Abre la calculadora y convierte tus Factores de Luz Diurna en DAo y DAo.con. Sin instalar nada, sin hojas de cálculo y con gráficos al momento.",
      button: "Abrir la calculadora",
    },
    footer: {
      tagline:
        "Una herramienta abierta para convertir el Factor de Luz Diurna en autonomía lumínica con cielo cubierto, fiel al método original de la Universidad de Sevilla.",
      calculator: "Calculadora",
      method: "Método",
      referencesTitle: "Metodología y referencias",
      copyright:
        "Método de cálculo © I. Acosta y M. A. Campano, Universidad de Sevilla. Adaptación para la web.",
      validated: "Validado con un error del 0,000 % frente a la hoja de cálculo de referencia.",
    },
    calc: {
      title: "Calculadora DAo",
      subtitle:
        "Convierte el Factor de Luz Diurna en autonomía lumínica con cielo cubierto. Ajusta los parámetros y elige un modo de cálculo.",
      tabSingle: "Punto individual",
      tabSection: "Sección vertical",
      tabMatrix: "Matriz de planta",
    },
    params: {
      title: "Parámetros",
      reset: "Restablecer",
      location: "Emplazamiento",
      latitude: "Latitud",
      latitudeHint:
        "Latitud del emplazamiento, en grados. Define el perfil anual de elevación solar del que depende la iluminancia con cielo cubierto.",
      longitude: "Longitud",
      longitudeHint: "Grados al este de Greenwich. Solo interviene en la pequeña corrección de tiempo solar.",
      timezone: "Huso horario",
      timezoneHint: "Desfase respecto a UTC, en horas (p. ej. +1 para la hora central europea).",
      dst: "Horario de verano",
      dstHint: "Aplica el cambio de hora europeo al pasar de la hora oficial al tiempo solar.",
      schedule: "Horario de ocupación",
      checkin: "Entrada",
      checkinHint: "Hora a la que empieza la ocupación (hora local).",
      checkout: "Salida",
      checkoutHint: "Hora a la que termina la ocupación (no se incluye).",
      weekend: "Excluir fines de semana",
      weekendHint: "Cuenta solo los 260 días laborables del modelo, igual que la hoja de referencia.",
      break: "Pausa de mediodía",
      breakHint: "Descuenta de las métricas una franja diaria sin ocupación (p. ej. de 11:00 a 12:00).",
      breakStart: "Inicio de la pausa",
      breakEnd: "Fin de la pausa",
      target: "Objetivo de iluminancia",
      threshold: "Umbral",
      thresholdHint: "Iluminancia mínima que se considera «luz suficiente» (habitualmente 300 lx).",
    },
    single: {
      title: "Punto individual",
      subtitle: "Convierte una lectura de Factor de Luz Diurna en DAo y DAo.con.",
      dfHint:
        "El Factor de Luz Diurna del punto: el cociente entre la iluminancia horizontal interior y la exterior con cielo cubierto, expresado en porcentaje.",
      performance: "Valoración",
      exportCsv: "Exportar CSV",
      curveTitle: "Curva de respuesta",
      curveSubtitle: "Cómo crecen el DAo y el DAo.con al aumentar el Factor de Luz Diurna.",
    },
    section: {
      title: "Sección vertical",
      subtitle:
        "Una serie de puntos a lo largo de una sección; lo habitual es que el DF disminuya a medida que te alejas de la ventana.",
      colDist: "Dist. (m)",
      colDf: "DF (%)",
      colDao: "DAo",
      addPoint: "Añadir punto",
      profileTitle: "Perfil de la sección",
      profileSubtitle: "DAo y DAo.con según la profundidad de la sección.",
      byDepth: "Autonomía lumínica por profundidad",
      emptyTitle: "Añade al menos dos puntos",
      emptyBody:
        "Una sección necesita dos lecturas como mínimo para dibujar cómo cambia la autonomía lumínica con la profundidad.",
      distanceAxis: "Distancia a la fachada (m)",
      window: "Ventana",
      deep: "Fondo",
    },
    matrix: {
      title: "Matriz de planta",
      subtitle:
        "Una malla de lecturas de DF sobre la planta. Cada celda se colorea según su DAo a medida que escribes.",
      rows: "Filas",
      rowsHint: "Número de filas de la malla (profundidad de la sala).",
      cols: "Columnas",
      colsHint: "Número de columnas de la malla (anchura de la sala).",
      spacing: "Separación",
      spacingHint: "Distancia entre nodos de la malla, para las etiquetas de los ejes.",
      sampleFill: "Rellenar de ejemplo",
      heatmap: "Mapa de calor",
      meanDao: "DAo medio",
      min: "Mín",
      max: "Máx",
      coverage: "Área ≥ 50 %",
      metricDao: "DAo",
      metricCon: "DAo.con",
      metricDf: "Factor de Luz Diurna",
      noteDf: "Se muestra el Factor de Luz Diurna introducido.",
      noteOther:
        "Cada nodo convierte su DF en la métrica elegida con los parámetros de la izquierda.",
    },
    heatmap: {
      depth: "Profundidad",
      window: "Ventana",
      back: "Fondo",
      width: "Anchura",
      cell: "Celda",
    },
    bands: {
      excellent: "Excelente",
      excellentDesc: "Luz natural excelente incluso con cielo cubierto.",
      good: "Bueno",
      goodDesc: "Luz natural fiable durante la mayor parte de la jornada.",
      fair: "Aceptable",
      fairDesc: "La luz natural cubre parte del tiempo ocupado.",
      low: "Bajo",
      lowDesc: "Se necesita luz eléctrica casi todo el tiempo.",
    },
    chart: {
      dfAxis: "Factor de Luz Diurna (%)",
    },
    widgets: {
      solar: {
        title: "Recorrido solar y luz disponible",
        time: "Hora",
        elevation: "Elevación solar",
        extIll: "Luz exterior",
        day: "Día del año",
        latitude: "Latitud",
        note: "Elevación máxima del día: {peak}°. Cuanto más alto sube el sol, más ilumina el cielo cubierto y mayor es el DAo.",
      },
      annual: {
        title: "Calendario anual de luz",
        subtitle:
          "Iluminancia exterior con cielo cubierto a lo largo del año y del día. Mueve la latitud para ver cómo cambia.",
        hover: "{date} a las {time}: {value} lx",
        hint: "Pasa el cursor por el mapa para leer la luz exterior en cada momento.",
      },
      depth: {
        title: "Cómo decae la luz hacia el fondo de la sala",
        subtitle:
          "El DF, y con él el DAo, baja a medida que te alejas de la ventana. Cada círculo es el DAo en ese punto.",
        window: "Ventana",
        back: "Fondo de la sala",
        windowDf: "DF junto a la ventana",
        roomDepth: "Profundidad de la sala",
        note: "Esquema ilustrativo del decaimiento del DF con la profundidad; el DAo de cada punto sí se calcula con el motor real.",
      },
      compare: {
        title: "Compara dos escenarios",
        subtitle:
          "Cambia el DF, la latitud y el umbral en cada columna y compara su DAo al instante.",
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
    notFound: {
      code: "404",
      title: "Esta página no existe",
      body: "El enlace que has seguido no lleva a ninguna parte. Vuelve al inicio o abre la calculadora.",
      home: "Volver al inicio",
      calc: "Abrir la calculadora",
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
      science: "The method",
      metrics: "Metrics",
      openCalculator: "Open calculator",
    },
    hero: {
      badge: "A faithful reimplementation of the University of Seville method",
      titlePre: "Turn a ",
      titleHighlight: "Daylight Factor",
      titlePost: " into overcast daylight autonomy, instantly.",
      subtitle:
        "A scientific calculator that turns the static *DF* into the dynamic *DAo* and *DAo.con* metrics: for a single point, a vertical section or a whole floor-plan matrix, with heatmaps and response curves.",
      ctaOpen: "Open the calculator",
      ctaMethod: "See the method",
      statModes: "Calculation modes",
      statSamples: "Sky samples / point",
      statError: "Error vs. reference",
      liveConversion: "Interactive conversion",
      daylightFactor: "Daylight Factor",
      scroll: "Scroll",
      demoNote:
        "Computed for latitude 37°, an 08:00–17:00 schedule and a 300 lx target. Everything is adjustable inside the calculator.",
    },
    how: {
      eyebrow: "How it works",
      title: "From Daylight Factor to DAo, step by step",
      subtitle:
        "The hard part, simulating a full overcast-sky year, happens in your browser in milliseconds. You only ever supply the Daylight Factor.",
      step1Title: "Enter the Daylight Factor",
      step1Body:
        "Provide DF at a point, along a vertical section, or across a whole floor-plan grid. DF is a static indicator of a space's daylight performance and, under an overcast sky, it doesn't depend on which way the windows face.",
      step2Title: "We model the overcast sky",
      step2Body:
        "For every 15-minute step of the occupied year we compute the CIE overcast-sky exterior illuminance from solar geometry, then the interior illuminance as E_int = E_ext × DF/100.",
      step3Title: "Read DAo & DAo.con",
      step3Body:
        "DAo is the share of occupied time the point meets or beats your lux target; DAo.con also credits partial daylight. Results render as gauges, curves and heatmaps.",
    },
    science: {
      eyebrow: "The method",
      title: "A faithful annual daylight model",
      subtitle:
        "This tool reproduces the original University of Seville workbook exactly. The *Daylight Factor is orientation-independent*, because an overcast sky spreads its light evenly in every direction; *DAo*, however, does depend on latitude, schedule and the illuminance threshold you set.",
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
      legend:
        "γ solar elevation · δ declination · φ latitude · H hour angle · d day of year (d₀ reference) · E_ext exterior light · Eₜ threshold · N occupied steps per year · ⟨·⟩ mean.",
    },
    metrics: {
      eyebrow: "The metrics",
      title: "Two figures you grasp at a glance",
      daoTitle: "Overcast Daylight Autonomy",
      daoBody:
        "The percentage of occupied time a point meets or beats the target illuminance (typically 300 lx) under an overcast sky, the worst case for daylight.",
      daoExample: "DAo = 50% → for half the working day no electric light is needed.",
      daoUnit: "% of time",
      conTitle: "Continuous Overcast Daylight Autonomy",
      conBody:
        "A finer version that also credits partial daylight: a point at 150 lx against a 300 lx target contributes 0.5 instead of being discarded.",
      conExample: "DAo.con = 75% → on average, 75% of the target is reached.",
      conUnit: "% of target",
      modesTitle: "Three ways to calculate",
      modesSubtitle: "From a single DF reading to a full floor-plan heatmap.",
      modeSingle: "Single point",
      modeSection: "Vertical section",
      modeMatrix: "Plan matrix",
    },
    cta: {
      title: "Put numbers on your project's daylight.",
      subtitle:
        "Open the calculator and convert your Daylight Factors into DAo and DAo.con. No install, no spreadsheet, visuals straight away.",
      button: "Open the calculator",
    },
    footer: {
      tagline:
        "An open tool to convert Daylight Factor into overcast daylight autonomy, faithful to the original University of Seville method.",
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
        "Convert Daylight Factor into overcast daylight autonomy. Adjust the parameters and pick a calculation mode.",
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
      performance: "Rating",
      exportCsv: "Export CSV",
      curveTitle: "Response curve",
      curveSubtitle: "How DAo and DAo.con grow as the Daylight Factor rises.",
    },
    section: {
      title: "Vertical section",
      subtitle:
        "A list of points across a section, where DF usually drops as you move away from the window.",
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
      depth: "Depth",
      window: "Window",
      back: "Back",
      width: "Width",
      cell: "Cell",
    },
    bands: {
      excellent: "Excellent",
      excellentDesc: "Strong daylighting even under overcast skies.",
      good: "Good",
      goodDesc: "Reliable daylight for most of the working day.",
      fair: "Fair",
      fairDesc: "Daylight supports part of the occupied time.",
      low: "Low",
      lowDesc: "Electric lighting needed almost all the time.",
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
        note: "Peak elevation today: {peak}°. The higher the sun climbs, the more overcast-sky illuminance there is, and the higher the DAo.",
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
          "DF, and with it DAo, drops as you move away from the window. Each circle is the DAo at that point.",
        window: "Window",
        back: "Room back",
        windowDf: "DF at the window",
        roomDepth: "Room depth",
        note: "Illustrative model of DF decay with depth; each point's DAo is computed with the real engine.",
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
        "Play with room depth and compare design scenarios, all driven by the real calculation engine.",
    },
    notFound: {
      code: "404",
      title: "This page doesn't exist",
      body: "The link you followed doesn't lead anywhere. Head back home or open the calculator.",
      home: "Back to home",
      calc: "Open the calculator",
    },
    common: {
      autonomy: "autonomy",
      continuous: "continuous",
      language: "Language",
      theme: "Toggle theme",
    },
  },
} as const;
