import { useEffect } from "react";
import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import {
  DetailsStyle,
  ProductInfo,
  Quantity,
  Buy,
} from "../../styles/ProductDetails";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useStateContext } from "../../lib/context";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { quantity, setQuantity, increaseQuantity, decreaseQuantity, onAdd } =
    useStateContext();

  //reset Quantity
  useEffect(() => {
    setQuantity(1);
  }, []);

  //fetching slug
  const { query } = useRouter();

  //fetching query data
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { Slug: query.slug },
  });
  const { data, fetching, error } = results;
  //checking data incoming
  if (fetching) return <p>Loading..</p>;
  if (error) return <p>Error {error.message}</p>;

  //extracting data
  const { Title, Description, Image } = data.products.data[0].attributes;

  //Creating a toast
  const notify = () => {
    toast.success(`${Title} added to your cart`),
      {
        duration: 1500,
      };
  };

  return (
    <DetailsStyle>
      <img src={Image.data.attributes.formats.medium.url} alt="" />
      <ProductInfo>
        <h3>{Title}</h3>
        <p>{Description}</p>
        <Quantity>
          <span>Quantity</span>
          <button>
            <AiFillMinusCircle onClick={decreaseQuantity} />
          </button>
          <p>{quantity}</p>
          <button>
            <AiFillPlusCircle onClick={increaseQuantity} />
          </button>
        </Quantity>
        <Buy
          onClick={() => {
            onAdd(data.products.data[0].attributes, quantity);
            notify();
          }}
        >
          Add to Cart
        </Buy>
      </ProductInfo>
    </DetailsStyle>
  );
}
