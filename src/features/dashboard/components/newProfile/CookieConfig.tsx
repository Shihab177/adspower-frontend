"use client";
import React, { useRef, useState } from "react";
import { Plus, X } from "lucide-react";

const CookieConfig = () => {
  const [cookie, setCookie] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [otherCookie, setOtherCookie] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOk = () => {
    if (otherCookie.trim()) {
      setCookie((prev) =>
        prev.trim()
          ? prev.trim() + "\n" + otherCookie.trim()
          : otherCookie.trim(),
      );
    }
    setOtherCookie("");
    setModalOpen(false);
  };

  const handleCancel = () => {
    setOtherCookie("");
    setModalOpen(false);
  };

  return (
    <>
      {/* ── Cookie Row ── */}
      <div className=" w-2xl relative">
        <div className="flex">
          <input
            type="text"
            value={cookie}
            onChange={(e) => setCookie(e.target.value)}
            placeholder="Formats: JSON, Netscape, Name=Value"
            className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400 bg-white"
          />
          {/* Merge cookie button */}
        </div>
        <div className="flex justify-end absolute right-0">
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 transition-colors"
          >
            <Plus size={14} />
            Merge cookie
          </button>
        </div>
      </div>

      {/* ── Merge Cookie Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-2xl w-[560px] p-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Merge cookie
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cookie textarea row */}
            <div className="flex gap-4 mb-8">
              <label className="text-sm text-gray-600 shrink-0 pt-2">
                Cookie
              </label>
              <textarea
                value={otherCookie}
                onChange={(e) => setOtherCookie(e.target.value)}
                placeholder="Other Cookie"
                rows={6}
                className="flex-1 px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400 resize-none bg-white"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleOk}
                className="px-10 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                OK
              </button>
              <button
                onClick={handleCancel}
                className="px-8 py-2 border border-gray-300 text-gray-600 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConfig;
