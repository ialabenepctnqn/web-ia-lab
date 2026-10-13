// node --test tests/agenda.test.js — sin servidor ni dependencias adicionales.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const { runInNewContext } = require("node:vm");
class Elemento {
    constructor(tag = "div") {
        this.tag = tag; this.children = []; this.dataset = {}; this.style = {}; this.textContent = "";
        this.classList = { add: (clase) => { this.className = `${this.className || ""} ${clase}`; } };
    }
    append(...nodos) { this.children.push(...nodos); }
    replaceChildren(...nodos) { this.children = nodos; }
    set innerHTML(_) { throw new Error("No interpretar HTML del evento"); }
}
function preparar(respuesta, fallo = false) {
    const nodos = { "agenda-aviso": new Elemento("p"), "events-grid": new Elemento(), "events-empty": new Elemento() };
    const anterior = new Elemento(); anterior.textContent = "Anterior";
    nodos["events-grid"].append(anterior, nodos["events-empty"]);
    const window = { IA_LAB_AGENDA_URL: "https://chatbotene.onrender.com" };
    runInNewContext(readFileSync(join(__dirname, "../js/agenda.js"), "utf8"), {
        window, document: { getElementById: id => nodos[id], createElement: tag => new Elemento(tag) },
        URL, AbortController, setTimeout, clearTimeout, Date, Intl,
        fetch: async (url, opciones) => {
            assert.equal(url, "https://chatbotene.onrender.com/agenda/eventos");
            assert.equal(opciones.credentials, "omit");
            if (fallo) throw new Error("Sin conexión");
            return { ok: true, json: async () => respuesta };
        },
    });
    return { nodos, window };
}
const base = { id: 1, ancla: "ev-heredado", titulo: "<script>literal</script>", descripcion: "Descripción", categoria: "Charla", fecha: "2099-11-05", lugar: "ENE", flyers: [8], inscripcion: "https://example.com/form" };
test("Publicación segura conserva ancla, galería e inscripción", async () => {
    const { nodos, window } = preparar({ activa: true, eventos: [base] });
    await window.cargarAgendaIALAB();
    const card = nodos["events-grid"].children[0];
    assert.equal(card.id, "ev-heredado");
    assert.equal(card.children.find(n => n.tag === "h3").textContent, base.titulo);
    const footer = card.children.at(-1);
    assert.equal(footer.children[0].dataset.flyers, "https://chatbotene.onrender.com/agenda/eventos/1/flyers/8");
    assert.equal(footer.children[1].href, "https://example.com/form");
    assert.equal(nodos["agenda-aviso"].textContent, "");
});
test("Cancelados no invitan a inscribirse", async () => {
    const { nodos, window } = preparar({ activa: true, eventos: [{ ...base, cancelado: true }] });
    await window.cargarAgendaIALAB();
    const card = nodos["events-grid"].children[0];
    assert.equal(card.dataset.tipo, "cancelado");
    assert.equal(card.dataset.cancelado, "true");
    assert.equal(card.children.at(-1).children.length, 1);
});
test("Agenda activa y vacía retira el contenido anterior", async () => {
    const { nodos, window } = preparar({ activa: true, eventos: [] });
    await window.cargarAgendaIALAB();
    assert.equal(nodos["events-grid"].children.length, 1);
    assert.equal(nodos["events-empty"].style.display, "block");
});
test("Fecha pendiente no recibe día ni horario inventado", async () => {
    const { nodos, window } = preparar({ activa: true, eventos: [{ ...base, fecha: null, fecha_texto: "Noviembre, día pendiente" }] });
    await window.cargarAgendaIALAB();
    const card = nodos["events-grid"].children[0];
    assert.equal(card.dataset.fecha, "");
    assert.equal(card.children.find(n => n.className === "event-date").textContent, "Noviembre, día pendiente");
});
test("Agenda desactivada conserva las tarjetas con aviso", async () => {
    const { nodos, window } = preparar({ activa: false, eventos: [] });
    await window.cargarAgendaIALAB();
    assert.equal(nodos["events-grid"].children[0].textContent, "Anterior");
    assert.match(nodos["agenda-aviso"].textContent, /preparación/);
});
test("Fallo o datos inválidos no dejan un reemplazo parcial", async () => {
    for (const [datos, fallo] of [[null, true], [{ activa: true, eventos: [base, { ...base, id: "inválido" }] }, false]]) {
        const { nodos, window } = preparar(datos, fallo);
        await window.cargarAgendaIALAB();
        assert.equal(nodos["events-grid"].children[0].textContent, "Anterior");
        assert.match(nodos["agenda-aviso"].textContent, /desactualizados/);
    }
});
