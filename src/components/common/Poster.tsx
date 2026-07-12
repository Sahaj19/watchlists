import { useState } from 'react';
import { Image } from 'antd';
import noPoster from '../../assets/images/no-poster.png';

interface PosterProps {
  src: string;
  alt: string;
  height?: number;
  width?: number;
  borderRadius?: number;
}

function Poster({ src, alt, height = 380, width = 290, borderRadius = 8 }: PosterProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Image
      preview={false}
      src={src === 'N/A' || imageError ? noPoster : src}
      alt={alt}
      height={height}
      width={width}
      style={{ objectFit: 'contain', borderRadius }}
      onError={() => {
        setImageError(true);
        return false;
      }}
    />
  );
}

export default Poster;