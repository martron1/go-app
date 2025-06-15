import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Application } from "@/types/application";

export default function ApplicationCard({
  application,
}: {
  application: Application;
}) {
  const { id, name } = application;
  return (
    <Link href={`/application/${id}/b3b8c7e2-1a2b-4c3d-9e4f-123456789abd`}>
      <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <h1>footer</h1>
        </CardFooter>
      </Card>
    </Link>
  );
}
