package main

import (
    // "fmt"
    "net/http"
    "io/ioutil"
    "log"
    // "strings"
    // "os"

    "github.com/go-chi/chi/v5"
    "github.com/go-chi/chi/v5/middleware"
)

type card struct {
    ID    int   `json:"id"`
}

// // board represents data about a record board.
// type board struct {
//     ID      int  `json:"id"`
//     Title   string  `json:"title"`
//     Cards   []card   `json:"cards"`
// }

// // boards slice to seed record board data.
// var boards = []board{
//     {ID: 356, Title: "User manual", Cards: []card{
//         card{
//             ID: 35656,
//         },
//     }},
//     {ID: 899, Title: "Things to try", Cards: []card{
//         card{
//             ID: 75050,
//         },
//     }},
//     {ID: 740, Title: "More to try", Cards: []card{
//         card{
//             ID: 44646,
//         },
//     }},
// }

// func hello(w http.ResponseWriter, req *http.Request) {
//     fmt.Fprintf(w, "hello\n")
// }

// getBoards responds with the list of all boards as JSON.
// func getBoards(c *gin.Context) {
//     c.IndentedJSON(http.StatusOK, boards)
// }

func main() {
    port := "3001"
    // router := gin.Default()
    // router.GET("/api/boards", getBoards)

    // router.Run("localhost:8080")
    log.Printf("Starting up on http://localhost:%s", port)

    r := chi.NewRouter()
    r.Use(middleware.Logger)
    r.Route("/api/boards", func(r chi.Router) {
        r.Get("/", func(w http.ResponseWriter, r *http.Request) {
            resp, err := http.Get("https://jsonplaceholder.typicode.com/posts")
            if err != nil {
                log.Fatalln(err)
            }
            body, err := ioutil.ReadAll(resp.Body)
            if err != nil {
                log.Fatalln(err)
            }
            sb := string(body)
            // log.Printf(sb)
            w.Write([]byte(sb))
        })
		r.Post("/create", func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("api boards create"))
		})
		r.Delete("/remove", func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("api boards remove"))
		})
		r.Put("/modify", func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("api boards modify"))
		})
	})
    // r.Put("/ping", Ping)

    // r.Mount("/boards", boardsResource{}.Routes())
    
    http.ListenAndServe(":"+port, r)
}
