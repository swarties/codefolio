"use server";

import updateDB from "./updateDB";

export default async function userForm(formData) {
  try {
    const rawFormData = {
      bgColor: formData.get("bgColor"),
      bio: formData.get("bio"),
    };


    const res = await updateDB(rawFormData);
    return { success: true };
  } catch (err) {
    console.error("[userForm] error:", err);
    throw err;
  }
}
