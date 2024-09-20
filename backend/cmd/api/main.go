package main

import (
	"fmt"
	"log"
	"net/http"
)

const port = 8080

type appConfig struct {
	Domain string
}

func main() {
	var app appConfig

	app.Domain = "example.com"

	log.Printf("Starting server on port %d", port)

	err := http.ListenAndServe(fmt.Sprintf(":%d", port), app.routes())
	if err != nil {
		log.Fatal(err)
	}
}
