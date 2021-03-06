import { useState, useCallback } from 'react';

const useForm = (initialState, validate) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  // Set form data and errors
  const setDataAndErrors = useCallback((data) => {
    setFormData(data);
    let errors = validate(data);
    setErrors(errors);
  }, [validate]);
  // Change input handler
  const changeHandler = useCallback((e, relatedFieldName) => {
    let updatedData;
    if(e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
        if (relatedFieldName) {
            updatedData = {
                ...formData,
                [relatedFieldName]: {
                    ...formData[relatedFieldName],
                    fields: {
                        ...formData[relatedFieldName]['fields'],
                        [e.target.name]: e.target.checked,
                    },
                    touched: true
                } 
            };
            console.log('updatedData', updatedData);
        } else {
            updatedData = {
                ...formData,
                [e.target.name]: {
                ...formData[e.target.name],
                value: e.target.checked,
                touched: true
                }
            };
        }
    }else if(e.target.tagName === 'INPUT' && e.target.type === 'file') {
      updatedData = {
        ...formData,
        [e.target.name]: {
          ...formData[e.target.name],
          value: e.target.files,
          touched: true
        }
      };
    }else {
      updatedData = {
        ...formData,
        [e.target.name]: {
          ...formData[e.target.name],
          value: e.target.value,
          touched: true
        }
      };
    }
    setDataAndErrors(updatedData, e.target.name);
  }, [setDataAndErrors, formData]);
  return {
    formData, errors, changeHandler, setErrors, setFormData
  };
}
export default useForm;