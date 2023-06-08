import Product from "../components/Product";
import {useParams} from "react-router-dom";

const ProductPage = ({ match }) => {
    const { productId } = useParams();
    return <Product productId={productId}/>
}

export default ProductPage