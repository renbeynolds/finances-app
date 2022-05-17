import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import {
  endDateState,
  startDateState,
  tagFilter,
  uploadFilter,
} from '../FiltersState';

const FilterDependencyEffect = (): null => {
  const uploadId = useRecoilValue(uploadFilter);
  const startDate = useRecoilValue(startDateState);
  const endDate = useRecoilValue(endDateState);

  const setStartDate = useSetRecoilState(startDateState);
  const setEndDate = useSetRecoilState(endDateState);
  const resetTagFilter = useResetRecoilState(tagFilter);
  const resetUploadFilter = useResetRecoilState(uploadFilter);

  // Set date range to match the transactions in the upload
  // when an upload is chosen
  useEffect(() => {
    setStartDate(null);
    setEndDate(null);
  }, [uploadId, setStartDate, setEndDate]);

  // Clear tag and upload filters when a different date
  // range is chosen
  useEffect(() => {
    resetTagFilter();
    resetUploadFilter();
  }, [startDate, endDate, resetTagFilter, resetUploadFilter]);

  return null;
};

export default FilterDependencyEffect;
