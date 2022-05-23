import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useRecoilValueLoadable } from 'recoil';
import { getTagRegexRules } from '../Requests';
import { tagState } from '../TagsState';

export const useRouteParamTag = () => {
  const { tagId } = useParams();
  const tagIdInt = tagId ? parseInt(tagId) : null;
  const tag = useRecoilValueLoadable(tagState(tagIdInt));
  const [regexRules, setRegexRules] = useState<string[]>([]);

  useEffect(() => {
    const fetchRegexRules = async () => {
      if (tagId) {
        setRegexRules(await getTagRegexRules(parseInt(tagId)));
      }
    };

    fetchRegexRules();
  }, [tagId, setRegexRules]);

  if (tag.state !== 'hasValue') {
    return null;
  }
  return { ...tag.contents, regexRules };
};
