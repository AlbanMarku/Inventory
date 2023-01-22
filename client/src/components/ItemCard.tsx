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
      <p>
        Proof of concept. Real product would have properly scaled images and
        item information.
      </p>
    </div>
  );
}

export default ItemCard;
