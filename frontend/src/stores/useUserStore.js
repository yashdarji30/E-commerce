import {create} from "zustand";
import axios from "../lib/axios.js";
import {toast} from "react-hot-toast";

export const useUserStore = create((set, get) => ({
    user:null,
    loading:false,
    checkingAuth:false,

    signUp : async ({name,email,password,confirmPassword}) => {
        set({loading:true});

        if(password !== confirmPassword) {
            set({loading:false});

            return toast.error("Passeord do not match");
        }

        try {
            const res = await  axios.post("/auth/signup", {name,email,password});
            set({user: res.data, loading:false});
        } catch (error) {
            set({loading:false})
            toast.error(error.response.data.message || "An error occured");

        }
    },
    login : async(email,password) => {
        set({loading:true});

        try {
            const res = await axios.post("auth/login",{email,password});

            set({user: res.data,loading:false});

        } catch (error) {
            set({loading:false})

            toast.error(error.response.data.message || "An Error Ocuured");

        }
    },
    logout :  async () => {
        try {
            await axios.post("/auth/logout");
            set({user:null});

        } catch (error) {
            toast.error(error.response?.data?.message || " An Error Occurred during logout");
        }
    },

    checkAuth : async () => {
        set({checkingAuth: true})
        try {
            const response = await axios.get("/auth/profile");
            set({ user: response.data,checkingAuth:false});

        } catch (error) {
            console.log(error.message);
            set({checkingAuth:false,user:null});
        }
    },
    
}))