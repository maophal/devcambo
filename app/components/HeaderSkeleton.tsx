export function HeaderSkeleton() {
  return (
    <header className="border-b border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-900">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex animate-pulse items-center gap-6">
          <div className="h-6 w-24 rounded bg-gray-300 dark:bg-gray-700"></div>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <nav className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-6 w-20 rounded bg-gray-300 dark:bg-gray-700"></div>
            </div>
            <div className="h-8 w-20 rounded-md bg-gray-300 dark:bg-gray-700"></div>
          </nav>
        </div>
      </div>
    </header>
  );
}
