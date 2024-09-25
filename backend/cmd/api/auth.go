package main

import (
	"fmt"
	"github.com/golang-jwt/jwt/v4"
	"net/http"
	"time"
)

type Login struct {
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

func (a *Login) GenerateTokenPair(user *JWTUser) (TokenPairs, error) {

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

func (a *Login) GetRefreshCookie(refreshToken string) *http.Cookie {
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

func (a *Login) GetExpiredRefreshCookie() *http.Cookie {
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
