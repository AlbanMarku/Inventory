import { useState } from 'react';

type Props = {
  image: string;
  itemName: string;
};

function Result({ itemName, image }: Props) {
  const [imageSource, setImageSource] = useState('');
  const showImg = () => {
    if (imageSource) setImageSource('');
    else setImageSource(image);
  };
  return (
    <div className="Result">
      <p>{itemName}</p>
      {imageSource ? (
        <img src={imageSource} alt="Product" />
      ) : (
        <button type="button" onClick={showImg}>
          Show image
        </button>
      )}
    </div>
  );
}

export default Result;
