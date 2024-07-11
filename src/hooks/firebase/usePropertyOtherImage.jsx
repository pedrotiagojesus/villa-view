// Firebase
import { db, storage } from "../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";

export const usePropertyOtherImage = () => {
    const saveOtherImage = async (
        propertyId = 0,
        fileArr = null,
        oldPathArr = null
    ) => {
        if (propertyId === 0) {
            return;
        }

        if (fileArr === null) {
            return;
        }

        try {
            // Upload all images
            const uploadPromises = fileArr.map((file) =>
                uploadFile(file, propertyId)
            );
            const uploadedPathArr = await Promise.all(uploadPromises);

            let pathArr = uploadedPathArr;

            if (Array.isArray(oldPathArr)) {
                pathArr = pathArr.concat(oldPathArr);
            }

            if (pathArr === 0) {
                pathArr = null;
            }

            // Save data on DB
            saveData(propertyId, pathArr);
        } catch (error) {
            console.log(error.message);
            console.log(error.stack);
        }
    };

    const uploadFile = (file, propertyId) => {
        return new Promise((resolve, reject) => {
            let filename = `property/other_image/${propertyId}-${file.name}`;
            const storageRef = ref(storage, filename);

            uploadBytesResumable(storageRef, file).then(() => {
                resolve(filename);
            });
        });
    };

    const saveData = (propertyId, urlArr) => {
        const collectionRef = doc(db, "property", propertyId);

        if (Array.isArray(urlArr)) {
            urlArr.sort((a, b) => a.localeCompare(b));
        }

        updateDoc(collectionRef, {
            other_image: urlArr,
        });
    };

    const getUrl = async (path) => {
        const storage = getStorage();
        const downloadUrl = await getDownloadURL(ref(storage, path));

        return downloadUrl;
    };

    const getUrlArrOtherImage = async (pathArr) => {
        const imageUrlArr = [];

        if (!Array.isArray(pathArr)) {
            return imageUrlArr;
        }

        if (pathArr.length === 0) {
            return imageUrlArr;
        }

        await Promise.all(
            pathArr.map(async (path) => {
                imageUrlArr.push(await getUrl(path));
            })
        );

        imageUrlArr.sort((a, b) => a.localeCompare(b));

        return imageUrlArr;
    };

    const deleteFile = (path) => {
        if (path === null) {
            return;
        }

        const storage = getStorage();
        const desertRef = ref(storage, path);
        deleteObject(desertRef);
    };

    const bulkDeleteFile = (pathArr) => {
        if (pathArr.length === 0) {
            return;
        }

        pathArr.map((path) => {
            deleteFile(path);
        });
    };

    return {
        saveOtherImage,
        getUrl,
        getUrlArrOtherImage,
        bulkDeleteFile,
        deleteFile,
        saveData,
    };
};
