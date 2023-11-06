package util

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"html/template"
	"log"
	"net/smtp"
	"time"

	"github.com/google/uuid"
)

type Sender struct {
	Email    string
	Password string
	Receiver string
	SecretKey string
}

type UserInfo struct {
	UserID     uuid.UUID
	ExpireTime time.Time
}

func SendMail(sender Sender, info UserInfo) {
	smtpHost := "smtp.gmail.com"
	smtpPort := 587
	senderEmail := sender.Email
	senderPassword := sender.Password

	token, err := EncryptToken(info, []byte(sender.SecretKey))
	if err != nil {
		log.Fatal(err)
	}

	templateData := struct {
		VerifyLink string
	}{
		VerifyLink: fmt.Sprintf("http://localhost:3000/verify?token=%s", token),
	}

	templateFile := "template/email_validate.html"
	tmpl, err := template.ParseFiles(templateFile)
	if err != nil {
		log.Fatal(err)
	}

	auth := smtp.PlainAuth("", senderEmail, senderPassword, smtpHost)

	var body bytes.Buffer
	if err := tmpl.Execute(&body, templateData); err != nil {
		log.Fatal(err)
	}

	msg := []byte(
		"From: " + "KuShare <kushare09487@gmail.com>" + "\r\n" +
			"To: " + sender.Receiver + "\r\n" +
			"Subject: Kushare Account Verification\r\n" +
			"MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n" +
			"\r\n" + body.String())

	err = smtp.SendMail(smtpHost+":"+fmt.Sprint(smtpPort), auth, senderEmail, []string{sender.Receiver}, msg)
	if err != nil {
		log.Fatal(err)
	}
}

func EncryptToken(token UserInfo, key []byte) (string, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}
	tokenBytes := []byte(fmt.Sprintf("%d;%d", token.UserID, token.ExpireTime.Unix()))

	nonce := make([]byte, gcm.NonceSize())
	if _, err = rand.Read(nonce); err != nil {
		return "", err
	}

	encrypted := gcm.Seal(nonce, nonce, tokenBytes, nil)
	return hex.EncodeToString(encrypted), nil
}

func DecryptToken(encryptedToken string, key []byte) (UserInfo, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return UserInfo{}, err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return UserInfo{}, err
	}

	encrypted, err := hex.DecodeString(encryptedToken)
	if err != nil {
		return UserInfo{}, err
	}

	decrypted, err := gcm.Open(nil, encrypted[:gcm.NonceSize()], encrypted[gcm.NonceSize():], nil)
	if err != nil {
		return UserInfo{}, err
	}

	data := string(decrypted)
	var userID uuid.UUID
	var expireTime int64
	fmt.Sscanf(data, "%d;%d", &userID, &expireTime)

	return UserInfo{
		UserID:     userID,
		ExpireTime: time.Unix(expireTime, 0),
	}, nil
}
