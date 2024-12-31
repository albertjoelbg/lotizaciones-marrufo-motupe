<script>
    let {data} = $props();

    let pageSize = 10;

    function capitalizeFirstLetter(cadena) {
        return cadena
            .split(' ')
            .map(elem => elem.charAt(0).toUpperCase() + elem.slice(1))
            .join(' ')
            .trim();
    }

    const formatToSoles = new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

</script>
<h1 class="text-2xl text-center p-4 m-4">LOTES</h1>
<div class="overflow-x-auto">
    <div class="flex flex-wrap justify-around p-4 gap-4">
        {#each data.lotes as lote}
            <div class="card card-compact bg-base-100 w-96 shadow-xl mb-4">
                <figure>
                    <img
                            src={lote.urlImagenPrincipal} class="aspect-[4/3] object-cover"
                            alt="foto de lote"/>
                </figure>
                <div class="card-body">
                    <h2 class="card-title">Predio N°{lote.predio} - Manzana {lote.manzana.toUpperCase()} -
                        Lote {lote.numeroLote}
                    </h2>
                    <h3 class="card-title">{formatToSoles.format(lote.precioContado)}</h3>
                    <p>{lote.ubicacionLote}</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Ver</button>
                    </div>
                </div>
            </div>
        {/each}
    </div>

</div>
