import './ProductsListItem.scss';

const ProductsListItem = (props) => {

    const {title} = props;

    return (
        <div className="product">
           <h3 className="product__title">{title}</h3>
        </div>
    )
} 

export default ProductsListItem;