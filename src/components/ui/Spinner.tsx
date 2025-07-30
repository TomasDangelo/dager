export default function Spinner() {
  return (
    <div className="flex justify-center py-4">
      <div className="w-8 h-8 border-4 border-t-[var(--primary-color)] border-gray-200 rounded-full animate-spin"></div>
    </div>
  );
}
