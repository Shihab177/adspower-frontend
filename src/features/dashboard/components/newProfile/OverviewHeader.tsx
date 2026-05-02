import { ArrowLeftRight } from "lucide-react";

const OverviewHeader = () => {
    return (
       <div className="flex items-center justify-between  border-b border-gray-300 pb-2.5">
      {/* বাম পাশের টেক্সট */}
      <h2 className="text-md font-medium text-gray-700">
        Overview
      </h2>

      {/* ডান পাশের বাটন */}
      <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium">
        <ArrowLeftRight size={20} />
        <span>New fingerprint</span>
      </button>
    </div>
    );
};

export default OverviewHeader;