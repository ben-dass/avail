package main

import (
    "errors"
    "fmt"
    "net/http"
    "strings"
    "time"
    
    "github.com/golang-jwt/jwt/v4"
)

type Auth struct {
    Issuer        string
    Audience      string
    Secret        string
    TokenExpiry   time.Duration
    RefreshExpiry time.Duration
    CookieDomain  string
    CookiePath    string
    CookieName    string
}

type JWTUser struct {
    ID        int    `json:"id"`
    FirstName string `json:"first_name"`
    LastName  string `json:"last_name"`
}

type TokenPairs struct {
    Token        string `json:"access_token"`
    RefreshToken string `json:"refresh_token"`
}

type Claims struct {
    jwt.RegisteredClaims
}

func (a *Auth) GenerateTokenPair(user *JWTUser) (TokenPairs, error) {
    
    // Create a token
    token := jwt.New(jwt.SigningMethodHS256)
    
    // Set the claims
    claims := token.Claims.(jwt.MapClaims)
    claims["name"] = fmt.Sprintf("%s %s", user.FirstName, user.LastName)
    claims["sub"] = fmt.Sprint(user.ID)
    claims["aud"] = a.Audience
    claims["iss"] = a.Issuer
    claims["iat"] = time.Now().UTC().Unix()
    claims["typ"] = "JWT"
    
    //	Set the JWT expiry
    claims["exp"] = time.Now().UTC().Add(a.TokenExpiry).Unix()
    
    // Create a signed token
    signedAccessToken, err := token.SignedString([]byte(a.Secret))
    if err != nil {
        return TokenPairs{}, err
    }
    
    // Create a refresh token and set claims
    refreshToken := jwt.New(jwt.SigningMethodHS256)
    refreshTokenClaims := refreshToken.Claims.(jwt.MapClaims)
    refreshTokenClaims["sub"] = fmt.Sprint(user.ID)
    refreshTokenClaims["iat"] = time.Now().UTC().Unix()
    
    // Set the expiry for the refresh token
    refreshTokenClaims["exp"] = time.Now().UTC().Add(a.RefreshExpiry).Unix()
    
    // Create a signed refresh token
    signedRefreshToken, err := refreshToken.SignedString([]byte(a.Secret))
    if err != nil {
        return TokenPairs{}, err
    }
    
    // Create TokenPairs and populate with signed tokens
    var tokenPairs = TokenPairs{
        Token:        signedAccessToken,
        RefreshToken: signedRefreshToken,
    }
    
    return tokenPairs, nil
}

func (a *Auth) GetRefreshCookie(refreshToken string) *http.Cookie {
    return &http.Cookie{
        Name:     a.CookieName,
        Path:     a.CookiePath,
        Value:    refreshToken,
        Expires:  time.Now().UTC().Add(a.RefreshExpiry),
        MaxAge:   int(a.RefreshExpiry.Seconds()),
        SameSite: http.SameSiteStrictMode,
        Domain:   a.CookieDomain,
        HttpOnly: true,
        Secure:   true,
    }
}

func (a *Auth) GetExpiredRefreshCookie() *http.Cookie {
    return &http.Cookie{
        Name:     a.CookieName,
        Path:     a.CookiePath,
        Value:    "",
        Expires:  time.Unix(0, 0),
        MaxAge:   -1,
        SameSite: http.SameSiteStrictMode,
        Domain:   a.CookieDomain,
        HttpOnly: true,
        Secure:   true,
    }
}

func (a *Auth) GetTokenFromHeaderAndVerify(w http.ResponseWriter, r *http.Request) (string, *Claims, error) {
    w.Header().Add("Vary", "Authorization")
    
    authHeader := r.Header.Get("Authorization")
    if authHeader == "" {
        return "", nil, errors.New("missing authorization header")
    }
    
    headerParts := strings.SplitN(authHeader, " ", 2)
    if len(headerParts) != 2 || headerParts[0] != "Bearer" {
        return "", nil, errors.New("invalid authorization header")
    }
    
    token := headerParts[1]
    claims := &Claims{}
    _, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (any, error) {
        if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
        }
        
        return []byte(a.Secret), nil
    })
    
    if err != nil {
        if strings.HasPrefix(err.Error(), "token is expired by") {
            return "", nil, errors.New("expired token")
        }
        return "", nil, err
    }
    
    if claims.Issuer != a.Issuer {
        return "", nil, errors.New("invalid issuer")
    }
    
    return token, claims, nil
}
