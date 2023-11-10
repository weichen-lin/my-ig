package util

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"html/template"
	"net/smtp"
	"os"
	"strconv"
	"strings"
	"time"
)

type Sender struct {
	Email     string
	Password  string
	Receiver  string
	SecretKey string
}

type UserInfo struct {
	UserID     string
	ExpireTime time.Time
}

func SendMail(sender Sender, info UserInfo, errCh chan<- error) {
	env := os.Getenv("KUSHARE_APP_ENV")

	if env == "" {
		env = "test"
	}

	config, err := Loadconfig(".", env)
	if err != nil {
		errCh <- err
		return
	}

	smtpHost := "smtp.gmail.com"
	smtpPort := 587
	senderEmail := sender.Email
	senderPassword := sender.Password

	token, err := EncryptToken(info, []byte(sender.SecretKey))
	if err != nil {
		errCh <- err
		return
	}

	templateData := struct {
		VerifyLink string
	}{
		VerifyLink: fmt.Sprintf("%s/auth?token=%s", config.AllowedDomain, token),
	}

	templateFile := "template/email_validate.html"
	tmpl, err := template.ParseFiles(templateFile)
	if err != nil {
		errCh <- err
		return
	}

	auth := smtp.PlainAuth("", senderEmail, senderPassword, smtpHost)

	var body bytes.Buffer
	if err := tmpl.Execute(&body, templateData); err != nil {
		errCh <- err
		return
	}

	msg := []byte(
		"From: " + "KuShare <kushare09487@gmail.com>" + "\r\n" +
			"To: " + sender.Receiver + "\r\n" +
			"Subject: Kushare Account Verification\r\n" +
			"MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n" +
			"\r\n" + body.String())

	err = smtp.SendMail(smtpHost+":"+fmt.Sprint(smtpPort), auth, senderEmail, []string{sender.Receiver}, msg)
	errCh <- err
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

	tokenBytes := []byte(fmt.Sprintf("%s;%d", token.UserID, token.ExpireTime.Unix()))

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

	parts := strings.Split(data, ";")
	if len(parts) != 2 {
		return UserInfo{}, fmt.Errorf("invalid token")
	}

	userID := parts[0]
	number, err := strconv.ParseInt(parts[1], 10, 64)
	if err != nil {
		return UserInfo{}, err
	}

	return UserInfo{
		UserID:     userID,
		ExpireTime: time.Unix(number, 0),
	}, nil
}
