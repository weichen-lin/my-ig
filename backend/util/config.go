package util

import (
	"github.com/spf13/viper"
)

type Config struct {
	// postgresql
	DBDriver string `mapstructure:"DBDriver"`
	DBSource string `mapstructure:"DBSource"`

	ServerAddress string `mapstructure:"ServerAddress"`

	// JWT token
	SecretKey     string `mapstructure:"SecretKey"`
	EncryptSecret string `mapstructure:"EncryptSecret"`

	// CORS
	IsDev         bool   `mapstructure:"IsDev"`
	AllowedDomain string `mapstructure:"AllowedDomain"`

	// send email
	AppPassword string `mapstructure:"AppPassword"`

	// minio
	MyIGBucketName string `mapstructure:"MyIGBucketName"`
	MinioEndpoint  string `mapstructure:"MinioEndpoint"`
	MinioAccessKey string `mapstructure:"MinioAccessKey"`
	MinioSecretKey string `mapstructure:"MinioSecretKey"`
}

func Loadconfig(path string, env string) (config Config, err error) {
	viper.AddConfigPath(path)
	viper.SetConfigName(env)
	viper.SetConfigType("env")

	viper.AutomaticEnv()

	err = viper.ReadInConfig()
	if err != nil {
		return
	}

	err = viper.Unmarshal(&config)
	if err != nil {
		return
	}

	return
}
