package util

import (
	"github.com/spf13/viper"
)

type Config struct {
	DBDriver      string `mapstructure:"DBDriver"`
	DBSource      string `mapstructure:"DBSource"`
	ServerAddress string `mapstructure:"ServerAddress"`
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
