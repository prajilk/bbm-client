import { columns } from "@/components/table/users/columns";
import { DataTable } from "@/components/table/users/data-table";
import { getUsers } from "@/lib/api/admin/get-users";
import Template from "../admin-template";

const page = async () => {
    const users = await getUsers();
    return (
        <Template>
            <div className="bg-white m-2 mt-5">
                <div className="flex justify-between items-center p-5">
                    <h1 className="font-semibold text-lg">All users</h1>
                    <span className="text-sm text-muted-foreground">
                        Total users: {users.length}
                    </span>
                </div>
                <hr className="my-5" />
                <div className="container mx-auto py-5">
                    <DataTable columns={columns} data={users} />
                </div>
            </div>
        </Template>
    );
};

export default page;
