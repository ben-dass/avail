import { useEffect, useState } from "react";
import { useRefreshTokenQuery } from "@src/app/services/auth.ts";
import { useSelector } from "react-redux";
import { selectCurrentAccessToken } from "@src/features/auth/authSlice.ts";


const REFRESH_INTERVAL = 15 * 60 * 1000;

export const useTokenRefresh = () => {
    const accessToken = useSelector( selectCurrentAccessToken );
    const [ ticking, setTicking ] = useState( false );
    
    // Refresh access_token unless ticking is true
    const { refetch: refreshToken, isError, error } = useRefreshTokenQuery( undefined, {
        skip: !ticking,
    } );
    
    useEffect( () => {
        let intervalId: NodeJS.Timeout | undefined;
        
        if ( ticking ) {
            intervalId = setInterval( () => {
                refreshToken();
            }, REFRESH_INTERVAL );
        }
        
        return () => clearInterval( intervalId );
    }, [ ticking, refreshToken ] );
    
    // Start the interval if an access token exists, otherwise stop it
    useEffect( () => {
        if ( accessToken ) {
            setTicking( true );
        }
        else {
            setTicking( false );
        }
    }, [ accessToken ] );
    
    useEffect( () => {
        if ( isError ) {
            console.error( "useTokenRefresh.ts - useRefreshTokenQuery error:", error );
        }
    }, [ isError, error ] );
};
