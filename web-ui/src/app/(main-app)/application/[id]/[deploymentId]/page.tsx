import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import DeploymentPicker from "@/components/application/deployment-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeatureFlagTable from "@/components/application/tables/feature-flags-table";
import SecretsTable from "@/components/application/tables/secrets-table";
import ConfigurationTable from "@/components/application/tables/configuration-table";
import { Application } from "@/types/application";
import NewConfiguration from "@/components/application/new-configuration";
import { Deployment } from "@/types/deployment";

async function fetchApplication(id: string): Promise<Application | null> {
  try {
    const response = await fetch("http://localhost:8080/applications/" + id);
    if (!response.ok) {
      [];
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    return null;
  }
}
async function fetchApplicationDeployments(
  id: string
): Promise<Deployment[] | null> {
  try {
    const response = await fetch(
      "http://localhost:8080/deployments/application/" + id
    );
    if (!response.ok) {
      [];
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    return [];
  }
}

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ id: string; deploymentId: string }>;
}) {
  const { id, deploymentId } = await params;
  const application = await fetchApplication(id);
  const deployments = await fetchApplicationDeployments(id);
  return (
    <div className="flex flex-col">
      <div>
        <Tabs defaultValue="configurations">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-4 items-center justify-center">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                  {application?.name || "Application"}
                </h1>
              </div>
              <div>
                <DeploymentPicker
                  deployments={deployments!}
                  deploymentId={deploymentId}
                  applicationId={id}
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div>
                <NewConfiguration
                  deploymentId={deploymentId}
                  applicationId={id}
                />
              </div>
              <TabsList>
                <TabsTrigger value="configurations">Configurations</TabsTrigger>
                <TabsTrigger value="flags">Feature flags</TabsTrigger>
                <TabsTrigger value="secrets">Secrets</TabsTrigger>
              </TabsList>

              <Button size="icon" variant="ghost">
                <Settings />
              </Button>
            </div>
          </div>
          <TabsContent value="configurations">
            <ConfigurationTable deploymentId={deploymentId} />
          </TabsContent>
          <TabsContent value="flags">
            <FeatureFlagTable />
          </TabsContent>
          <TabsContent value="secrets">
            <SecretsTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
