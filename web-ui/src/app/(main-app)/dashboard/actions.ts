"use server";

import { revalidatePath } from "next/cache";

export async function createApplication(formData: FormData) {
  const name = formData.get("name") as string;

  try {
    const response = await fetch("http://localhost:8080/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error("Failed to create application");
    }

    revalidatePath("/dashboard");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create application");
  }
}
