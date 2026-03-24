import React from 'react';

const Skeleton = ({ className }) => {
  return (
    <div className={`animate-pulse bg-white/5 rounded-xl ${className}`}></div>
  );
};

export const BlogCardSkeleton = () => {
    return (
        <div className="glass overflow-hidden rounded-[2rem] border border-white/5 flex flex-col h-full">
            <Skeleton className="h-64 w-full" />
            <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-6" />
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center space-x-3">
                        <Skeleton className="h-10 w-10 rounded-xl" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SingleBlogSkeleton = () => {
    return (
        <div className="pt-20 max-w-4xl mx-auto px-4">
            <Skeleton className="h-[450px] w-full rounded-[2.5rem] mb-12" />
            <Skeleton className="h-4 w-24 mb-6" />
            <Skeleton className="h-16 w-3/4 mb-8" />
            <div className="flex items-center justify-between py-6 border-y border-white/5 mb-10">
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-2xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        </div>
    );
}

export default Skeleton;
