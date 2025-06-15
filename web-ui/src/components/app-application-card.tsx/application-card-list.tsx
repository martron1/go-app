import { Application } from "@/types/application";
import { Separator } from "../ui/separator";
import ApplicationCard from "./application-card";

async function fetchApplications(): Promise<Application[]> {
  try {
    const response = await fetch("http://localhost:8080/applications");
    if (!response.ok) {
      [];
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    return [];
  }
}

export default async function ApplicationCardList() {
  const applications = await fetchApplications();

  return (
    <>
      <div>
        <Separator></Separator>
        <div className="w-full flex h-5 items-center space-x-4 text-sm py-5">
          <span>
            {applications.length}{" "}
            {applications.length === 1 ? "Project" : "Projects"}
          </span>
          <div className="h-5">
            <Separator orientation="vertical" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </div>
    </>
  );
}
