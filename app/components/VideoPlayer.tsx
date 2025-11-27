"use client";

import { FaPlayCircle } from "react-icons/fa";

interface VideoPlayerProps {
  videos: { url: string }[];
}

export function VideoPlayer({ videos }: VideoPlayerProps) {
  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      <div className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
        <FaPlayCircle />
        <span>Videos</span>
      </div>
      <div className="space-y-4">
        {videos.map((video, index) => (
          <div key={index}>
            <video controls className="w-full rounded">
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
}
