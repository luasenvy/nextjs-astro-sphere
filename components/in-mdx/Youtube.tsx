export interface YoutubeProps {
  v: string;
}

export default function Youtube({ v }: YoutubeProps) {
  return (
    <p>
      <iframe
        width="100%"
        height="400"
        src={`https://www.youtube.com/embed/${v}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </p>
  );
}
