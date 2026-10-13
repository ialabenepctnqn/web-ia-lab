/* Las tarjetas conservan filtros, galería y enlaces del sitio existente. */
(() => {
    "use strict";
    const nodo = (tag, texto, clase) => {
        const elemento = document.createElement(tag);
        if (texto !== undefined) elemento.textContent = texto;
        if (clase) elemento.className = clase;
        return elemento;
    };
    function tarjeta(e, servidor, hoy) {
        const pasada = Boolean(e.fecha && (e.fecha_fin || e.fecha) < hoy);
        const card = nodo("div", undefined, "event-card");
        card.id = e.ancla || `ev-agenda-${e.id}`;
        card.dataset.tipo = e.cancelado ? "cancelado" : pasada ? "pasado" : "proximo";
        card.dataset.fecha = e.fecha_fin || e.fecha || "";
        if (e.cancelado) card.dataset.cancelado = "true";
        if (pasada) card.classList.add("event-card-past");
        const header = nodo("div", undefined, "event-card-header");
        header.append(nodo("span", e.categoria || "Evento", "event-badge"));
        if (e.cancelado) header.append(nodo("span", "Cancelado", "event-past-tag"));
        card.append(header);
        let fecha = e.fecha ? new Date(`${e.fecha}T12:00:00`).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" }) : e.fecha_texto || "Fecha a confirmar";
        if (e.fecha_fin && e.fecha_fin !== e.fecha) fecha += ` al ${new Date(`${e.fecha_fin}T12:00:00`).toLocaleDateString("es-AR")}`;
        if (e.hora) fecha += ` · ${e.hora.slice(0, 5)}${e.hora_fin ? ` a ${e.hora_fin.slice(0, 5)}` : ""} hs`;
        card.append(nodo("div", fecha, "event-date"), nodo("h3", e.titulo, "event-title"), nodo("p", e.descripcion, "event-desc"));
        const meta = nodo("div", undefined, "event-meta");
        [e.lugar, e.organizador, e.publico].filter(Boolean).forEach(texto => meta.append(nodo("span", texto)));
        card.append(meta);
        const footer = nodo("div", undefined, "event-card-footer");
        if (e.flyers.length) {
            const boton = nodo("button", "Ver flyers", "btn-outline event-detail-btn");
            boton.type = "button";
            boton.dataset.flyers = e.flyers.map(id => `${servidor}/agenda/eventos/${e.id}/flyers/${id}`).join(",");
            boton.dataset.title = e.titulo;
            footer.append(boton);
        }
        if (e.inscripcion && !e.cancelado && !pasada) {
            const url = new URL(e.inscripcion);
            if (["https:", "http:"].includes(url.protocol) && !url.username && !url.password) {
                const enlace = nodo("a", "Inscribirme", "btn-outline");
                enlace.href = url.href; enlace.target = "_blank"; enlace.rel = "noopener noreferrer";
                footer.append(enlace);
            }
        }
        card.append(footer);
        return card;
    }
    function verificar(datos) {
        if (!datos || typeof datos.activa !== "boolean" || !Array.isArray(datos.eventos)) throw new Error("Agenda inválida");
        datos.eventos.forEach(e => {
            if (!Number.isSafeInteger(e.id) || typeof e.titulo !== "string" || typeof e.descripcion !== "string" ||
                !Array.isArray(e.flyers) || e.flyers.some(id => !Number.isSafeInteger(id)) ||
                (e.ancla && !/^[a-zA-Z0-9_-]+$/.test(e.ancla))) throw new Error("Evento inválido");
        });
    }
    window.cargarAgendaIALAB = async () => {
        const aviso = document.getElementById("agenda-aviso");
        const control = new AbortController();
        const espera = setTimeout(() => control.abort(), 20000);
        try {
            aviso.textContent = "Consultando la agenda…";
            const servidor = new URL(window.IA_LAB_AGENDA_URL);
            if (!["https:", "http:"].includes(servidor.protocol) || servidor.username || servidor.password) throw new Error("Servidor inválido");
            const respuesta = await fetch(`${servidor.origin}/agenda/eventos`, { signal: control.signal, cache: "no-store", credentials: "omit" });
            if (!respuesta.ok) throw new Error("Agenda no disponible");
            const datos = await respuesta.json(); verificar(datos);
            if (!datos.activa) {
                aviso.textContent = "La agenda automática está en preparación. Se muestran los eventos cargados previamente.";
                return;
            }
            const hoy = new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Argentina/Buenos_Aires" }).format(new Date());
            const orden = (e) => e.cancelado ? 2 : e.fecha && (e.fecha_fin || e.fecha) < hoy ? 1 : 0;
            const eventos = [...datos.eventos].sort((a, b) => orden(a) - orden(b) ||
                (orden(a) === 1 ? (b.fecha || "").localeCompare(a.fecha || "") : (a.fecha || "9999").localeCompare(b.fecha || "9999")));
            // Preparar todo antes de reemplazar: un error no deja la agenda a medias.
            const tarjetas = eventos.map(e => tarjeta(e, servidor.origin, hoy));
            const vacio = document.getElementById("events-empty");
            document.getElementById("events-grid").replaceChildren(...tarjetas, vacio);
            vacio.style.display = tarjetas.length ? "none" : "block";
            aviso.textContent = "";
        } catch (_) {
            aviso.textContent = "No pudimos actualizar la agenda. Estos eventos corresponden a la última carga del sitio y pueden estar desactualizados; confirmá los detalles con ENE.";
        } finally { clearTimeout(espera); }
    };
})();
