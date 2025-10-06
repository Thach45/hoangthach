export default function ProjectSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="relative aspect-video bg-gray-200 dark:bg-gray-700" />

      <div className="p-6">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        </div>

        {/* Tech stack skeleton */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"
            />
          ))}
        </div>

        {/* Metrics skeleton */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded"
            >
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-1" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}