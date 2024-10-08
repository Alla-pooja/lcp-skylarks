import { useState } from "react";
import CustomPopover from "./CustomPopover";
import ProfilePopup from "./ProfilePopup";

export default function Profile() {
  const [profilePopupAnchorEl, setprofilePopupAnchorEl] = useState<HTMLImageElement | null>(null);

  const handleOpenNotificationsPopup = (event: React.MouseEvent<HTMLImageElement>) => {
    setprofilePopupAnchorEl(event.currentTarget);
  };

  const handleCloseNotificationsPopup = () => {
    setprofilePopupAnchorEl(null);
  };

  return (
    <>
      <img src="/assets/profile.png" alt="profile" onClick={handleOpenNotificationsPopup} style={{ cursor: "pointer" }} />
      <CustomPopover
        open={Boolean(profilePopupAnchorEl)}
        anchorEl={profilePopupAnchorEl}
        onClose={handleCloseNotificationsPopup}
        sx={{
          "& .MuiPopover-paper": {
            backgroundImage: (theme) => theme.palette.additionalColors.cardDefaultBorderImage,
            backgroundOrigin: "border-box",
            backgroundClip: "content-box, border-box",
            borderRadius: 2,
            p: "1px",
          },
        }}
      >
        <ProfilePopup handleClose={handleCloseNotificationsPopup} />
      </CustomPopover>
    </>
  );
}
