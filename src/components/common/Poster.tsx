import { Image } from 'antd';
import { PictureOutlined } from '@ant-design/icons';

interface PosterProps {
  src: string;
  alt: string;
  height?: number;
}

function Poster({
  src,
  alt,
  height = 380,
}: PosterProps) {
  if (src === 'N/A') {
    return (
      <div
        style={{
          height,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#f5f5f5',
          color: '#999',
        }}
      >
        <PictureOutlined style={{ fontSize: 40 }} />
        <span>No Poster Available</span>
      </div>
    );
  }

  return (
    <Image
      preview={false}
      src={src}
      alt={alt}
      height={height}
      width="100%"
      style={{ objectFit: 'cover' }}
      fallback="https://placehold.co/300x450?text=No+Poster"
    />
  );
}

export default Poster;