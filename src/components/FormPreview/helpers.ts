import * as yup from "yup";
import {
  EInputTypes,
  TInputElementSchema,
} from "../../types/globals";
import "../../styles/Index.css";
import "./FormPreview.css";
import { maxLengthValidation } from "../../utilities/validators";

export const generateErrorConfig = (
    elements?: Record<string, TInputElementSchema>,
    elementsIds?: string[]
  ): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (!elements) {
      return errors;
    }
    elementsIds?.forEach((id: string) => {
      const element = elements[id];
      errors[element.name] = "";
    });
    return errors;
  };
  
  export const generateFormData = (
    elements?: Record<string, TInputElementSchema>,
    elementsIds?: string[]
  ): Record<string, string | number | boolean> => {
    const formData: Record<string, string | number | boolean> = {};
    if (!elements) {
      return formData;
    }
    elementsIds?.forEach((id: string) => {
      const element = elements[id];
      switch (element.type) {
        case EInputTypes.NUMBER: {
          formData[element.name] = 0;
          break;
        }
        case EInputTypes.SELECT: {
          formData[element.name] = "";
          break;
        }
        case EInputTypes.TEXT: {
          formData[element.name] = "";
          break;
        }
      }
    });
    return formData;
  };
  
  export const generateValidationSchema = (
    elements?: Record<string, TInputElementSchema>,
    elementsIds?: string[]
  ) => {
    const validationConfig: Record<string, any> = {};
    if (!elements) {
      return validationConfig;
    }
  
    elementsIds?.forEach((id: string) => {
      const element = elements[id];
      let validator;
      if (element.type === EInputTypes.NUMBER) {
        validator = yup.number();
        if (element.min) {
          validator = validator
            .positive()
            .min(element.min, `Min is ${element.min}`);
        }
        if (element.max) {
          validator = validator
            .positive()
            .max(element.max, `Max is ${element.max}`);
        }
      } else {
        validator = yup.string();
        if (element.maxLength) {
          validator = validator.test(
            "max-length",
            `Must be less than ${element.maxLength} characters !`,
            (value) => maxLengthValidation(value)
          );
        }
      }
  
      if (element.required) {
        validator = validator.required();
      }
      validationConfig[element.name] = validator;
    });
  
    return yup.object().shape(validationConfig);
  };