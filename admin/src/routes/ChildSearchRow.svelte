<script>
	import { update } from "$lib/DB";
    import { TableBodyRow, TableBodyCell, Button, Avatar, Label } from "flowbite-svelte";

    export let child;

    let changeStatus = () => {
        let changes = {};
        changes[child.booking.ID] = {children: []};
        changes[child.booking.ID].children[(""+child.childID).slice(-1)] = {
            entered: !child.entered
        };

        update(changes)
    }
</script>

<TableBodyRow>
    <TableBodyCell>
        <Label>
            {child.isLagstadie?"F3":"46"}
            &nbsp;&nbsp;
            <Button on:click={changeStatus} class="w-0" color="alternative">
                {child.entered?"🚪":child.booking.paid?"💸":"❌"}
            </Button>
        </Label>
    </TableBodyCell>
    <TableBodyCell>
        {child.name}
    </TableBodyCell>
    <TableBodyCell>
        {child.surname}
    </TableBodyCell>
    <TableBodyCell>
        {child.money + " kr"}
    </TableBodyCell>
    <TableBodyCell>
        {(""+child.childID).slice(0, 4) + "-" + (""+child.childID).slice(4)}
    </TableBodyCell>
</TableBodyRow>