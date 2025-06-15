import ApplicationCardList from "@/components/app-application-card.tsx/application-card-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createApplication } from "./actions";

export default async function Dashboard() {
  return (
    <div className="grid gap-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Applications</h1>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus /> New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Application</DialogTitle>
              </DialogHeader>
              <form action={createApplication}>
                <div className="space-y-4">
                  <Label htmlFor="name">Application Name</Label>
                  <Input
                    name="name"
                    id="name"
                    placeholder="Application Name"
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
        </div>
      </div>
      <ApplicationCardList />
    </div>
  );
}
