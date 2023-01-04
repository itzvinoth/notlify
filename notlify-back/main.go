package main

import (
    // "fmt"
    "net/http"
	
	"github.com/gin-gonic/gin"
)

type card struct {
    ID    int   `json:"id"`
}

// board represents data about a record board.
type board struct {
    ID      int  `json:"id"`
    Title   string  `json:"title"`
    Cards   []card   `json:"cards"`
}

// boards slice to seed record board data.
var boards = []board{
    {ID: 356, Title: "User manual", Cards: []card{
        card{
            ID: 35656,
        },
    }},
    {ID: 899, Title: "Things to try", Cards: []card{
        card{
            ID: 75050,
        },
    }},
    {ID: 740, Title: "More to try", Cards: []card{
        card{
            ID: 44646,
        },
    }},
}

// func hello(w http.ResponseWriter, req *http.Request) {
//     fmt.Fprintf(w, "hello\n")
// }

// getBoards responds with the list of all boards as JSON.
func getBoards(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, boards)
}

func main() {
    router := gin.Default()
    router.GET("/api/boards", getBoards)

    router.Run("localhost:8080")
    // http.HandleFunc("/hello", hello)
    // http.ListenAndServe(":8080", nil)
}