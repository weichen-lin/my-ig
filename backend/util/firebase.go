package util

import (
	"context"
	"fmt"

	"cloud.google.com/go/storage"
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

func GetFirebase() (*storage.BucketHandle, error) {
	opt := option.WithCredentialsFile("./credential.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		return nil, fmt.Errorf("error initializing at firebase Newapp: %v", err)
	}

	client, err := app.Storage(context.Background())
	if err != nil || client == nil {
		return nil, fmt.Errorf("error initializing at firebase Storage: %v", err)
	}

	bucketHandler, err := client.Bucket("kushare-7abab.appspot.com")

	return bucketHandler, nil
}
