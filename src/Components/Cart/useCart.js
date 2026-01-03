import { useContext } from "react";
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";

export default function useCart() {

  const { totalCartPrice, products, updateCount, removeElementFromCart } = useContext(cartContext);
  console.log('products', products);

  async function handleChangeCount(id, newCount){
    const res = await updateCount(id, newCount);

    res ? toast.success("Product Count Changed") : toast.error("Error")
  }

  async function handleDelete(id){
    const isSuccess = await removeElementFromCart(id) 
    
    if ( isSuccess ) {
      toast.success("Deleted", {position: "top-right"} )
    }else {
      toast.error("Error", {position: "top-right"} )
    }
  }


  return { totalCartPrice, handleChangeCount, handleDelete, products }
}
