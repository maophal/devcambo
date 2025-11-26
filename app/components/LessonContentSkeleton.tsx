export function LessonContentSkeleton() {
  return (
    <div className="w-full lg:w-3/4 space-y-8">
      {/* Lesson Header Skeleton */}
      <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="mt-4 h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>

      {/* Lesson Content Skeleton */}
      <div className="prose max-w-none rounded-lg bg-white p-6 shadow-lg dark:prose-invert dark:bg-gray-800 animate-pulse">
        <div className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
          <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
        <div className="mt-4 space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>

      {/* Live Code Editor Skeleton */}
      <div className="rounded-lg bg-white shadow-lg dark:bg-gray-800 animate-pulse">
        <div className="flex items-center gap-2 p-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
          <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
        <div className="p-6 pt-0">
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Quiz Skeleton */}
      <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 animate-pulse">
        <div className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
}
