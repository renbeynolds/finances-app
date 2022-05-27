import { Rule } from 'antd/lib/form';
import _ from 'lodash';

export const serverValidator = <InputType>(
  fieldName: string,
  endpoint: string,
  setError: React.Dispatch<React.SetStateAction<string | null>>
): ((rule: Rule, input: InputType) => Promise<boolean>) => {
  return async (rule: Rule, input: InputType): Promise<boolean> => {
    return fetch(`${endpoint}?validateOnly=true`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [fieldName]: input }),
    })
      .then((response) => response.json())
      .then((data: IValidationData) => {
        const fieldErrors = _.filter(data.errors, { param: fieldName });
        if (fieldErrors.length > 0) {
          setError(fieldErrors[0].msg);
          return Promise.reject(fieldErrors[0].msg);
        } else {
          setError(null);
          return Promise.resolve(true);
        }
      });
  };
};
