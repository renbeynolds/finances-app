import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Category } from '../entities/Category';
import { PrefixRule } from '../entities/PrefixRule';

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categoryRepository = getRepository(Category);

  const category = new Category();
  category.name = req.body.name;
  category.color = req.body.color;
  if (req.body.prefixRules) {
    category.prefixRules = req.body.prefixRules.map((p) => new PrefixRule(p));
  }
  if (req.body.parentCategoryId) {
    const parentCategory = await categoryRepository.findOne(
      req.body.parentCategoryId
    );
    category.parentCategory = parentCategory;
  }

  await categoryRepository.save(category);
  res.send(category);
};

export const searchCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categories = await getRepository(Category).find();
  res.send(categories);
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categoryRepository = getRepository(Category);
  const prefixRepository = getRepository(PrefixRule);

  const category = await categoryRepository.findOne(req.params.categoryId, {
    relations: ['prefixRules'],
  });
  category.name = req.body.name;
  category.color = req.body.color;

  if (req.body.parentCategoryId) {
    const parentCategory = await categoryRepository.findOne(
      req.body.parentCategoryId
    );
    category.parentCategory = parentCategory;
  } else {
    category.parentCategory = null;
  }

  const currentPrefixesToRemove = category.prefixRules.filter(
    (r) => !req.body.prefixRules.includes(r.prefix)
  );
  prefixRepository.remove(currentPrefixesToRemove);

  const currentPrefixesToKeep = category.prefixRules.filter((r) =>
    req.body.prefixRules.includes(r.prefix)
  );
  const newPrefixesToAdd = req.body.prefixRules
    .filter((p) => !category.prefixRules.map((r) => r.prefix).includes(p))
    .map((p) => new PrefixRule(p));
  category.prefixRules = currentPrefixesToKeep.concat(newPrefixesToAdd);

  await categoryRepository.save(category);
  res.send(category);
};
