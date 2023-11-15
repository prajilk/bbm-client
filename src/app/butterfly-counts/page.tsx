"use client";

import Container from "@/components/container";
import CountInstruction from "@/components/dialog/count-instruction";
import CountSuccess from "@/components/dialog/count-success";
import SyncCount from "@/components/dialog/sync-counts";
import ChecklistForm from "@/components/form/checklist-form";
import LocationForm from "@/components/form/location-form";
import UserForm from "@/components/form/user-form";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import LoadingButton from "@/components/ui/loading-button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useGlobalContext } from "@/context/store";
import { saveChecklist } from "@/lib/api/save-checklist";
import { validateUser } from "@/lib/api/validate-user";
import { ChecklistProps } from "@/lib/types";
import { getCookie } from "cookies-next";
import { Database } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ButterflyCounts = () => {
    const { currentTab, setCurrentTab, checklistData, isLoading, showSuccess } =
        useGlobalContext();
    const [isSyncing, setIsSyncing] = useState(false);
    const router = useRouter();

    async function getResults(bCounts: string) {
        const user = getCookie("user");
        if (!user) router.push("/login");

        const bCountsObj: ChecklistProps = JSON.parse(bCounts);
        try {
            setIsSyncing(true);
            const user = await validateUser(bCountsObj.email);
            if (!user?.userVerified) router.push("/login");
            const counts = await saveChecklist(bCountsObj);
            if (counts.countSaved) {
                localStorage.removeItem("butterfly-count");
                toast.success("Successfully synced previous count.");
            } else {
                toast.error("Failed to sync. Please try again!");
            }
        } catch (error) {
            toast.error("Failed to sync previous count. Please refresh!");
        } finally {
            setIsSyncing(false);
        }
    }

    useEffect(() => {
        const bCounts = localStorage.getItem("butterfly-count");
        if (bCounts !== null) getResults(bCounts);
    }, []);

    return (
        <Container className="py-16 md:pt-24">
            <div className="max-w-3xl mx-auto mb-3 mt-2 md:mb-5 md:mt-3 flex justify-around">
                <CountInstruction />
                <Link
                    href="/butterfly-counts/my-data"
                    className="flex justify-center items-center rounded-full bg-gray-200 p-3"
                    title="My Data"
                >
                    <Database />
                </Link>
            </div>
            <Tabs value={currentTab} className="max-w-3xl mx-2 md:mx-auto">
                <div className="flex items-center max-w-xs md:max-w-xl mx-auto my-5">
                    <div
                        data-state={
                            (currentTab === "user" ||
                                currentTab === "location" ||
                                currentTab === "checklist") &&
                            "active"
                        }
                        className="data-[state=active]:bg-primaryGreen data-[state=active]:text-white flex justify-center items-center mx-auto w-6 h-6 bg-green-100 rounded-full flex-shrink-0 text-xs font-bold"
                    >
                        <span>1</span>
                    </div>
                    <div
                        className={`w-full h-1 ${
                            currentTab === "checklist" ||
                            currentTab === "location"
                                ? "bg-primaryGreen"
                                : "bg-green-100"
                        }`}
                    ></div>
                    <div
                        data-state={
                            (currentTab === "location" ||
                                currentTab === "checklist") &&
                            "active"
                        }
                        className="data-[state=active]:bg-primaryGreen data-[state=active]:text-white flex justify-center items-center mx-auto w-6 h-6 bg-green-100 rounded-full flex-shrink-0 text-xs font-bold"
                    >
                        <span>2</span>
                    </div>
                    <div
                        className={`w-full h-1 ${
                            currentTab === "checklist"
                                ? "bg-primaryGreen"
                                : "bg-green-100"
                        }`}
                    ></div>
                    <div
                        data-state={currentTab === "checklist" && "active"}
                        className="data-[state=active]:bg-primaryGreen data-[state=active]:text-white flex justify-center items-center mx-auto w-6 h-6 bg-green-100 rounded-full flex-shrink-0 text-xs font-bold"
                    >
                        <span>3</span>
                    </div>
                </div>
                <TabsContent value="user">
                    <Card>
                        <CardHeader>
                            <CardTitle>User</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <UserForm />
                        </CardContent>
                        <CardFooter>
                            <Button
                                type="submit"
                                form="userForm"
                                className="ms-auto bg-primaryGreen hover:bg-green-600"
                            >
                                Next
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="location">
                    <Card>
                        <CardHeader>
                            <CardTitle>Location</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <LocationForm />
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button
                                type="button"
                                className="bg-primaryGreen hover:bg-green-600"
                                onClick={() => setCurrentTab("user")}
                            >
                                Previous
                            </Button>
                            <Button
                                form="locationForm"
                                type="submit"
                                className="bg-primaryGreen hover:bg-green-600"
                            >
                                Next
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="checklist">
                    <Card>
                        <CardHeader>
                            <CardTitle>Checklist</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChecklistForm />
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button
                                type="button"
                                className="bg-primaryGreen hover:bg-green-600"
                                onClick={() => setCurrentTab("location")}
                            >
                                Previous
                            </Button>
                            <LoadingButton
                                loader={isLoading}
                                type="submit"
                                className="w-[7rem] bg-primaryGreen hover:bg-green-600"
                                form="checklist-form"
                                disabled={
                                    checklistData.speciesFound.length === 0 ||
                                    isLoading
                                }
                            >
                                Submit form
                            </LoadingButton>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
            {showSuccess && <CountSuccess />}
            <SyncCount isSyncing={isSyncing} />
        </Container>
    );
};

export default ButterflyCounts;
