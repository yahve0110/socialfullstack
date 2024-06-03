package messageHandlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	database "social/internal/db"
	"social/internal/helpers"

	"github.com/google/uuid"
)

type ChatHistory struct {
	ChatID    string        `json:"chat_id"`
	Messages  []ChatMessage `json:"messages"`
	FoundChat bool          `json:"found_chat"`
}

type RequestBody struct {
	UserID2 string `json:"user_id_2"`
}

func OpenChat(w http.ResponseWriter, r *http.Request) {
	dbConnection := database.DB
	// Get the user ID based on the current user's session
	cookie, err := r.Cookie("sessionID")
	if err != nil {
		http.Error(w, "User not authenticated", http.StatusUnauthorized)
		return
	}

	// Get the user ID based on the current user's session
	userID1, err := helpers.GetUserIDFromSession(dbConnection, cookie.Value)
	if err != nil {
		http.Error(w, "User not authenticated", http.StatusUnauthorized)
		return
	}

	var requestBody RequestBody
	err = json.NewDecoder(r.Body).Decode(&requestBody)
	if err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		return
	}

	userID2 := requestBody.UserID2

	var userExists bool
	err = dbConnection.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE user_id = ?)", userID2).Scan(&userExists)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error checking user existence: %v", err), http.StatusInternalServerError)
		return
	}

	if !userExists {
		http.Error(w, "User with specified ID does not exist", http.StatusBadRequest)
		return
	}

	var chatID string
	err = dbConnection.QueryRow("SELECT chat_id FROM privatechat WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)", userID1, userID2, userID2, userID1).Scan(&chatID)
	if err == sql.ErrNoRows {

		newChatID := uuid.New().String()
	

		_, err := dbConnection.Exec("INSERT INTO privatechat (chat_id, user1_id, user2_id) VALUES (?, ?, ?)", newChatID, userID1, userID2)
		if err != nil {
			http.Error(w, fmt.Sprintf("Error creating private chat: %v", err), http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(ChatHistory{ChatID: newChatID, FoundChat: false})
		return
	} else if err != nil {
		http.Error(w, fmt.Sprintf("Error checking private chat: %v", err), http.StatusInternalServerError)
		return
	}

	rows, err := dbConnection.Query("SELECT message_author_id, content, timestamp FROM privatechat_messages WHERE chat_id = ?", chatID)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error getting chat history: %v", err), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var messages []ChatMessage
	for rows.Next() {
		var message ChatMessage
		err := rows.Scan(&message.MessageAuthorID, &message.Content, &message.Timestamp)
		if err != nil {
			http.Error(w, fmt.Sprintf("Error scanning message: %v", err), http.StatusInternalServerError)
			return
		}
		message.ChatID = chatID
		messages = append(messages, message)
	}

	json.NewEncoder(w).Encode(ChatHistory{ChatID: chatID, Messages: messages, FoundChat: true})
}
