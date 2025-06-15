import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";

export default function SecretsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Key</TableHead>
          <TableHead>Value</TableHead>
          <TableHead className="w-[120px]">Status</TableHead>
          <TableHead className="w-[100px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">item-1</TableCell>
          <TableCell>123</TableCell>
          <TableCell>
            <span className="text-green-600 font-semibold">Active</span>
          </TableCell>
          <TableCell className="text-right">
            <Button size="sm" variant="outline" className="p-2">
              <MoreHorizontal />
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">item-2</TableCell>
          <TableCell>456</TableCell>
          <TableCell>
            <span className="text-yellow-600 font-semibold">Pending</span>
          </TableCell>
          <TableCell className="text-right">
            <Button size="sm" variant="outline" className="p-2">
              <MoreHorizontal />
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">item-3</TableCell>
          <TableCell>789</TableCell>
          <TableCell>
            <span className="text-red-600 font-semibold">Inactive</span>
          </TableCell>
          <TableCell className="text-right">
            <Button size="sm" variant="outline" className="p-2">
              <MoreHorizontal />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
