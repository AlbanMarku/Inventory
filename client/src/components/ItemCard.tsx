import '../styles/itemCard.css';

type Props = {
  name: string;
  image: string;
};

function ItemCard({ name, image }: Props) {
  return (
    <div className="ItemCard">
      <h2>{name}</h2>
      <img src={image} alt="Product preview" />
    </div>
  );
}

export default ItemCard;
