
export const TwitterEmbed = ({ tweetId }: { tweetId: string }) => (
    <div className="rounded-xl min-w-[20rem] mx-3 ml-0 max-h-[20rem] overflow-y-scroll">
      <div className="relative">
        <blockquote className="twitter-tweet" data-conversation="none">
          <a href={`https://twitter.com/i/status/${tweetId}`}></a>
        </blockquote>
        <script async src="https://platform.twitter.com/widgets.js"></script>
      </div>
      
    </div>
  );
  