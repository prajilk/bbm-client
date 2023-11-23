"use client";

import { db } from "@/config/dexie.config";
import { syncData } from "@/lib/api/sync-butterflies";
import { useEffect } from "react";

const { butterflies } = db;

const SyncButterflyData = () => {
    useEffect(() => {
        const lastUpdatedDate =
            localStorage.getItem("butterflySyncDate") || "null";
        async function sync() {
            const result = await syncData(lastUpdatedDate || "null");
            if (result.isSync === false && result.data) {
                await butterflies.clear();
                await butterflies.bulkAdd(result.data.butterflies);
                localStorage.removeItem("butterflySyncDate");
                localStorage.setItem(
                    "butterflySyncDate",
                    result.data.lastUpdated
                );
            }
        }
        sync();
    }, []);

    return <></>;
};

export default SyncButterflyData;
