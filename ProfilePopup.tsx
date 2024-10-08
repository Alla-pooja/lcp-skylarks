import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, CardMedia, Typography, useTheme } from "@mui/material";
import { logout } from "../store/auth/authThunk";
import { useAppDispatch } from "../store/hooks";
import CustomDivider from "./CustomDivider";
import CustomIconButton from "./CustomIconButton";
import CustomTertiaryButton from "./CustomTertiaryButton";
import PrimaryLoadingButton from "./PrimaryLoadingButton";

export interface NotificationsPopupProps {
  handleClose: () => void;
}

export default function ProfilePopup({ handleClose }: NotificationsPopupProps) {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const workspaceDetails = [
    {
      id: 1,
      name: "Workspace name",
      member: 1,
      plan: "Free",
      active: true,
    },
    {
      id: 2,
      name: "Workspace name",
      member: 1,
      plan: "Free",
      active: false,
    },
    {
      id: 3,
      name: "Workspace name",
      member: 1,
      plan: "Free",
      active: false,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box padding={2} minWidth="24rem" maxHeight="24rem">
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1">Workspace 1</Typography>
        <CustomIconButton onClick={handleClose} sx={{ color: theme.palette.error.main }}>
          <CloseIcon />
        </CustomIconButton>
      </Box>
      <Box sx={{ mt: 2, maxHeight: "22rem", overflowY: "scroll" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.8, height: "20vh", overflow: "scroll", mb: 1 }}>
          {workspaceDetails?.map((detail) => (
            <Box
              key={`workspace-${detail?.id}`}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                background: detail?.active ? theme.palette.background.tertiaryGradientBgColor : theme.palette.background.gradientLight1,
                p: 1.4,
                width: "100%",
                borderRadius: 2,
                border: `1px solid ${theme.palette.additionalColors.lightBorder}`,
              }}
            >
              <CardMedia component="img" image="/assets/workspace-icon.png" alt="info" sx={{ width: "38px", height: "38px" }} />
              <Box display="flex" flexDirection="column" gap={0.8}>
                <Typography variant="subtitle1" sx={{ color: theme.palette.text.titleLabel }}>
                  {detail?.name}
                </Typography>
                <Box display="flex" gap={1}>
                  <Typography variant="body5" color={theme.palette.primary.inactiveIcon}>
                    {detail?.member} member
                  </Typography>
                  <FiberManualRecordIcon sx={{ color: theme.palette.primary.inactiveIcon, fontSize: "6px", mt: 0.2 }} />
                  <Typography variant="body5" color={theme.palette.primary.inactiveIcon}>
                    Plan: {detail?.plan}
                  </Typography>
                </Box>
              </Box>
              {detail?.active && <CheckIcon sx={{ color: theme.palette.text.default, ml: "auto", fontSize: "0.9em" }} />}
            </Box>
          ))}
        </Box>

        <CustomDivider width="100%" />

        <Box display="flex" alignItems="center" mt={1}>
          <PrimaryLoadingButton
            onClick={() => {}}
            sx={{
              ...theme.typography.bigButton,
              px: "1em",
            }}
          >
            Add Account
          </PrimaryLoadingButton>
          <CustomTertiaryButton
            onClick={handleLogout}
            startIcon={<LogoutIcon fontSize="small" />}
            sx={{ ...theme.typography.bigButton, ml: "auto", px: "2em" }}
          >
            Log Out
          </CustomTertiaryButton>
        </Box>
      </Box>
    </Box>
  );
}
