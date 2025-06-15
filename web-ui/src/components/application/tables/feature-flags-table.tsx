import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const featureFlags = [
  { key: "Lifting", active: true },
  { key: "Dark Mode", active: false },
  { key: "Beta Features", active: true },
  { key: "New UI", active: false },
  { key: "Experimental", active: true },
];

export default function FeatureFlagTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Key</TableHead>
          <TableHead className="w-[120px]">Status</TableHead>
          <TableHead className="w-[100px]">Toggle</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {featureFlags.map((flag) => (
          <TableRow key={flag.key}>
            <TableCell className="font-medium">{flag.key}</TableCell>
            <TableCell>
              <span
                className={`font-semibold ${
                  flag.active ? "text-green-600" : "text-red-600"
                }`}
              >
                {flag.active ? "Active" : "Inactive"}
              </span>
            </TableCell>
            <TableCell className="text-center">
              <Switch defaultChecked={flag.active} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
