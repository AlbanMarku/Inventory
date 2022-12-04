import '../styles/result.css';

type Props = {
  image: string;
  itemName: string;
};

function Result({ itemName, image }: Props) {
  return (
    <div className="Result">
      <p>{itemName}</p>
      <img id="imgSource" src={image} alt="Product" />
    </div>
  );
}

export default Result;
