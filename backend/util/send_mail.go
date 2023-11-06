package util

import (
	"bytes"
	"fmt"
	"html/template"
	"log"
	"net/smtp"
)

func SendMail() {
	// Gmail SMTP 伺服器相關設置
	smtpHost := "smtp.gmail.com"
	smtpPort := 587
	senderEmail := ""    // 更換成您的 Gmail 信箱
	senderPassword := "" // 更換成您的 Gmail 密碼

	// 收件人資訊
	recipientEmail := "" // 更換為收件人的郵件地址

	// 讀取 HTML 模板檔案
	templateData := struct {
		VerifyLink string
	}{
		VerifyLink: "https://www.google.com/",
	}

	templateFile := "template/email_validate.html"
	tmpl, err := template.ParseFiles(templateFile)
	if err != nil {
		log.Fatal(err)
	}

	// 連接至 Gmail SMTP 伺服器
	auth := smtp.PlainAuth("", senderEmail, senderPassword, smtpHost)

	var body bytes.Buffer
	if err := tmpl.Execute(&body, templateData); err != nil {
		log.Fatal(err)
	}

	// 設定郵件的 header 和 body
	msg := []byte("To: " + recipientEmail + "\r\n" +
		"Subject: Your Subject Here\r\n" +
		"MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n" +
		"\r\n" + body.String())

	// 寄送郵件
	err = smtp.SendMail(smtpHost+":"+fmt.Sprint(smtpPort), auth, senderEmail, []string{recipientEmail}, msg)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("郵件已成功寄出!")
}
