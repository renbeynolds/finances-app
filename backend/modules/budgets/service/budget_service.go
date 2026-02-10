package service

import (
	"context"
	"time"

	"github.com/renbeynolds/finances-app/database/entities"
	"github.com/renbeynolds/finances-app/modules/budgets/dto"
	"github.com/renbeynolds/finances-app/modules/budgets/repository"
	"gorm.io/gorm"
)

type BudgetService interface {
	CreateBudget(ctx context.Context, req dto.CreateBudgetRequest) (dto.BudgetResponse, error)
	GetBudgetByID(ctx context.Context, id uint) (dto.BudgetResponse, error)
	GetAllBudgets(ctx context.Context) ([]dto.BudgetResponse, error)
	UpdateBudget(ctx context.Context, req dto.UpdateBudgetRequest, id uint) (dto.BudgetResponse, error)
	GetBudgetActuals(ctx context.Context, month string) ([]dto.BudgetActualResponse, error)
}

type budgetService struct {
	budgetRepository repository.BudgetRepository
	db               *gorm.DB
}

func NewBudgetService(
	budgetRepo repository.BudgetRepository,
	db *gorm.DB,
) BudgetService {
	return &budgetService{
		budgetRepository: budgetRepo,
		db:               db,
	}
}

func (s *budgetService) CreateBudget(ctx context.Context, req dto.CreateBudgetRequest) (dto.BudgetResponse, error) {
	budget := entities.Budget{
		Amount:     0,
		CategoryID: req.CategoryID,
	}

	createdBudget, err := s.budgetRepository.CreateBudget(ctx, s.db, budget)
	if err != nil {
		return dto.BudgetResponse{}, err
	}

	return entityToResponse(createdBudget), nil
}

func (s *budgetService) GetBudgetByID(ctx context.Context, id uint) (dto.BudgetResponse, error) {
	budget, err := s.budgetRepository.GetBudgetByID(ctx, s.db, id)
	if err != nil {
		return dto.BudgetResponse{}, err
	}

	return entityToResponse(budget), nil
}

func (s *budgetService) GetAllBudgets(ctx context.Context) ([]dto.BudgetResponse, error) {
	budgets, err := s.budgetRepository.GetAllBudgets(ctx, s.db)
	if err != nil {
		return nil, err
	}

	var budgetResponses []dto.BudgetResponse
	for _, budget := range budgets {
		budgetResponses = append(budgetResponses, entityToResponse(budget))
	}

	return budgetResponses, nil
}

func (s *budgetService) UpdateBudget(ctx context.Context, req dto.UpdateBudgetRequest, id uint) (dto.BudgetResponse, error) {
	// First get the existing budget
	existingBudget, err := s.budgetRepository.GetBudgetByID(ctx, s.db, id)
	if err != nil {
		return dto.BudgetResponse{}, err
	}

	// Update only the fields that are provided
	if req.Amount != nil {
		existingBudget.Amount = *req.Amount
	}

	updatedBudget, err := s.budgetRepository.UpdateBudget(ctx, s.db, existingBudget)
	if err != nil {
		return dto.BudgetResponse{}, err
	}

	return entityToResponse(updatedBudget), nil
}

func (s *budgetService) GetBudgetActuals(ctx context.Context, month string) ([]dto.BudgetActualResponse, error) {
	parsedDate, err := time.Parse("2006-01", month)
	if err != nil {
		return nil, err
	}

	// Calculate start and end of the month
	startOfMonth := parsedDate // Day 1, 00:00:00
	endOfMonth := startOfMonth.AddDate(0, 1, 0).Add(-time.Nanosecond)

	return s.budgetRepository.GetBudgetActuals(ctx, s.db, startOfMonth, endOfMonth)
}

func entityToResponse(budget entities.Budget) dto.BudgetResponse {
	return dto.BudgetResponse{
		ID:         budget.ID,
		Amount:     budget.Amount,
		CategoryID: budget.CategoryID,
	}
}
