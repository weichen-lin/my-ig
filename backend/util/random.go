package util

import (
	"math/rand"
	"strings"
)

const alphabet = "abcdefghijklmnopqrstuvwxyz"

func Randomstring(n int) string {
	var sb strings.Builder

	K := len(alphabet)

	for i := 0; i < n; i++ {
		c := alphabet[rand.Intn(K)]
		sb.WriteByte(c)
	}

	return sb.String()
}
