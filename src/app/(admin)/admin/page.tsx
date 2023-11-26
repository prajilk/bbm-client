import { getCounts } from "@/lib/api/admin/get-counts";
import AllCountsContainer from "@/components/count/all-counts-container";
import Template from "./admin-template";

const Admin = async () => {
    const data = await getCounts();

    return (
        <Template>
            <div className="p-5 bg-white m-2 mt-5">
                <AllCountsContainer counts={data} />
            </div>
        </Template>
    );
};

export default Admin;
