<script>
	import { Toggle, P, Navbar, NavUl, NavLi, Button } from 'flowbite-svelte';
	import SearchList from './SearchList.svelte';
    import { DB } from '$lib/DB';

    let parentMode= false;

    let newDB;
    $: newDB = $DB
</script>

<div class="p-3">

    <Navbar rounded color="dark">
        <NavUl>
            <NavLi> <P size="sm">Barnläge </P> </NavLi>
            <NavLi> <Toggle bind:checked={parentMode} color="teal"></Toggle> </NavLi>
            <NavLi> <P size="sm">Föräldraläge</P> </NavLi>
        </NavUl>
        
        <NavUl>
            <P size="sm">🚪 Har gått in</P>
            <P size="sm">💸 Har betalat</P>
            <P size="sm">❌ Har inte betalat</P>
        </NavUl>

        <NavUl/>

        <NavUl>
            <Button on:click={() => {global.location.reload()}} pill outline class="!p-2 aspect-[1/1]" size="xs">↻</Button>
        </NavUl>
    </Navbar>

    <div class="w-3/5">
        <SearchList DB={newDB}></SearchList>
    </div>

</div>

                                      
