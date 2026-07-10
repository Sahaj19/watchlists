import { useState } from 'react';
import { Image } from 'antd';
import noPoster from '../../assets/images/no-poster.png';

interface PosterProps {
  src: string;
  alt: string;
  height?: number;
}

function Poster({ src, alt, height = 380 }: PosterProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Image
      preview={false}
      src={src === 'N/A' || imageError ? noPoster : src}
      alt={alt}
      height={height}
      width="100%"
      style={{ objectFit: 'cover' }}
      onError={() => {
        setImageError(true);
        return false;
      }}
    />
  );
}

export default Poster;