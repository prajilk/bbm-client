"use server";

import fs from "fs";
import ButterflyJson from "@/lib/butterflies_with_images.json";

const writeFilePromise = () => {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            "./src/lib/butterflies_with_images.json",
            JSON.stringify(ButterflyJson),
            "utf8",
            (err) => {
                if (err) reject(err); // Reject the promise with the error
                else resolve(""); // Resolve the promise if no error occurred
            }
        );
    });
};

export async function deleteButterflyAction(formData: FormData) {
    const id = formData.get("id");
    if (!id) throw new Error("Error writing to JSON file: Invalid Index");
    const indexToDelete = ButterflyJson.findIndex(
        (obj) => obj.id === Number(id)
    );

    if (indexToDelete !== -1) {
        // Use splice to remove the object at the found index
        ButterflyJson.splice(indexToDelete, 1);
    } else {
        throw new Error("Error writing to JSON file: Invalid Index");
    }

    try {
        await writeFilePromise();
    } catch (error) {
        return {
            error: "Something went wrong! Unable to delete data.",
        };
    }
}

export async function addButterflyAction(formData: FormData) {
    const id = ButterflyJson.length + 1;
    const data = {
        commonName: formData.get("commonName")?.toString(),
        binomialName: formData.get("binomialName")?.toString(),
        image: formData.get("image")?.toString(),
    };

    if (data.commonName && data.binomialName) {
        ButterflyJson.push({
            id: id,
            commonName: data.commonName,
            binomialName: data.binomialName,
            image: data.image,
        });
    } else throw new Error("Unable to add new data");

    try {
        await writeFilePromise();
    } catch (error) {
        return {
            error: "Something went wrong! Unable to delete data.",
        };
    }
}

export async function editButterflyAction(formData: FormData) {
    const data = {
        id: formData.get("id") ? Number(formData.get("id")) : undefined,
        commonName: formData.get("commonName")?.toString(),
        binomialName: formData.get("binomialName")?.toString(),
        image: formData.get("image")?.toString(),
    };

    if (data.commonName && data.binomialName && data.id) {
        const index = ButterflyJson.findIndex((value) => value.id === data.id);
        ButterflyJson[index] = {
            id: data.id,
            commonName: data.commonName,
            binomialName: data.binomialName,
            image: data.image,
        };
    } else throw new Error("Unable to add new data");

    try {
        await writeFilePromise();
    } catch (error) {
        return {
            error: "Something went wrong! Unable to delete data.",
        };
    }
}
