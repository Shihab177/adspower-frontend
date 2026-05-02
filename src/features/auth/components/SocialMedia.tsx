import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const SocialMedia = () => {
    return (
      <div className="flex gap-3 mb-4">
        <button className="flex-1 border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2">
          <FcGoogle size={24} />
          Google
        </button>

        <button className="border border-gray-300 px-4 rounded-lg"><FaFacebook size={24}/></button>
        <button className="border border-gray-300 px-4 rounded-lg">vk</button>
      </div>
    );
};

export default SocialMedia;