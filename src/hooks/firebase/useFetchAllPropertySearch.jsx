import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    where,
} from "firebase/firestore";

// Hooks
import { useMemoryLeak } from "../useMemoryLeak";
import { usePropertyCoverImage } from "../usePropertyCoverImage";

export const useFetchAllPropertySearch = (
    price_min,
    price_max,
    district_id,
    county_id,
    parish_id,
    property_type_id,
    property_goal_id,
    property_status_id,
    room
) => {
    const [propertyArr, setPropertyArr] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // deal with memory leak
    const { cancelled } = useMemoryLeak();

    const { getUrl: getUrlCoverImage } = usePropertyCoverImage();

    useEffect(() => {
        async function loadData() {
            if (cancelled) {
                return;
            }

            setLoading(true);
            const collectionRef = await collection(db, "property");

            try {
                const whereArr = [where("is_visible", "==", true)];

                if (price_min != null) {
                    whereArr.push(where("price", ">=", price_min));
                }

                if (price_max != null) {
                    whereArr.push(where("price", "<=", price_max));
                }

                if (district_id != null) {
                    whereArr.push(where("district_id", "==", district_id));
                }

                if (county_id != null) {
                    whereArr.push(where("county_id", "==", county_id));
                }

                if (parish_id != null) {
                    whereArr.push(where("parish_id", "==", parish_id));
                }

                if (property_type_id != null) {
                    whereArr.push(
                        where("property_type_id", "==", property_type_id)
                    );
                }

                if (property_goal_id != null) {
                    whereArr.push(
                        where("property_goal_id", "==", property_goal_id)
                    );
                }

                if (property_status_id != null) {
                    whereArr.push(
                        where("property_status_id", "==", property_status_id)
                    );
                }

                if (property_status_id != null) {
                    whereArr.push(where("room", "==", room));
                }

                let q = await query(
                    collectionRef,
                    ...whereArr,
                    orderBy("createdAt", "desc")
                );

                await onSnapshot(q, async (querySnapshot) => {
                    setPropertyArr(
                        await Promise.all(
                            querySnapshot.docs.map(async (doc) => ({
                                id: doc.id,
                                ...doc.data(),
                                cover_image_url: await getUrlCoverImage(
                                    doc.data().cover_image
                                ),
                            }))
                        )
                    );
                });
            } catch (error) {
                setError(error.message);
            }

            setLoading(false);
        }

        loadData();
    }, [
        cancelled,
        price_min,
        price_max,
        district_id,
        county_id,
        parish_id,
        property_type_id,
        property_goal_id,
        property_status_id,
        room,
    ]);

    return { propertyArr, loading, error };
};
