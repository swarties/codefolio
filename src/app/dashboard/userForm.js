"use server";

import updateDB from "./updateDB";

export default async function userForm(formData) {
    const rawFormData = {
      bgColor: await formData.get("bgColor"),
      bio: await formData.get("bio"),
    };


    await updateDB(rawFormData);
}
