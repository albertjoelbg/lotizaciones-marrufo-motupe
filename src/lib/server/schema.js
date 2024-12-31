import {
    integer,
    smallint,
    text,
    varchar,
    numeric,
    char,
    serial,
    smallserial,
    pgTable,
    uniqueIndex
} from "drizzle-orm/pg-core";

import {relations} from 'drizzle-orm';

export const agente = pgTable("agente", {
    idAgente: smallint("id_agente").notNull().primaryKey(),
    nombreAgente: varchar("nombre_agente", {length: 50}).notNull(),
    apellidoAgente: varchar("apellido_agente", {length: 50}).notNull(),
    urlFoto: text("url_foto"),
    celular: char("celular", {length: 9}),
});

export const estadoLote = pgTable("estado_lote", {
    idEstadoLote: smallserial("id_estado_lote").notNull().primaryKey(),
    nombreEstado: varchar("nombre_estado", {length: 50}).notNull(),
});

export const imagenes = pgTable("imagenes", {
    idImagen: serial("id_imagen").notNull().primaryKey(),
    idLote: smallint("id_lote").notNull(),
    url: text("url").notNull(),
    descripcion: text("descripcion"),
});

export const lote = pgTable("lote", {
    idEstadoLote: smallint("id_estado_lote").notNull(),
    idLote: smallserial("id_lote").notNull().primaryKey(),
    idManzana: smallint("id_manzana").notNull(),
    idAgente: smallint("id_agente").notNull(),
    idUbicacion: smallint("id_ubicacion").notNull(),
    numero: smallint("numero").notNull(),
    precioContado: numeric("precio_contado", {precision: 10, scale: 2}).notNull(),
    precioFinanciado: numeric("precio_financiado", {precision: 10, scale: 2}).notNull(),
    urlImagenPrincipal: text("url_image_principal"),
}, (lote) => ({
    uniqueLoteManzanaNumero: uniqueIndex("lotes_manzana_id_numero_key").on(lote.idManzana, lote.numero),
}));

export const manzana = pgTable("manzana", {
    idManzana: smallserial("id_mazana").notNull().primaryKey(),
    idPredio: integer("id_predio").notNull(),
    letra: char("letra", {length: 1}).notNull(),
}, (manzana) => ({
    uniqueManzanaPredioLetra: uniqueIndex("manzana_predio_letra").on(manzana.idPredio, manzana.letra),
}));

export const predio = pgTable("predio", {
    idPredio: smallint("id_predio").notNull().primaryKey(),
    ubicacion: text("ubicacion"),
});

export const ubicacion = pgTable("ubicacion", {
    idUbicacion: smallint("id_ubicacion").notNull().primaryKey(),
    nombreUbicacion: varchar("nombre_ubicacion", {length: 50}).notNull(),
}, (ubicacion) => ({
    uniqueUbicacionNombreUbicacion: uniqueIndex("ubicacion_nombre_ubicacion").on(ubicacion.nombreUbicacion),
}));

export const agenteRelations = relations(agente, ({many}) => ({
    lotes: many(lote),
}));

export const loteRelations = relations(lote, ({one}) => ({
    agente: one(agente, {
        fields: [lote.idAgente],
        references: [agente.idAgente],
    })
}));