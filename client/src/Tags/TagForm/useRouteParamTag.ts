import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useRecoilValueLoadable } from 'recoil';
import { getTagPrefixRules } from '../Requests';
import { tagState } from '../TagsState';

export const useRouteParamTag = () => {
  const { tagId } = useParams();
  const tagIdInt = tagId ? parseInt(tagId) : null;
  const tag = useRecoilValueLoadable(tagState(tagIdInt));
  const [prefixRules, setPrefixRules] = useState<string[]>([]);

  useEffect(() => {
    const fetchPrefixRules = async () => {
      if (tagId) {
        setPrefixRules(await getTagPrefixRules(parseInt(tagId)));
      }
    };

    fetchPrefixRules();
  }, [tagId, setPrefixRules]);

  if (tag.state !== 'hasValue') {
    return null;
  }
  return { ...tag.contents, prefixRules };
};
