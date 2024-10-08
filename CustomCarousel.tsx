import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, ImageList, ImageListItem, useTheme } from "@mui/material";
import { FC, useRef, useState } from "react";
import CustomIconButton from "./CustomIconButton";

interface CustomCarouselListProps {
  imageClickHandler?: () => void;
  images: { id: number; img: string }[];
}

const CustomCarousel: FC<CustomCarouselListProps> = ({ imageClickHandler, images }) => {
  const theme = useTheme();
  const listRef = useRef<any>(null);
  const [activeImg, setActiveImg] = useState<number>(0);

  const arrowUpHandler = () => {
    if (listRef?.current && listRef?.current?.scrollLeft > 0) {
      const newPosition = listRef?.current?.scrollLeft - 50;
      listRef.current.scrollLeft = newPosition;
    }
  };

  const arrowDownHandler = () => {
    const scrollWidth: any = listRef.current?.scrollWidth;
    if (listRef?.current && listRef?.current?.scrollLeft < scrollWidth) {
      const newPosition = listRef?.current.scrollLeft + 50;
      listRef.current.scrollLeft = newPosition;
    }
  };

  const selectImageHandler = (img: string, idx: number) => {
    setActiveImg(idx);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={2}
      sx={{
        width: "100%",
        background: (theme) => theme.palette.background.default,
        borderRadius: "4px",
      }}
    >
      <CustomIconButton
        sx={{
          width: "40px",
          minWidth: "40px",
          height: "40px",
          background: theme.palette.primary.tertiaryGradient,
          borderRadius: "50%",
          border: "none",
        }}
      >
        <KeyboardArrowLeftIcon
          onClick={arrowUpHandler}
          fontSize="large"
          cursor="pointer"
          sx={{
            margin: "10px 8px 10px 8px",
            color: theme.palette.primary.main,
          }}
        />
      </CustomIconButton>
      <ImageList
        ref={listRef}
        sx={{
          paddingLeft: "5px",
          paddingRight: "5px",
          display: "flex",
          flexWrap: "nowrap",
          overflowX: "scroll",
          height: "194px",
          width: "100%",
        }}
        gap={14}
      >
        {images?.map((notificationImage, idx) => (
          <ImageListItem
            key={idx}
            sx={{
              borderRadius: "4px",
              gap: 2,
              "& .MuiImageList-root": {
                gap: 2,
              },
            }}
            onClick={() => selectImageHandler(notificationImage.img, idx)}
          >
            <img
              src={notificationImage.img}
              alt=""
              style={{
                width: "272px",
                height: "194px",
                objectFit: "cover",
                borderRadius: "6px",
                cursor: "pointer",
              }}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <CustomIconButton
        sx={{
          width: "40px",
          minWidth: "40px",
          height: "40px",
          background: theme.palette.primary.tertiaryGradient,
          borderRadius: "50%",
          border: "none",
        }}
      >
        <KeyboardArrowRightIcon
          onClick={arrowDownHandler}
          fontSize="large"
          cursor="pointer"
          sx={{
            margin: "10px 8px 10px 8px",
            color: (theme) => theme.palette.primary.main,
          }}
        />
      </CustomIconButton>
    </Box>
  );
};

export default CustomCarousel;
