import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box, Typography, useTheme } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import React, { useState } from "react";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { useLocation, useSearchParams } from "react-router-dom";
import NewCustomAIModal from "../pages/CustomAI/components/NewCustomAIModal";
import NotificationsPopup from "../pages/notifications/components/NotificationsPopup";
import { HeaderIconProps, routes } from "../routes";
import { useHandleRouteClick } from "../routes/hooks";
import { magicEditActions } from "../store/analysis/magicEditSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import CustomIconButton from "./CustomIconButton";
import CustomPopover from "./CustomPopover";
import CustomTertiaryButton from "./CustomTertiaryButton";
import PrimaryLoadingButton from "./PrimaryLoadingButton";
import Profile from "./Profile";

interface HeaderProps {
  sx?: SxProps<Theme>;
  showOptions?: HeaderIconProps;
}

export default function Header({ sx, showOptions }: HeaderProps) {
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const handleRouteClick = useHandleRouteClick();
  const { magiceditPage } = useAppSelector((state: any) => state.magicEdit);

  const [notificationsPopupAnchorEl, setNotificationsPopupAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  //true only when magicEdit button is clicked for current page.
  const [editing, setEditing] = useState<boolean>(magiceditPage === page);

  const handleOpenNotificationsPopup = (event: React.MouseEvent<HTMLButtonElement>) => {
    setNotificationsPopupAnchorEl(event.currentTarget);
  };

  const handleCloseNotificationsPopup = () => {
    setNotificationsPopupAnchorEl(null);
  };

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleModalOpen = () => {
    setOpenModal((prev) => !prev);
  };

  const cancelHandler = () => {
    setEditing(false);
    dispatch(magicEditActions.handleCloseMagicEdit("entities"));
  };
  const updateDataHandler = () => {
    setEditing(false);
    dispatch(magicEditActions.handleUpdateMagicEdit("entities"));
  };
  const magicEditHandler = () => {
    setEditing(true);
    if (page === "entities") {
      dispatch(magicEditActions.handleMagicEdit("entities"));
    }
  };

  const openCart = () => {
    handleRouteClick(routes.cartItems.path);
  };

  return (
    <Box
      display="flex"
      gap={3}
      sx={{
        position: "absolute",
        zIndex: "1",
        right: "22px",
        top: { sm: "15px", md: "15px" },
        height: "36px",
        ...sx,
      }}
    >
      {showOptions?.cart && (
        <CustomTertiaryButton startIcon={<RiShoppingBag3Fill size={14} />} onClick={openCart}>
          Cart
        </CustomTertiaryButton>
      )}
      {showOptions?.magicEdit && (
        <>
          {editing && magiceditPage === page ? (
            <Box display="flex" gap={2} px={1} height="40px">
              <Box display="flex" flexDirection={{ xs: "column", md: "row" }} alignItems="center" justifyContent="center" gap={1}>
                <AutoFixHighIcon sx={{ fontSize: "18px", mt: -0.5, color: theme.palette.text.titleLabel }} />
                <Typography variant="subtitle1" textAlign="center" color={theme.palette.text.titleLabel}>
                  Magic Edit mode Activated
                </Typography>
              </Box>
              <Box display="flex" gap={3} px={1} height="40px">
                <CustomTertiaryButton
                  variant="contained"
                  sx={{
                    ...theme.typography.h6,
                  }}
                  onClick={cancelHandler}
                >
                  Cancel
                </CustomTertiaryButton>
                <PrimaryLoadingButton
                  sx={{
                    ...theme.typography.bigButton,
                    // width: "123px",
                  }}
                  onClick={updateDataHandler}
                >
                  Update Data
                </PrimaryLoadingButton>
              </Box>
            </Box>
          ) : (
            <PrimaryLoadingButton
              startIcon={<AutoFixHighIcon />}
              sx={{
                ...theme.typography.bigButton,
              }}
              onClick={magicEditHandler}
            >
              Magic Edit
            </PrimaryLoadingButton>
          )}
        </>
      )}
      {location.pathname === "/custom-ai" && (
        <PrimaryLoadingButton
          sx={{
            ...theme.typography.bigButton,
            width: "123px",
          }}
          onClick={handleModalOpen}
        >
          Create New
        </PrimaryLoadingButton>
      )}
      <NewCustomAIModal open={openModal} handleModalOpen={handleModalOpen} />

      {showOptions?.notificationIcon && (
        <>
          <CustomIconButton onClick={handleOpenNotificationsPopup} sx={{ color: theme.palette.text.default, width: "36px", height: "36px" }}>
            <NotificationsIcon />
          </CustomIconButton>
          <CustomPopover open={Boolean(notificationsPopupAnchorEl)} anchorEl={notificationsPopupAnchorEl} onClose={handleCloseNotificationsPopup}>
            <NotificationsPopup handleClose={handleCloseNotificationsPopup} />
          </CustomPopover>
        </>
      )}
      {showOptions?.profile && <Profile />}
    </Box>
  );
}
