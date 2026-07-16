import { useState } from 'react';
import { Image } from 'antd';
import noPoster from '../../assets/images/no-poster.png';
import { MOVIE_CARD_WIDTH, MOVIE_POSTER_HEIGHT } from '../../utils/constants';

interface PosterProps {
  src: string;
  alt: string;
  height?: number;
  width?: number;
  borderRadius?: number;
}

function Poster({ src, alt, height = MOVIE_POSTER_HEIGHT, width = MOVIE_CARD_WIDTH, borderRadius = 8 }: PosterProps) {
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