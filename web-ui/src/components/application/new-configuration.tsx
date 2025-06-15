"use client";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { createConfiguration } from "@/app/(main-app)/application/actions";
import { useState } from "react";

export default function NewConfiguration(props: {
  deploymentId: string;
  applicationId: string;
}) {
  const { deploymentId, applicationId } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const result = await createConfiguration(formData);

    if (result.success) {
      setIsDialogOpen(false);
    } else {
      console.error("Failed to create configuration:", result.error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus /> Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Config Value</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Label htmlFor="key">Key</Label>
            <Input
              name="key"
              id="key"
              placeholder="Key (e.g., my-app)"
              required
            />
            <Label htmlFor="value">Value</Label>
            <Input
              name="value"
              id="value"
              placeholder="Value (e.g., My Application)"
              required
            />
            <Input
              name="deploymentId"
              id="deploymentId"
              type="hidden"
              value={deploymentId}
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
