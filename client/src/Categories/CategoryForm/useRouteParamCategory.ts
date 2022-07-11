import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useRecoilValueLoadable } from 'recoil';
import { categoryState } from '../CategoriesState';
import { CategoryDTO } from '../CategoryDTO';
import { getCategoryPrefixRules } from '../Requests';

export const useRouteParamCategory = () => {
  const { categoryId } = useParams();
  const categoryIdInt = categoryId ? parseInt(categoryId) : null;
  const category = useRecoilValueLoadable(categoryState(categoryIdInt));
  const [answer, setAnswer] = useState<
    (CategoryDTO & { prefixRules: string[] }) | undefined
  >();

  useEffect(() => {
    const fetchPrefixRules = async () => {
      if (category.state === 'hasValue') {
        const prefixRules = await getCategoryPrefixRules(
          category.contents?.id!
        );
        setAnswer({ ...category.contents!, prefixRules });
      }
    };

    fetchPrefixRules();
  }, [category, setAnswer]);

  if (category.state !== 'hasValue') {
    return null;
  }
  return answer;
};
