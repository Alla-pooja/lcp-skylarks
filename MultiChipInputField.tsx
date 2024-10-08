import CloseIcon from "@mui/icons-material/Close";
import { Box, InputBase, Paper, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import CustomChip from "./CustomChip";

export interface MultiChipInputFieldProps {
  placeholder: string;
  separator: string;
  onValueChange: (value: string[]) => void;
  [x: string]: any;
}
export default function MultiChipInputField({ placeholder, separator, onValueChange, ...rest }: MultiChipInputFieldProps) {
  const [inputText, setInputText] = useState<string>("");
  const [chips, setChips] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const theme = useTheme();

  useEffect(() => {
    if (rest.defaultTags) {
      setChips(rest.defaultTags);
      onValueChange(rest.defaultTags);
      setInputText(rest.defaultTags.join(separator));
      setIsEditing(false);
    }
  }, [rest.defaultTags]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (inputText.trim() !== "") {
      const newChips = inputText.split(separator).map((chip) => chip.trim());
      let totalChips = [...newChips];
      if (inputText === "") {
        totalChips = [...chips, ...totalChips];
      }
      setChips(totalChips);
      onValueChange(totalChips);
      setIsEditing(false);
    }
  };

  const handleChipDelete = (chipToDelete: string) => () => {
    const availableChips = chips.filter((chip: string) => chip !== chipToDelete);
    setInputText(availableChips.join(separator));
    setChips(availableChips);
    onValueChange(availableChips);
  };

  return (
    <Paper component="form" elevation={3}>
      {(chips.length <= 0 || isEditing) && (
        <InputBase
          placeholder={placeholder}
          value={inputText}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              // handleInputBlur(e);
            }
          }}
          fullWidth
          sx={{
            borderRadius: "4px",
            border: theme.palette.dashboardContainer.customListBorder,
            background: theme.palette.background.default,
            boxShadow: theme.palette.dashboardContainer.cardInsetBoxShadow,
            "& .MuiInputBase-input::placeholder": {
              color: (theme) => theme.palette.text.defaultInputField,
            },
          }}
          inputProps={{ style: { padding: "8px" } }}
        />
      )}
      {!isEditing && chips.length > 0 && (
        <Box
          onClick={() => setIsEditing(true)}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
            p: 1,
            borderRadius: "4px",
            border: theme.palette.dashboardContainer.customListBorder,
            background: theme.palette.background.default,
            boxShadow: theme.palette.dashboardContainer.cardInsetBoxShadow,
          }}
        >
          {chips.map((chip: string) => (
            <CustomChip
              key={chip}
              label={chip}
              sx={{
                color: theme.palette.error.btnText,
                height: "24px",
                border: "none",
                borderRadius: "4px",
              }}
              onDelete={handleChipDelete(chip)}
              variant="outlined"
              deleteIcon={<CloseIcon />}
            />
          ))}
        </Box>
      )}
    </Paper>
  );
}
