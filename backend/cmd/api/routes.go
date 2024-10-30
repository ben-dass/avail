package main

import (
    "net/http"
    
    "github.com/go-chi/chi/v5"
    "github.com/go-chi/chi/v5/middleware"
    "github.com/go-chi/cors"
)

func (app *appConfig) routes() http.Handler {
    mux := chi.NewRouter()
    
    corsOptions := cors.New(cors.Options{
        AllowedOrigins:   []string{"http://localhost:5173"},
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
        AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
        AllowCredentials: true,
        MaxAge:           300,
    })
    
    mux.Use(corsOptions.Handler)
    mux.Use(middleware.Recoverer)
    
    mux.Get("/", app.Home)
    mux.Get("/movies", app.AllMovies)
    mux.Get("/refresh-token", app.RefreshToken)
    
    mux.Post("/logout", app.Logout)
    mux.Post("/authenticate", app.Authenticate)
    
    mux.Route("/admin", func(mux chi.Router) {
        mux.Use(app.authRequired)
        mux.Get("/manage-catalog", app.ManageCatalog)
    })
    
    return mux
}
