import { useEffect, useState } from "react";

export const useMemoryLeak = () => {
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { cancelled };
};
