'use client';

import React from 'react';
import { XIcon } from 'lucide-react';


type VideoModalProps = {
  embedUrl: string;
  onClose: () => void;
};

const VideoModal: React.FC<VideoModalProps> = ({ embedUrl, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
        <button
          onClick={onClose}
          className="absolute top-42 right-96 text-black text-xl bg-white/50 hover:bg-red-500/50 rounded-full p-2 z-10"
        >
          <XIcon/>
        </button>
      <div className="relative w-full max-w-3xl aspect-video bg-black rounded-lg overflow-hidden">
        <iframe
          src={embedUrl}
          title="Movie Player"
          allowFullScreen
          className="w-full h-full border-none"
        />
      </div>
    </div>
  );
};

export default VideoModal;
