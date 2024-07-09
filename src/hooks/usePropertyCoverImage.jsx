// Firebase
import { db, storage } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";

export const usePropertyCoverImage = () => {
    const saveCoverImage = async (
        propertyId = 0,
        file = null,
        oldPath = null
    ) => {
        if (propertyId === 0) {
            return;
        }

        if (file === null) {
            return;
        }

        try {
            if (oldPath != null) {
                deleteFile(oldPath);
            }

            // Upload image
            const url = await uploadFile(file, propertyId);

            // Save data on DB
            saveData(propertyId, url);
        } catch (error) {
            console.log(error.message);
            console.log(error.stack);
        }
    };

    const uploadFile = (file, propertyId) => {
        return new Promise((resolve, reject) => {
            let filename = `property/cover_image/${propertyId}-${file.name}`;
            const storageRef = ref(storage, filename);

            uploadBytesResumable(storageRef, file).then(() => {
                resolve(filename);
            });
        });
    };

    const saveData = (propertyId, url) => {
        const collectionRef = doc(db, "property", propertyId);
        updateDoc(collectionRef, {
            cover_image: url,
        });
    };

    const getUrl = async (path) => {
        if (path === null) {
            return "";
        }

        const storage = getStorage();
        const downloadUrl = await getDownloadURL(ref(storage, path));

        return downloadUrl;
    };

    const deleteFile = (path) => {
        if (path === null) {
            return;
        }

        const storage = getStorage();
        const desertRef = ref(storage, path);
        deleteObject(desertRef);
    };

    return {
        saveCoverImage,
        getUrl,
        deleteFile,
    };
};
