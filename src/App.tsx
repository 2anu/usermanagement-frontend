import { useCallback, useEffect, useState } from "react";
import "./App.css";
import UserTable from "./components/UserTable/UserTable";
import Button from "@mui/material/Button";
import UserForm from "./components/UserForm/UserForm";
import { deleteUser, getAllUsers } from "./services";
import { Alert, Snackbar } from "@mui/material";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [snackbar, setSnackbar] = useState<any>();
  const [userFormTitle, setUserFormTitle] = useState("");
  const [editUserData, setEditUserData] = useState({});
  const [gridApi, setGridApi] = useState<any>();

  const handleEdit = (data: any) => {
    setUserFormTitle("Edit User");
    setShowForm(true);
    setEditUserData(data);
  };

  const getServerSideDatasource = () => {
    return {
      getRows: (params: any) => {
        getAllUsers(params.api.paginationGetCurrentPage()).then((data: any) => {
          if (data.data?.users?.length) {
            params.success({
              rowData: data.data?.users,
              rowCount: data.data?.totalCount,
            });
          }
        });
      },
    };
  };

  const onGridReady = useCallback((params: any) => {
    setGridApi(params.api);
    const datasource = getServerSideDatasource();
    params.api.setServerSideDatasource(datasource);
  }, []);

  const handleDelete = (data: any) => {
    if (
      window.confirm(`Are you sure you want to delete user '${data.firstName}'`)
    ) {
      try {
        deleteUser(data?.id).then((userData: any) => {
          if (userData?.data) {
            refreshTableData()
          }
        });
        setSnackbar({
          message: "User deleted successfully",
          severity: "success",
        });
      } catch (error) {
        console.log(error)
        setSnackbar({ message: "Failed to delete user", severity: "error" });
      }
    }
  };

  const refreshTableData = () => {
    const datasource = getServerSideDatasource();
    if (gridApi) {
      gridApi?.setServerSideDatasource(datasource);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Users Grid CRUD</h1>
        <Button
          variant="outlined"
          sx={{
            color: "#181d1f",
            border: "1px solid #181d1f",
            ":hover": { backgroundColor: "#181d1f", color: "#fff" },
            ":focus": { outline: "none" },
          }}
          onClick={() => {
            setUserFormTitle("Add User");
            setShowForm(true);
          }}
        >
          Add User
        </Button>
      </div>
      <UserTable
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        onGridReady={onGridReady}
      />
      <UserForm
        showForm={showForm}
        setShowForm={setShowForm}
        formTitle={userFormTitle}
        setSnackbar={setSnackbar}
        editUserData={editUserData}
        refreshTableData={refreshTableData}
      />
      <Snackbar
        open={snackbar?.message}
        autoHideDuration={6000}
        onClose={() => setSnackbar("")}
      >
        <Alert
          onClose={() => setSnackbar({ message: "", severity: "" })}
          severity={snackbar?.severity}
          sx={{ width: "100%" }}
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;