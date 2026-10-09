const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov'];

export const isYoutube = (url: string) => url.includes('youtube.com') || url.includes('youtu.be');

export const isVideo = (url: string) =>
  isYoutube(url) || VIDEO_EXTENSIONS.some((ext) => url.toLowerCase().includes(ext));

export const getYoutubeEmbedUrl = (url: string) => {
  if (url.includes('watch?v=')) return url.replace('watch?v=', 'embed/');
  if (url.includes('youtu.be/')) return `https://www.youtube.com/embed/${url.split('youtu.be/')[1]}`;
  return url;
};
