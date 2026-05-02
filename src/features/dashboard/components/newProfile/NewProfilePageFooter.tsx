import React from 'react';

const NewProfilePageFooter = () => {
    return (
        <div className='sticky bottom-0 z-50 border-t border-gray-100 bg-[#FFFFFF] shadow-[0_0_2px_rgba(0,0,0,0.2)] p-2 '>
          <button className='bg-blue-600 py-2 px-7 text-white rounded-md text-md font-semibold mr-6 ml-20'>ok</button>
          <button className='text-md font-semibold text-gray-400 hover:text-blue-500'>Cancel</button>
        </div>
    );
};

export default NewProfilePageFooter;