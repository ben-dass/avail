package main

import (
	models "backend"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
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

	out, err := json.Marshal(payload)
	if err != nil {
		fmt.Println(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write(out)
}

func (app *appConfig) AllMovies(w http.ResponseWriter, r *http.Request) {
	var movies []models.Movie

	rd, _ := time.Parse(`2006-01-02`, "1986-03-07")
	highlander := models.Movie{
		ID:          1,
		Title:       "Highlander",
		ReleaseDate: rd,
		MPAARating:  "R",
		Runtime:     116,
		Description: "An immortal Scottish swordsman must confront the last of his immortal opponents, a murderously brutal barbarian who lusts for the fabled \"Prize\".",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	rd, _ = time.Parse(`2006-01-02`, "1981-06-12")
	rotla := models.Movie{
		ID:          2,
		Title:       "Raiders of the Lost Ark",
		ReleaseDate: rd,
		MPAARating:  "PG-13",
		Runtime:     115,
		Description: "In 1936, archaeologists and adventurers of the U.S. government hired Indiana Jones to find the Ark of the Covenant before the Nazis could obtain its extraordinary powers.",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	movies = append(movies, highlander)
	movies = append(movies, rotla)

	out, err := json.Marshal(movies)
	if err != nil {
		fmt.Println(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write(out)
}
