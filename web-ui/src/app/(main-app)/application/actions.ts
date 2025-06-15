"use server";

import { revalidatePath } from "next/cache";

export async function createConfiguration(formData: FormData) {
  const key = formData.get("key") as string;
  const value = formData.get("value") as string;
  const deploymentId = formData.get("deploymentId") as string;
  const applicationId = formData.get("applicationId") as string;
  console.log("deploymentId:", deploymentId);
  try {
    const response = await fetch("http://localhost:8080/configuration_values", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key, value, deployment_id: deploymentId }),
    });

    if (!response.ok) {
      throw new Error("Failed to create application");
    }

    revalidatePath("/application/" + applicationId + "/" + deploymentId);
    return { success: true };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }
}

export async function createDeployment(formData: FormData) {
  const name = formData.get("name") as string;
  const applicationId = formData.get("applicationId") as string;
  console.log(
    "Creating deployment with name:",
    name,
    "and applicationId:",
    applicationId
  );
  try {
    const response = await fetch("http://localhost:8080/deployments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, application_id: applicationId }),
    });

    if (!response.ok) {
      throw new Error("Failed to create application");
    }

    revalidatePath("/deployments");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create application");
  }
}
