import React, { useEffect, useState } from "react";
import { Map, Placemark, YMaps, ZoomControl } from "@pbe/react-yandex-maps";
import { IoClose } from "react-icons/io5";

export default function YandexMap({ mapLatLon, setMapLatLon, setIsModalMap }) {
  const [position, setPosition] = useState(mapLatLon);
  const handleClick = (event) => {
    const coords = event.get("coords");
    setPosition(coords);
  };  
  
  useEffect(() => {
    setMapLatLon(position);
  }, [position]);

  return (
    <div className={'absolute top-0 right-0 bottom-0 left-0 z-[1111] bg-[rgba(0,0,0,0.5)] w-[100%] h-[100%] flex justify-center items-center'}>
      <div className="bg-[#fff] flex flex-col rounded-[10px] relative lg:w-[80%] w-[90%] md:h-[60%] h-[50%]">
          <p className="text-[16px] md:text-[18px] font-normal text-[#000] absolute md:left-[16px] md:top-[16px] left-[10px] top-[10px] z-50">Нужно выбрать местоположение</p>
          <div className="absolute md:right-[16px] md:top-[16px] right-[10px] top-[10px] cursor-pointer z-50" onClick={() => setIsModalMap(false)}>
            <IoClose className="md:w-[32px] md:h-[32px] w-[24px] h-[24px]" />
          </div>
        <div className={'w-[100%] h-[100%] overflow-hidden'}>
          <YMaps className={'w-[100%] h-[100%] '}>
            <Map className="w-[100%] h-[100%] rounded-[10px] overflow-hidden"
              options={{ suppressMapOpenBlock: true }}
              defaultState={{
                center: position ? position : [42.875969, 74.603701],
                zoom: 9,
              }}
              onClick={handleClick}
              lang="en_US"
            >
              <ZoomControl options={{ float: "right" }} />
              {position && <Placemark geometry={position} />}
            </Map>
          </YMaps>
        </div>
      </div>
    </div>
  )
}
