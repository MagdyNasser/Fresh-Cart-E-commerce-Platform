import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import { authContext } from "../Context/AuthContext";


export const cartContext = createContext();



export default function CartContextProvider({children}) {

    const { token } = useContext(authContext);

    // const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [products, setProducts] = useState(null);
    const [cartId, setCartId] = useState(null);
    console.log('cartId', cartId);

    function resetValues() {
    setTotalCartPrice(0);
    setProducts(null);
    setCartId(null);
    }

    // Dervied states :
    const numOfCartItems = products?.length;
 

  async  function addProductToCart(id){
    const res = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', 
    {
    productId: id,
    },
    {
        headers: { token: localStorage.getItem('tkn') }
    } )
    .then( function(resp){
        // console.log('res', res.data.numOfCartItems);
        // console.log('res', res.data.data.products);
        // console.log('res', res.data.data.totalCartPrice);

        // setNumOfCartItems(resp.data.numOfCartItems);
        // setProducts(resp.data.data.products);
        // setTotalCartPrice(resp.data.data.totalCartPrice);

        setCartId(resp.data.cartId);
        getUserCart();

        return true;
    } )
    .catch( function(err){
        console.log('err', err);

        return false;
    } );
    return res;
  }

  function getUserCart(){
    axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
    token: localStorage.getItem('tkn'),
}
    })
    .then(function(resp){
        console.log('resp',resp.data.numOfCartItems);
        console.log('resp',resp.data.data.totalCartPrice);
        console.log('resp',resp.data.data.products);

        // setNumOfCartItems(resp.data.numOfCartItems);
        setTotalCartPrice(resp.data.data.totalCartPrice);
        setProducts(resp.data.data.products);

        setCartId(resp.data.cartId);
    })
    .catch(function(err){
        console.log('err',err)
    })
  }


  async function updateCount(id, newCount){
    const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, 
    {
        "count": newCount,
    },
    {
        headers: {
            token: localStorage.getItem('tkn'),
        }
    }
    )
    .then(function(resp){
        // setNumOfCartItems(resp.data.numOfCartItems);
        setTotalCartPrice(resp.data.data.totalCartPrice);
        setProducts(resp.data.data.products);
        return true;
    })
    .catch(function(err){
        console.log('err', err)
        return false;
    })
    return res;
  }

  async function removeElementFromCart(id){
    const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        headers: {
            token: localStorage.getItem('tkn'),
        }
    })
    .then( (resp)=> {
        // setNumOfCartItems(resp.data.numOfCartItems);
        setTotalCartPrice(resp.data.data.totalCartPrice);
        setProducts(resp.data.data.products);

        return true;
    } )
    .catch( (err)=> {
        console.log('err', err);

        return false;
    } )
    return res;
  }

  useEffect(()=> {
    if(localStorage.getItem('tkn')) { 
        getUserCart();
    }
  }, [localStorage.getItem('tkn')])

    return (
        <cartContext.Provider value={ {
            addProductToCart,
            getUserCart,
            numOfCartItems,
            totalCartPrice,
            products,
            updateCount,
            removeElementFromCart,
            cartId,
            resetValues,
            } }>
            {children}
        </cartContext.Provider>
    )
}
