
import Image from 'next/image';
import image from "../../../../public/assets/image/login-image.png";

const LeftSlider = () => {
  return (
    <Image 
      src={image} 
      width={700} 
      height={700} 
      alt="Login Image"
      className='w-full h-full'
    />
  );
};


export default LeftSlider;