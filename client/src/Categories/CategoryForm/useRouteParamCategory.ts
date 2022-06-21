import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useRecoilValueLoadable } from 'recoil';
import { categoryState } from '../CategoriesState';
import { getCategoryPrefixRules } from '../Requests';

export const useRouteParamCategory = () => {
  const { categoryId } = useParams();
  const categoryIdInt = categoryId ? parseInt(categoryId) : null;
  const category = useRecoilValueLoadable(categoryState(categoryIdInt));
  const [prefixRules, setPrefixRules] = useState<string[]>([]);

  useEffect(() => {
    const fetchPrefixRules = async () => {
      if (categoryId) {
        setPrefixRules(await getCategoryPrefixRules(parseInt(categoryId)));
      }
    };

    fetchPrefixRules();
  }, [categoryId, setPrefixRules]);

  if (category.state !== 'hasValue') {
    return null;
  }
  return { ...category.contents, prefixRules };
};
