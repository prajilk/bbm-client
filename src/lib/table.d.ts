import "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

declare module "@tanstack/table-core" {
    interface TableMeta<TData extends RowData> {
        data: TData[];
        setData: Dispatch<SetStateAction<TData[]>>;
    }
}
