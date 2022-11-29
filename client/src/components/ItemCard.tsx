type Props = {
  name: string;
  image: string;
};

function ItemCard({ name, image }: Props) {
  return (
    <div className="ItemCard">
      <h2>{name}</h2>
      <img src={image} alt="Product preview" style={{ width: '550px' }} />
    </div>
  );
}

export default ItemCard;
