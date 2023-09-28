import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./UserForm.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { schema } from "../../schema";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { addNewUser, editUser } from "../../services";

const UserForm = ({
  showForm,
  setShowForm,
  formTitle,
  setSnackbar,
  editUserData,
  refreshTableData,
}: any) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: editUserData,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    try {
      const date = new Date(data?.dob);
      const dob = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      const payload = {
        ...data,
        status: data?.status === "active" ? true : false,
        dob,
      };

      if (Object.keys(editUserData).length) {
        payload.id = editUserData?.id;
        editUser(payload).then((data: any) => {
          if (data?.data?.firstName) {
            refreshTableData();
          }
        });
      } else {
        addNewUser(payload).then((data: any) => {
          if (data?.data?.firstName) {
            refreshTableData();
          }
        });
      }
      setShowForm(false);
      setSnackbar({ message: "User added successfully", severity: "success" });
    } catch (error) {
      setShowForm(false);
      console.log("error:::", error);
      setSnackbar({ message: "Failed to add user", severity: "error" });
    }
  };

  return (
    <Dialog open={showForm}>
      <div className="dialog-header">
        <DialogTitle>{formTitle}</DialogTitle>
        <IconButton
          onClick={() => {
            setShowForm(false);
            reset();
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="user-form">
        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              className="form-field"
              label="First Name"
              variant="outlined"
              error={!!errors.firstName?.message}
              helperText={
                errors?.firstName ? `${errors.firstName?.message}` : ""
              }
            />
          )}
          defaultValue={editUserData?.firstName || ""}
          name="firstName"
          control={control}
        />
        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              className="form-field"
              label="Last Name"
              variant="outlined"
              error={!!errors.lastName?.message}
              helperText={errors?.lastName ? `${errors.lastName?.message}` : ""}
            />
          )}
          defaultValue={editUserData?.lastName || ""}
          name="lastName"
          control={control}
        />

        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              className="form-field"
              variant="outlined"
              error={!!errors.email?.message}
              helperText={errors?.email ? `${errors.email?.message}` : ""}
            />
          )}
          defaultValue={editUserData?.email || ""}
          name="email"
          control={control}
        />

        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              label="Status"
              className="form-field"
              variant="outlined"
              error={!!errors.status?.message}
              helperText={errors?.status ? `${errors.status?.message}` : ""}
            />
          )}
          defaultValue={editUserData?.status ? "active" : "inactive"}
          name="status"
          control={control}
        />

        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              id="dob"
              InputLabelProps={{ shrink: true }}
              label="Date Of Birth"
              type="date"
              className="form-field"
              variant="outlined"
              error={!!errors.dob?.message}
              helperText={errors.dob ? `${errors.dob?.message}` : ""}
            />
          )}
          defaultValue={editUserData?.dob || ""}
          name="dob"
          control={control}
        />

        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              id="mobileNumber"
              label="Phone Number"
              className="form-field"
              variant="outlined"
              error={!!errors.mobileNumber?.message}
              helperText={
                errors.mobileNumber ? `${errors.mobileNumber?.message}` : ""
              }
            />
          )}
          defaultValue={editUserData?.mobileNumber || ""}
          name="mobileNumber"
          control={control}
        />

        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              id="address"
              label="Address"
              className="form-field"
              multiline
              rows={4}
              variant="outlined"
              error={!!errors.address?.message}
              helperText={errors.address ? `${errors.address?.message}` : ""}
            />
          )}
          defaultValue={editUserData?.address || ""}
          name="address"
          control={control}
        />

        <div className="btn-container">
          <Button
            type="submit"
            variant="outlined"
            sx={{
              color: "#181d1f",
              border: "1px solid #181d1f",
              ":hover": { backgroundColor: "#181d1f", color: "#fff" },
              ":focus": { outline: "none" },
            }}
          >
            Submit
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default UserForm;
