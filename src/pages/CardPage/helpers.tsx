import debounce from "debounce-promise";
import { BASE_URL } from "../../constants";
import { convertToCamelCase } from "../../utils/normalizeData";
import { RocketCard, GithubUser } from "../../interfaces/rocket";

export const validateRequiredFields = (formValues: Omit<RocketCard, "id">) => {
  const errors = [];
  if (formValues.title.trim() === "") {
    errors.push(formValues.title);
  }
  if (formValues.name.trim() === "") {
    errors.push(formValues.name);
  }
  return errors;
};

export const normalizeUsersSelectData = (data: GithubUser[] | null) => {
  const result = data && data.reduce((acc: any, user: any) => {
    return [...acc, { value: convertToCamelCase(user), label: user.login }];
  }, []);
  return result || [];
};

export const isFieldInError = (fieldName: string, errors: string[]) => {
  return errors.includes(fieldName);
};

const loadOptions = async (inputValue: string) => {
  if (!inputValue) {
    inputValue = "Q";
  }

  const response = await fetch(`${BASE_URL}/search/users?q=${inputValue}`);
  const data = await response.json();

  return normalizeUsersSelectData(data.items);
};

export const debounceLoadOptions = debounce(loadOptions, 400);
