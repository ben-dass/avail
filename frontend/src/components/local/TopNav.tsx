import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@src/app/store.ts";
import { selectCurrentUser, setCredentials } from "@src/features/auth/authSlice.ts";
import { useLogoutMutation } from "@src/app/services/auth";
import { useEffect } from "react";


const TopNav = () => {
    const email = useAppSelector( selectCurrentUser );
    const dispatch = useAppDispatch();
    
    const [ logout, { isError, isSuccess, error } ] = useLogoutMutation();
    
    useEffect(() => {
        if (isSuccess) {
            dispatch(setCredentials({
                email: null,
                access_token: null,
                refresh_token: null,
            }))
        } else if (isError) {
            console.log(error)
        }
    }, [isSuccess, isError, dispatch, error]);
    
    return (
        <div className="mt-[1.5rem] flex items-center justify-between rounded-lg bg-black bg-opacity-20 pb-[0.5rem] pt-[0.5rem] outline outline-[0.11rem] outline-black drop-shadow-lg backdrop-blur-lg">
            <h1 className="z-10 ml-[1rem] text-2xl font-bold tracking-widest text-slate-100">
                AVAIL
            </h1 >
            { typeof email === "string" ? (
                <p className="mr-[1rem] text-sm text-gray-400">
                    <span >{ email }</span >
                    &nbsp; | &nbsp;
                    <a
                        className="cursor-pointer transition duration-300 ease-in-out hover:text-white hover:underline"
                        onClick={ () => logout().unwrap() }
                    >
                        Logout
                    </a >
                </p >
            ) : (
                <NavLink
                    to="/login"
                    className="mr-[1rem] text-sm text-gray-400 transition duration-300 ease-in-out hover:text-white hover:underline"
                >
                    Login
                </NavLink >
            ) }
        </div >
    );
};

export default TopNav;
