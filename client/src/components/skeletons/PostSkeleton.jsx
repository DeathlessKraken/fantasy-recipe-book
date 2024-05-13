export default function PostSkeleton () {
    return (
        <div className="flex flex-col gap-4 w-52">
            <div className="skeleton h-64 w-full flex place-content-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
          </div>
    );
}