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

    const data = await response.json();
    if (!response.ok) {
      throw new Error("Mhhh!! Failed to submit form");
    }

    return { success: true, message: "Hey Form submitted succesfully!", data };
  } catch (e) {
    throw new Error(
      (e as Error).message || "Something went wrong while submitting the form."
    );
  }
}

export async function fetchData<T = unknown>(endpoint: string): Promise<{ success: boolean; data: T}> {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    if (!response.ok) {
      return {success: false, data};
    }
    return { success: true, data };
  } catch (e) {
    throw new Error(
      (e as Error).message || "Something went wrong when quering data"
    );
  }
}

export async function updateData(
  values: Record<string, FormDataEntryValue | null>,
  endpoint: string
) {
  try {
    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        contentType: "application/json",
      },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      throw new Error("Failed to update data");
    }
    const data = await response.json();
    return { success: true, message: "Data updated successfully", data };
  } catch (e) {
    throw new Error(
      (e as Error).message || "Something went wrong while updating the data"
    );
  }
}
