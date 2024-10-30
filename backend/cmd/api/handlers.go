package main

import (
    "errors"
    "net/http"
    "strconv"
    
    "github.com/golang-jwt/jwt/v4"
)

func (app *appConfig) Home(w http.ResponseWriter, r *http.Request) {
    var payload = struct {
        Status  string `json:"status"`
        Message string `json:"message"`
        Version string `json:"version"`
    }{
        Status:  "active",
        Message: "AVAIL backend up and running.",
        Version: "1.0.0",
    }
    
    _ = app.writeJSON(w, http.StatusOK, payload)
}

func (app *appConfig) AllMovies(w http.ResponseWriter, r *http.Request) {
    movies, err := app.DB.AllMovies()
    if err != nil {
        _ = app.errorJSON(w, err)
    }
    
    _ = app.writeJSON(w, http.StatusOK, movies)
}

func (app *appConfig) Authenticate(w http.ResponseWriter, r *http.Request) {
    
    // read JSON payload
    var requestPayload struct {
        Email    string `json:"email"`
        Password string `json:"password"`
    }
    
    err := app.readJSON(w, r, &requestPayload)
    if err != nil {
        _ = app.errorJSON(w, err, http.StatusBadRequest)
        return
    }
    
    // validate user against db
    user, err := app.DB.GetUserByEmail(requestPayload.Email)
    if err != nil {
        _ = app.errorJSON(w, errors.New("invalid credentials"), http.StatusBadRequest)
        return
    }
    
    // check password
    valid, err := user.PasswordMatches(requestPayload.Password)
    if err != nil || !valid {
        _ = app.errorJSON(w, errors.New("invalid credentials"), http.StatusBadRequest)
        return
    }
    
    // create a jwt user
    u := JWTUser{
        ID:        user.ID,
        FirstName: user.FirstName,
        LastName:  user.LastName,
    }
    
    // generate tokens
    tokens, err := app.auth.GenerateTokenPair(&u)
    if err != nil {
        _ = app.errorJSON(w, err)
        return
    }
    
    refreshCookie := app.auth.GetRefreshCookie(tokens.Token)
    http.SetCookie(w, refreshCookie)
    
    _ = app.writeJSON(w, http.StatusAccepted, tokens)
}

// RefreshToken is to refresh the expired access_token based on the validated refresh_token
func (app *appConfig) RefreshToken(w http.ResponseWriter, r *http.Request) {
    for _, cookie := range r.Cookies() {
        if cookie.Name == app.auth.CookieName {
            claims := &Claims{}
            refreshToken := cookie.Value
            
            // parse the token to get the claims
            _, err := jwt.ParseWithClaims(refreshToken, claims, func(token *jwt.Token) (any, error) {
                return []byte(app.JWTSecret), nil
            })
            if err != nil {
                _ = app.errorJSON(w, errors.New("unauthorized"), http.StatusUnauthorized)
                return
            }
            
            // get the user id from the token claims
            userID, err := strconv.Atoi(claims.Subject)
            if err != nil {
                _ = app.errorJSON(w, errors.New("unknown user"), http.StatusUnauthorized)
                return
            }
            
            user, err := app.DB.GetUserByID(userID)
            if err != nil {
                _ = app.errorJSON(w, errors.New("unknown user"), http.StatusUnauthorized)
                return
            }
            
            u := JWTUser{
                ID:        user.ID,
                FirstName: user.FirstName,
                LastName:  user.LastName,
            }
            
            tokenPairs, err := app.auth.GenerateTokenPair(&u)
            if err != nil {
                _ = app.errorJSON(w, errors.New("error generating token pair"), http.StatusUnauthorized)
                return
            }
            
            http.SetCookie(w, app.auth.GetRefreshCookie(tokenPairs.RefreshToken))
            _ = app.writeJSON(w, http.StatusOK, tokenPairs)
        }
    }
}

func (app *appConfig) Logout(w http.ResponseWriter, r *http.Request) {
    http.SetCookie(w, app.auth.GetExpiredRefreshCookie())
    w.WriteHeader(http.StatusAccepted)
}

func (app *appConfig) ManageCatalog(w http.ResponseWriter, r *http.Request) {
    movies, err := app.DB.AllMovies()
    if err != nil {
        _ = app.errorJSON(w, err)
        return
    }
    
    _ = app.writeJSON(w, http.StatusOK, movies)
}
