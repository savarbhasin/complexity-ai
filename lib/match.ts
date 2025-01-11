export const getYouTubeVideoId = (url: string) => {
    const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|embed|shorts|watch))\??(?:.*v=)?|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };
  
export const getTweetId = (url: string) => {
    console.log(url)
    const regExp = /(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };