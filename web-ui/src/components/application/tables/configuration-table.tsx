import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Configuration from "@/types/configuration";
import ConfigurationTableRow from "./configuration-table-row";

export default async function ConfigurationTable({
  deploymentId,
}: {
  deploymentId: string;
}) {
  let configurations: Configuration[];
  try {
    const responce = await fetch(
      "http://localhost:8080/configuration_values/deployment/" + deploymentId
    );
    configurations = await responce.json();
  } catch (error) {
    configurations = [];
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Key</TableHead>
            <TableHead>Value</TableHead>
            <TableHead className="w-[100px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {configurations !== null &&
            configurations.map((config) => (
              <ConfigurationTableRow
                config={config}
                key={config.id}
              ></ConfigurationTableRow>
            ))}
        </TableBody>
      </Table>
      {/* <AlertDialog>
        <AlertDialogTrigger asChild>delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  );
}
