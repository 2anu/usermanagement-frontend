import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getColumns } from "../../constants";
import "./UserTable.css";

const UserTable = ({ handleDelete, handleEdit, onGridReady }: any) => {
  return (
    <div className="table-container ag-theme-alpine-dark">
      <AgGridReact
        defaultColDef={{
          flex: 1,
          minWidth: 100,
          filter: true,
          filterParams: {
            newRowsAction: "keep",
          },
          menuTabs: ["filterMenuTab", "generalMenuTab", "columnsMenuTab"],
        }}
        pagination={true}
        paginationPageSize={10}
        columnDefs={getColumns(handleDelete, handleEdit)}
        rowModelType={"serverSide"}
        cacheBlockSize={10}
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default UserTable;
