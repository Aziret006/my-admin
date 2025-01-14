import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useSelector } from "react-redux";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export default function Gallery() {
  const { fieldsIdList, fieldsIdDetail } = useSelector((state) => state.fields);

  useEffect(() => {
    Fancybox.bind("[data-fancybox='gallery']", {});
  }, []);

  return (
    <>
      {fieldsIdDetail?.gallery_f_type?.length > 0 ? (
        <Box>
          <ImageList variant="masonry" cols={3} gap={8}>
            {fieldsIdDetail?.gallery_f_type?.map((item) => (
              <ImageListItem key={item.id}>
                <a href={item.img} data-fancybox="gallery">
                  <img
                    srcSet={`${item?.img}`}
                    src={`${item?.img}`}
                    alt={""}
                    loading="lazy"
                  />
                </a>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      ) : (
        <div className="flex items-center justify-center my-[10%]">
          <p className="text-[20px] font-[500] text-[#000]">
            Изображения отсутствуют
          </p>
        </div>
      )}
    </>
  );
}
