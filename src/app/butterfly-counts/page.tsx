"use client";

import Container from "@/components/container";
import CountInstruction from "@/components/dialog/count-instruction";
import CountSuccess from "@/components/dialog/count-success";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGlobalContext } from "@/context/store";
import { Database } from "lucide-react";
import Link from "next/link";

const ButterflyCounts = () => {
    const { currentTab, setCurrentTab, checklistData, isLoading, showSuccess } =
        useGlobalContext();

    return (
        <Container className="py-16 md:pt-24">
            <div className="max-w-3xl mx-auto mb-3 mt-2 md:mb-5 md:mt-3 flex justify-around">
                <CountInstruction />
                <Link
                    href="/butterfly-counts/my-data"
                    className="flex justify-center items-center rounded-full bg-gray-200 p-3"
                >
                    <Database />
                </Link>
            </div>
            <Tabs
                defaultValue="user"
                value={currentTab}
                className="max-w-3xl mx-auto"
            >
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="user" className="cursor-default">
                        User
                    </TabsTrigger>
                    <TabsTrigger value="location" className="cursor-default">
                        Location
                    </TabsTrigger>
                    <TabsTrigger value="checklist" className="cursor-default">
                        Checklist
                    </TabsTrigger>
                </TabsList>
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
        </Container>
    );
};

export default ButterflyCounts;
