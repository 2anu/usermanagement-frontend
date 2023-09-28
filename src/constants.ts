import CellButton from "./components/CellButton/CellButton";

export const getColumns = (handleDelete: any, handleEdit: any) => {
return  [
  { field: "id", headerName: 'ID', maxWidth: 70  },
    { field: "firstName", headerName: 'First Name', maxWidth: 200  },
    { field: "lastName", headerName: 'Last Name', maxWidth: 200  },
    { field: "email", headerName: 'Email', maxWidth: 200  },
    { field: "status",headerName: 'Status', maxWidth: 120,
    cellRenderer: (field: any) => {
      return field?.value ? 'active' : 'inactive'
    }
  },
    { field: "mobileNumber", headerName: 'Phone Number', maxWidth: 200},
    { field: "dob", headerName: 'Date Of Birth', maxWidth: 200},
    { field: "address", headerName: 'Address', maxWidth: 200},
    {
      field: 'edit',
      cellRenderer: CellButton,
      cellRendererParams: {
        buttonType: 'edit',
        onBtnClick: handleEdit
      },
      maxWidth: 100
    },
    {
      field: 'delete',
      cellRenderer: CellButton,
      cellRendererParams: {
        buttonType: 'delete',
        onBtnClick: handleDelete
      },
      maxWidth: 100
    }
  ]
}