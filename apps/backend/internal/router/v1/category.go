package v1

import (
	"github.com/labstack/echo/v4"
	"github.com/sarbojitrana/go-alfred/internal/handler"
	"github.com/sarbojitrana/go-alfred/internal/middleware"
)

func registerCategoryRoutes(r *echo.Group, h *handler.CategoryHandler, auth *middleware.AuthMiddleware) {
	//Category operations
	categories := r.Group("/categories")
	categories.Use(auth.RequireAuth)

	//Category collection operations
	categories.GET("", h.GetCategories)
	categories.POST("", h.CreateCategory)

	//Individual category operations
	dynamicCategory := categories.Group("/:id")
	dynamicCategory.GET("", h.GetCategoryByID)
	dynamicCategory.PATCH("", h.UpdateCategory)
	dynamicCategory.DELETE("", h.DeleteCategory)
}
