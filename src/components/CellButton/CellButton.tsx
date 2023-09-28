import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CellButton = (props: any) => {
  const { buttonType, data, onBtnClick } = props;

  return (
    <IconButton onClick={() => onBtnClick(data)}>
      {buttonType === "edit" ? (
        <EditIcon
          sx={{
            ":focus": { outline: "none" },
            ":focus-visible": { outline: "none" },
            color: "#99c8ff",
          }}
        />
      ) : (
        <DeleteIcon
          sx={{
            ":focus": { outline: "none" },
            ":focus-visible": { outline: "none" },
            color: "#d53535",
          }}
        />
      )}
    </IconButton>
  );
};

export default CellButton;
