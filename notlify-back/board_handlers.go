package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Board struct {
	ID     int `json:"id"`
	Title  string `json:"title"`
}

var Boards []Board

func getBoardHandler(w http.ResponseWriter, r *http.Request) {

}

func createBoardHandler(w http.ResponseWriter, r *http.Request) {

}