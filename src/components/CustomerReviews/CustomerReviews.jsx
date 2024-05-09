import React from 'react'
import Icon from '../../img/star.svg'
import { MdOutlineStar } from 'react-icons/md'

export default function CustomerReviews() {
  return (
    <div className='grid grid-cols-1  xl:grid-cols-3 gap-y-[20px] xl:gap-[20px]'>
      <div className=''>
        <div className='p-[20px] bg-white rounded-t-[12px] border-[#2222220D] border-b-[2px]'>
          <h4 className='text-[16px] leading-[18px] font-bold'>Оценка</h4>
        </div>
        <div className='p-[20px] bg-white rounded-b-[12px] flex justify-center items-center gap-[14px] md:gap-[20px] xl:gap-[14px] '>
          <div>
            <h4 className='text-[53px] leading-[60px] text-[#222222] font-bold'>3.0</h4>
            <p className='text-[14px] leading-[16px] text-[#222222]  font-normal opacity-50'>15 оценок</p>
          </div>
          <div className={'flex flex-col gap-[2px]'}>
            {[...Array(5)].map((res, i) => (
              <div className={'grid grid-cols-3 items-center md:gap-[20px] xl:gap-[10px] gap-[10px]'} key={i}>
                <div className={'flex gap-[2px]'}>
                  {[...Array(5)].map((_, index) => (
                    <MdOutlineStar className={'w-[16px] h-[16px] md:w-[24px] md:h-[24px] xl:w-[16px] xl:h-[16px]'} key={index} color="#C0C0C0" />
                  ))}
                </div>
                <div className={'col-span-2'}>
                  <div className='relative w-[100%] h-[6px]  rounded-full bg-[#C0C0C0]'
                  >
                    <div className={`absolute top-0 left-0 bottom-0 rounded-full bg-[#DF2323] w-[${'70%'}]`} ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='col-span-2'>
        <div className=' p-[20px] bg-white rounded-t-[12px] border-[#2222220D] border-b-[2px]'>
          <h4 className='text-[16px] leading-[18px] font-bold'>Все отзывы</h4>
        </div>
        <div className='p-[20px] bg-white rounded-b-[12px] grid  grid-cols-1 md:grid-cols-2 gap-[20px]'>
          <div className='flex flex-col gap-[10px]'>
            <div className='flex items-center gap-[10px] pt-[10px] pb-[5px]'>
              <img className='w-[50px] h-[50px] object-cover rounded-full' src={'https://www.freecodecamp.org/news/content/images/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg'} alt="" />
              <div className='flex flex-col gap-[2px]'>
                <h4 className='text-[15px] leading-[20px] text-[#222222] font-bold'>Илья Югай</h4>
                <div className='text-[14px] leading-[18px] text-[#222222] font-bold flex justify-center items-center gap-1'>
                  <span>3.6</span>
                  <img src={Icon} className="w-[16px] h-[16px]" alt="" />
                  <span>CAM</span>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-[6px]'>
              <p className='text-[14px] leading-[16px] text-[#222222] font-normal opacity-70'>11.02.2024    15:32</p>
              <p className='text-[14px] leading-[16px] text-[#222222] font-normal'>Классное футбольное поле, 10 раз упала за час но ничего.</p>
              <img className='w-[100%] h-[150px] rounded-[12px] object-cover' src="https://www.freecodecamp.org/news/content/images/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg" alt="" />
            </div>
          </div>
          <div className='flex flex-col gap-[10px]'>
            <div className='flex items-center gap-[10px] pt-[10px] pb-[5px]'>
              <img className='w-[50px] h-[50px] object-cover rounded-full' src={'https://www.freecodecamp.org/news/content/images/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg'} alt="" />
              <div className='flex flex-col gap-[2px]'>
                <h4 className='text-[15px] leading-[20px] text-[#222222] font-bold'>Илья Югай</h4>
                <div className='text-[14px] leading-[18px] text-[#222222] font-bold flex justify-center items-center gap-1'>
                  <span>3.6</span>
                  <img src={Icon} className="w-[16px] h-[16px]" alt="" />
                  <span>CAM</span>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-[6px]'>
              <p className='text-[14px] leading-[16px] text-[#222222] font-normal opacity-70'>11.02.2024    15:32</p>
              <p className='text-[14px] leading-[16px] text-[#222222] font-normal'>Классное футбольное поле, 10 раз упала за час но ничего.</p>
              <img className='w-[100%] h-[150px] rounded-[12px] object-cover' src="https://www.freecodecamp.org/news/content/images/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
