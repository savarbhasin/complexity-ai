import { URLCard } from './URLCard';

export const URLGrid = ({ urls }: { urls: string[] }) => {
  if (!urls || urls.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto p-2">
      <div className="flex rounded-xl overflow-x-scroll max-w-full no-scrollbar">
        {urls.map((url, index) => (
          <URLCard key={index} url={url} />
        ))}
      </div>
    </div>
  );
};

export default URLGrid;
