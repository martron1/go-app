import { ChevronDown, Plus, Check } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Deployment } from "@/types/deployment";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { createApplication } from "@/app/(main-app)/dashboard/actions";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { createDeployment } from "@/app/(main-app)/application/actions";
import Link from "next/link";

export default function DeploymentPicker({
  deployments,
  deploymentId,
  applicationId,
}: {
  deployments: Deployment[];
  deploymentId: string;
  applicationId: string;
}) {
  const selectedDeployment = deployments.find(
    (deployment) => deployment.id === deploymentId
  ) || { id: "", name: "Select Deployment" };
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-fit">
            {selectedDeployment.name} <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel className="py-1 text-gray-600 font-medium text-xs">
            Deployments
          </DropdownMenuLabel>
          {deployments.map((deployment) => (
            <DropdownMenuItem
              key={deployment.id}
              className={`cursor-pointer px-3 py-1 ${
                deployment.id === deploymentId ? "bg-gray-50 font-semibold" : ""
              }`}
            >
              <Link
                href={`/application/${applicationId}/${deployment.id}`}
                className="w-full"
              >
                <div className="w-full flex items-center">
                  <div className="w-1/5">
                    {deployment.id === deploymentId && <Check size={18} />}
                  </div>
                  <div className="w-4/5">{deployment.name}</div>
                </div>
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer px-3 py-1">
            <DialogTrigger asChild>
              <div className="flex items-center gap-2">
                <Plus />
                New Deployment
              </div>
            </DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Deployment</DialogTitle>
        </DialogHeader>
        <form action={createDeployment}>
          <div className="space-y-4">
            <Label htmlFor="name">Deployment Name</Label>
            <Input
              name="name"
              id="name"
              placeholder="Deployment Name"
              required
            />
            <Input
              name="applicationId"
              id="applicationId"
              type="hidden"
              value={applicationId}
              required
            />
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
