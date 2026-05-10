import { useProfileStore } from "@/store/createNewProfileStore";
import React, { useState } from "react";

const RemarkInput = () => {
  const remark = useProfileStore((state) => state.remark);
  const setRemark = useProfileStore((state) => state.setRemark);
  const maxLength = 1500;

  return (
    <div className="relative h-10 max-w-2xl">
      <input
        type="text"
        placeholder="Enter remark"
        value={remark}
        onChange={(e) => setRemark(e.target.value.slice(0, maxLength))}
        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg 
                     focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100
                     placeholder-gray-400 text-gray-700 transition-all pr-20"
      />

      {/* Character Counter */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm pointer-events-none">
        {remark.length} / {maxLength}
      </div>
    </div>
  );
};

export default RemarkInput;
