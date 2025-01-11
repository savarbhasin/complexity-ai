export const YouTubeEmbed = ({ videoId }: { videoId: string }) => (
    <div className="min-w-96 rounded-xl min-h-48 m-2 ml-0 overflow-hidden">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
    </div>
  );