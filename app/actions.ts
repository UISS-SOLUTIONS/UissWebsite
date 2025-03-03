"use server";

export async function submitForm(
  values: Record<string, FormDataEntryValue | null>,
  endpoint: string
) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        contentType: "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    const data = await response.json();
    return { success: true, message: "Hey Form submitted succesfully!", data };
  } catch (e) {
    throw new Error((e as Error).message || "Something went wrong while submitting the form.");
  }
}
