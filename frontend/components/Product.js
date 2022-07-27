import { ProductStyle } from "../styles/ProductStyle";
import Link from "next/link";

export default function Product({ product }) {
  const { Title, Price, Image, Slug } = product.attributes;
  return (
    <ProductStyle>
      <Link href={`/product/${Slug}`}>
        <div>
          <img src={Image.data.attributes.formats.medium.url} alt=""></img>
        </div>
      </Link>
      <h2>{Title}</h2>
      <h3>{Price}</h3>
    </ProductStyle>
  );
}
