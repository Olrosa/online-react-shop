import { useHttp } from "../hooks/https.hook";

const usePlatziService = () => {
    const {request} = useHttp();

    const _apiBase = 'https://api.escuelajs.co/api/v1/';

    const getAllProducts = async () => {
        const res = await request(`${_apiBase}products/`);
        return res.map(_transformProduct);
    }

    const _transformProduct = (item) => {
        return {
            id: item.id,
            title: item.title,
            description: item.description ? item.description : 'There is no description for this product',
            price: item.price,
            category: item.category,
            images: item.images
        }
    }


    return {getAllProducts}
}

export default usePlatziService;