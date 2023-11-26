import { columns } from "@/components/table/butterflies/columns";
import { DataTable } from "@/components/table/butterflies/data-table";
import { getButterflies } from "@/lib/api/admin/get-bitterflies";
import Template from "../admin-template";

const page = async () => {
    const data = await getButterflies();
    return (
        <Template>
            <div className="bg-white m-2 mt-5">
                <div className="flex justify-between items-center p-5">
                    <h1 className="font-semibold text-lg">Butterfly List</h1>
                    <span className="text-sm text-muted-foreground">
                        Total Butterflies: {data.length || 0}
                    </span>
                </div>
                <hr className="my-5" />
                <div className="container mx-auto py-5">
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </Template>
    );
};

export default page;
