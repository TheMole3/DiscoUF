
<script>
    import Fuse from 'fuse.js'
    import { Button, Search, Table, TableHead, TableHeadCell, TableBody, Input } from 'flowbite-svelte';
	import ChildSearchRow from './ChildSearchRow.svelte';

    export let DB;

    const fuseOptions = {
        isCaseSensitive: false,
        // includeScore: false,
        // shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
        threshold: 0.6,
        // distance: 100,
        // useExtendedSearch: false,
        ignoreLocation: false,
        // ignoreFieldNorm: false,
        // fieldNormWeight: 1,
        keys: [
            "booking.ID",
            "name",
            "surname",
            "phone",
            "booking.guardianName",
            "booking.guardianSurname",
            "booking.phone"
        ]
    };

    let searchTerm = "";
    let results = [];
    $: cutResults = results.splice(0, 20);
    let fuse;
    let childDB = [];

    $: {

        childDB = []
        for(const booking of Object.values(DB)) {
            for(const child of booking.children) {
                childDB.push(child)
            }
        }

        fuse = new Fuse(childDB, fuseOptions)
        
        results = searchTerm.length?fuse.search(searchTerm):childDB;
    }

    let searchChanged = () => {
        results = searchTerm.length?fuse.search(searchTerm):childDB;
    }

</script>

<form class="flex gap-2">
    <Input size="md" placeholder="Sök" bind:value={searchTerm} on:keyup={searchChanged} />
    <Button class="!p-2.5">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
    </Button>
</form>

<div class="text-center">

    <Table hoverable striped={true}>
        <TableHead>
            <TableHeadCell class="w-1"></TableHeadCell>
            <TableHeadCell>Förnamn</TableHeadCell>
            <TableHeadCell>Efternamn</TableHeadCell>
            <TableHeadCell>Discokort</TableHeadCell>
            <TableHeadCell>ID</TableHeadCell>
        </TableHead>

        <TableBody class="divide-y">    
            {#each cutResults as child }
                <ChildSearchRow child={child.item || child}></ChildSearchRow>
            {/each}
        </TableBody>
    </Table>

    {#if ((results.length >= 20) && !(cutResults.length > 20))}
        <Button class="w-2/3" on:click={() => {cutResults = results}}>Visa {results.length - cutResults.length} fler resultat</Button>
    {/if}

</div>