import supabase, { supabaseURL } from "./supabase";
export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll(
    "/",
    ""
  );
  const isImageFile = typeof newCabin.image !== "string";
  const imagePath = !isImageFile
    ? newCabin.image
    : `${supabaseURL}/storage/v1/object/public/cabins_image/${imageName}`;

  const editing = Boolean(id);
  let query = supabase.from("cabins");
  if (editing)
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  else {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Cabin could not be " + (editing ? "edited" : "created"));
  }

  let storage = supabase.storage.from("cabins_image");

  if (isImageFile) {
    const { data, error: storageError } = await storage.upload(
      imageName,
      newCabin.image
    );
    if (storageError) {
      alert(JSON.stringify(data, null, 3));
      const { error } = await supabase
        .from("cabins")
        .delete()
        .eq("id", data[0].id);
      if (error) {
        throw new Error("Cabin could not be deleted");
      }
      throw new Error(
        "Image could not be uploaded and the cabin could not be created"
      );
    }
  }
  return data;
}
