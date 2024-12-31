<script>
    import '../app.css';

    let {children} = $props();
</script>
<nav>
    <ul class="flex justify-center flex-wrap gap-4 m-3">
        <li><a class="text-blue-500 hover:text-blue-700" href="/">Inicio</a></li>
        <li><a class="text-blue-500 hover:text-blue-700" href="/lotes">Lotes</a></li>
    </ul>
</nav>
{@render children()}
