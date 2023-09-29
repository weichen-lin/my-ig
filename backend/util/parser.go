package util

import "github.com/google/uuid"

func ParseLocateAt(s string) (uuid.UUID, error) {
	if len(s) == 0 || s == "" {
		return uuid.Nil, nil
	}

	id, err := uuid.Parse(s)
	if err != nil {
		return uuid.Nil, err
	}
	return id, nil
}
