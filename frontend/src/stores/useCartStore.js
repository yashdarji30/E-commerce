import {create} from "zustand"
import axios from "../lib/axios.js";
import { toast} from "react-hot-toast";

export const useCartStore = create((set,get) => ({
    cart:[],
    coupon: null,
    total: 0,
    subtotal: 0,
    isCouponApplied: false,

    getMyCoupon: async () => {
        try {
            const response = await axios.get("/coupons");
            set({ coupon : response.data});

        } catch (error) {
            console.error("Error fetching coupon:",error)

        }
    },
    applyCoupon: async (code) => {
        try {
            const response = await axios.post("/coupons/validate",{code});
            set({coupon:response.data,isCouponApplied:true});
            get().calculateTotal();
            toast.success("Coupon applied successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to apply coupon");
        }
    },
    removeCoupon : () => {
        set({coupon:null,isCouponApplied:false});
        get().calculateTotal();
        toast.success("Coupon removed");
    },
    getcartItems: async () => {
        try {
            const res = await axios.get("/cart");
            set({cart:res.data});
            get().calculateTotal();
        } catch (error) {
            set({cart: []});
            toast.error(error.response.data.message || "Failed to get cart items");
        }
    },
    clearCart: async() => {
        set({cart: [],coupon:null,total:0,subtotal:0});

    },
    addToCart: async (product) => {
        try {
            await axios.post("/cart",{productId:product._id})
            toast.success("Product added to cart");

            set((prevstate) => {
                const existingItem = prevstate.cart.find((item) => item._id === product._id);
                const newCart = existingItem ? prevstate.cart.map((item) => item._id === product._id ? {...item, quantity: item.quantity + 1}: item)
            : [...prevstate.cart,{...product,quantity:1}]
            return {cart:newCart}
            
            })

            get().calculateTotal();
        } catch (error) {
            toast.error(error.response.data.message || "An error occurred");
        }
    }
}))