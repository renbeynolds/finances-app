package service

import (
	"context"

	"github.com/renbeynolds/finances-app/database/entities"
	"github.com/renbeynolds/finances-app/modules/categories/dto"
	"github.com/renbeynolds/finances-app/modules/categories/query"
	"github.com/renbeynolds/finances-app/modules/categories/repository"
	"gorm.io/gorm"
)

type CategoryService interface {
	CreateCategory(ctx context.Context, req dto.CreateCategoryRequest) (dto.CategoryResponse, error)
	GetAllCategories(ctx context.Context) ([]dto.CategoryResponse, error)
	UpdateCategory(ctx context.Context, req dto.UpdateCategoryRequest, id uint) (dto.CategoryResponse, error)
	GetTopSpendingCategories(ctx context.Context, query query.TopSpendingCategoriesQuery) ([]dto.TopSpendingCategoryResponse, error)
	GetCategoryAmountOverTime(ctx context.Context, categoryID string, query query.CategoryAmountOverTimeQuery) ([]dto.CategoryAmountOverTimeResponse, error)
}

type categoryService struct {
	categoryRepository repository.CategoryRepository
	db                 *gorm.DB
}

func NewCategoryService(
	categoryRepo repository.CategoryRepository,
	db *gorm.DB,
) CategoryService {
	return &categoryService{
		categoryRepository: categoryRepo,
		db:                 db,
	}
}

func (s *categoryService) CreateCategory(ctx context.Context, req dto.CreateCategoryRequest) (dto.CategoryResponse, error) {
	category := entities.Category{
		Name:             req.Name,
		Color:            req.Color,
		Emoji:            req.Emoji,
		Type:             req.Type,
		ParentCategoryID: req.ParentCategoryID,
	}

	createdCategory, err := s.categoryRepository.CreateCategory(ctx, s.db, category)
	if err != nil {
		return dto.CategoryResponse{}, err
	}

	return entityToResponse(createdCategory), nil
}

func (s *categoryService) GetAllCategories(ctx context.Context) ([]dto.CategoryResponse, error) {
	categories, err := s.categoryRepository.GetAllCategories(ctx, s.db)
	if err != nil {
		return nil, err
	}

	var categoryResponses []dto.CategoryResponse
	for _, category := range categories {
		categoryResponses = append(categoryResponses, entityToResponse(category))
	}

	return categoryResponses, nil
}

func (s *categoryService) UpdateCategory(ctx context.Context, req dto.UpdateCategoryRequest, id uint) (dto.CategoryResponse, error) {
	// First get the existing category
	category, err := s.categoryRepository.GetCategoryByID(ctx, s.db, id)
	if err != nil {
		return dto.CategoryResponse{}, err
	}

	// Update only the fields that are provided
	if req.Name != nil {
		category.Name = *req.Name
	}
	if req.Color != nil {
		category.Color = req.Color
	}
	if req.Emoji != nil {
		category.Emoji = req.Emoji
	}
	if req.Type != nil {
		category.Type = *req.Type
	}
	if req.ParentCategoryID != nil {
		category.ParentCategoryID = req.ParentCategoryID
	}
	if req.Budget != nil {
		category.Budget = req.Budget
	}

	updatedCategory, err := s.categoryRepository.UpdateCategory(ctx, s.db, category)
	if err != nil {
		return dto.CategoryResponse{}, err
	}

	return entityToResponse(updatedCategory), nil
}

func (s *categoryService) GetTopSpendingCategories(ctx context.Context, query query.TopSpendingCategoriesQuery) ([]dto.TopSpendingCategoryResponse, error) {
	return s.categoryRepository.GetTopSpendingCategories(ctx, s.db, &query)
}

func (s *categoryService) GetCategoryAmountOverTime(ctx context.Context, categoryID string, query query.CategoryAmountOverTimeQuery) ([]dto.CategoryAmountOverTimeResponse, error) {
	return s.categoryRepository.GetCategoryAmountOverTime(ctx, s.db, categoryID, *query.From, *query.To)
}

func entityToResponse(category entities.Category) dto.CategoryResponse {
	var subCategories []dto.CategoryResponse
	for _, subCategory := range category.SubCategories {
		subCategories = append(subCategories, entityToResponse(subCategory))
	}

	color := ""
	if category.Color != nil {
		color = *category.Color
	}

	emoji := ""
	if category.Emoji != nil {
		emoji = *category.Emoji
	}

	return dto.CategoryResponse{
		ID:               category.ID,
		Name:             category.Name,
		Color:            color,
		Emoji:            emoji,
		Type:             category.Type,
		ParentCategoryID: category.ParentCategoryID,
		Budget:           category.Budget,
	}
}
