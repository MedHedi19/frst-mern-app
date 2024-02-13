import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';



const authStore = create((set) => ({
    loggedIn: null,




    loginForm: {
        email: "",
        password: "",
    },

    signupForm: {
        email: "",
        password: "",
    },

    updateSignupForm: (e) => {
        try {
            const { name, value } = e.target;

            set((state) => {
                return {
                    signupForm: {
                        ...state.loginForm,
                        [name]: value
                    },
                };
            });
        } catch (err) {
            enqueueSnackbar(err.message, { variant: "error" });
        }
    },

    updateLoginForm: (e) => {
        try {
            const { name, value } = e.target;

            set((state) => {
                return {
                    loginForm: {
                        ...state.loginForm,
                        [name]: value
                    },
                };
            });
        } catch (err) {
            enqueueSnackbar(err.message, { variant: "error" });
        }
    },

    // login: async () => {

    //     try {
    //         const { loginForm } = authStore.getState();
    //         const res = await axios.post("http://localhost:3000/login", loginForm, {
    //             withCredentials: true,
    //         });
    //         set({ loggedIn: true });
    //         return res;
    //     } catch (err) {
    //         enqueueSnackbar(err.message, { variant: "error" });
    //         return;
    //     }
    // },

    checkAuth: async () => {
        try {
            await axios.get("http://localhost:3000/check-auth", { withCredentials: true });
            set({ loggedIn: true });
        } catch (err) {
            set({ loggedIn: false });
            enqueueSnackbar(err.message, { variant: "error" });
        }
    },

    // signup: async () => {

    //     try {
    //         const { signupForm } = authStore.getState();
    //         const res = await axios.post("http://localhost:3000/signup", signupForm, {
    //             withCredentials: true,
    //         });
    //         return res;
    //     } catch (err) {
    //         console.log(err);
    //         enqueueSnackbar(err.message, { variant: "error" });
    //         return;
    //     }
    // },
    logout: async () => {
        try {
            await axios.get("http://localhost:3000/logout")
            set({ loggedIn: false });
        } catch (err) {
            enqueueSnackbar(err.message, { variant: "error" });
        }
    }

}))

export default authStore;
