export function UserProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Sidebar */}
          <div className="col-span-1 md:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="flex animate-pulse flex-col items-center">
                <div className="h-32 w-32 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                <div className="mt-4 h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
                <div className="mt-2 h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-700"></div>
                <div className="mt-2 h-4 w-2/3 rounded bg-gray-300 dark:bg-gray-700"></div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                  <div className="flex-1">
                    <div className="h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-700"></div>
                    <div className="mt-2 h-6 w-1/4 rounded bg-gray-300 dark:bg-gray-700"></div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                  <div className="flex-1">
                    <div className="h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-700"></div>
                    <div className="mt-2 h-6 w-1/4 rounded bg-gray-300 dark:bg-gray-700"></div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                  <div className="flex-1">
                    <div className="h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-700"></div>
                    <div className="mt-2 h-6 w-1/4 rounded bg-gray-300 dark:bg-gray-700"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-1 md:col-span-3">
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="h-8 w-1/3 rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="h-48 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                <div className="h-48 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                <div className="h-48 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                <div className="h-48 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
