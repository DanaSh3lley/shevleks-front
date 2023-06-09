import {useParams} from "react-router-dom";
import Product from "../components/Product";

function ProductPage() {
  const { productId } = useParams();
  return <Product productId={productId} />;
}

export default ProductPage;
