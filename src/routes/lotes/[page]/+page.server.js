import {db} from "$lib/server/db.js";
import {eq} from "drizzle-orm";
import {lote, agente, manzana, ubicacion} from "$lib/server/schema.js";

export async function load({params}) {
    const page = parseInt(params.page);
    const limit = 10;
    try {
        const lotes = await db.select({
            predio: manzana.idPredio,
            numeroLote: lote.numero,
            manzana: manzana.letra,
            ubicacionLote: ubicacion.nombreUbicacion,
            nombreAgente: agente.nombreAgente,
            apellidoAgente: agente.apellidoAgente,
            precioContado: lote.precioContado,
            precioFinanciado: lote.precioFinanciado,
            urlImagenPrincipal: lote.urlImagenPrincipal,
        }).from(lote)
            .innerJoin(agente, eq(lote.idAgente, agente.idAgente))
            .innerJoin(ubicacion, eq(lote.idUbicacion, ubicacion.idUbicacion))
            .innerJoin(manzana, eq(lote.idManzana, manzana.idManzana))
            .limit(limit)
            .offset((page - 1) * limit);

        console.log("Consulta exitosa:", lotes);

        return {
            lotes: lotes ?? []
        };
    } catch (error) {
        console.error("Error ejecutando la consulta:", error);
        return {error};
    }
}
