package repository

import "github.com/sarbojitrana/go-alfred/internal/server"

type Repositories struct{}

func NewRepositories(s *server.Server) *Repositories {
	return &Repositories{}
}