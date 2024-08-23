import React from "react";

interface LoadingProps {
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="min-w-screen flex min-h-screen animate-fade items-center justify-center bg-old-rose-100 p-5">
      <div className="flex animate-pulse space-x-2">
        <div className="h-3 w-3 rounded-full bg-old-rose-500"></div>
        <div className="h-3 w-3 rounded-full bg-old-rose-500"></div>
        <div className="h-3 w-3 rounded-full bg-old-rose-500"></div>
      </div>
    </div>
  );
};

export default Loading;
