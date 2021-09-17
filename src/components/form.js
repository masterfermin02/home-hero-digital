import React from 'react';
import Input from './input';
import Select from './select';
import Checkbox from './checkbox';
import useForm from '../hooks/useForm';
import validate from '../utils/validate';

const initialState = {
    firstName: {
      value: '',
      required: true,
      requiredMessage: 'First name required'
    },
    lastName: {
      value: '',
      required: true,
      requiredMessage: 'Last name required'
    },
    email: {
      value: '',
      required: true,
      requiredMessage: 'Email address is required!',
      email: true,
      emailMessage: 'Email address is not valid!'
    },
    org: {
        value: '',
        required: false
    },
    euResident: {
        value: '',
        required: true
    },
    checkBoxValidation: {
        fields: {
            advances: false,
            alerts: false,
            otherCommunication: false
        },
        requiredAtleastOne: true
    }
  };

const Form = () => {

    const { formData, errors, changeHandler, setErrors } = useForm(initialState, validate);
    const submit = (e) => {
        e.preventDefault();
        let newErrors = validate(formData, true);
        setErrors(newErrors);
        if(Object.keys(newErrors).length === 0) {
            const data = new FormData();
            data.append('firstName', formData.firstName.value);
            data.append('lastName', formData.lastName.value);
            data.append('email', formData.email.value);
            data.append('org', formData.org.value);
            data.append('euResident', formData.euResident.value);
            Object.keys(formData.checkBoxValidation.fields).forEach((field) => {
                data.append(field, formData.checkBoxValidation.fields[field])
            });
            console.log('form can be submitted...');
            for(let pair of data.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }
        }
    }

    return (
        <form className="form" onSubmit={submit}>
            <div className="flex">
                <div className="flex-1">
                  {errors.firstName && <span className="form__error">{errors.firstName}</span>}
                </div>
                <div className="flex-1">
                  {errors.lastName && <span className="form__error">{errors.lastName}</span>}
                </div>
            </div>
            <div className="flex">
              <Input 
                id="first-name"
                label="First name*"
                type="text"
                name="firstName"
                value={formData.firstName.value}
                onChange={changeHandler}
                error={errors.firstName}
              />
              <Input 
                id="last-name"
                label="Last name*"
                type="text"
                name="lastName"
                value={formData.lastName.value}
                onChange={changeHandler}
                error={errors.lastName}
              />
            </div>
            <div className="flex">
                <div className="flex-1">
                  {errors.email && <span className="form__error">{errors.email}</span>}
                </div>
            </div>
            <div className="flex">
              <Input 
                id="email"
                label="Email address*"
                type="text"
                name="email"
                value={formData.email.value}
                onChange={changeHandler}
                error={errors.email}
              />
              <Input 
                id="org"
                label="Organization"
                type="text"
                name="org"
              />
            </div>
            <div className="flex">
                <div className="flex-1">
                  {errors.euResident && <span className="form__error">{errors.euResident}</span>}
                </div>
            </div>
            <div className="flex">
                <Select 
                    label="EU resident*"
                    name="euResident"
                    id="euResident"
                    value={formData.euResident.value}
                    onChange={changeHandler}
                    options={[
                        { label: '- Select One -', value: '' },
                        { label: 'Yes', value: 'yes' },
                        { label: 'No', value: 'no' }
                    ]}
                />
            </div>
            <div className="flex">
                <div className="flex-1">
                  {errors.checkBoxValidation && <span className="form__error">{errors.checkBoxValidation}</span>}
                </div>
            </div>
            <div className="flex">
                <Checkbox 
                    label="advances"
                    id="advances"
                    name="advances"
                    value={formData.checkBoxValidation.fields.advances}
                    onChange={changeHandler}
                    relatedFieldName="checkBoxValidation"
                />
                <Checkbox 
                    label="ALERTS"
                    id="alerts"
                    name="alerts"
                    value={formData.checkBoxValidation.fields.alerts}
                    onChange={changeHandler}
                    relatedFieldName="checkBoxValidation"
                />
            </div>
            <div className="flex">
                <Checkbox 
                    label="OTHER COMMUNICATIONS"
                    id="otherCommunication"
                    name="otherCommunication"
                    value={formData.checkBoxValidation.fields.otherCommunication}
                    onChange={changeHandler}
                    relatedFieldName="checkBoxValidation"
                />
            </div>
            <div className="flex">
              <div >
                <button className="btn rounded-full">SUBMIT</button>
              </div>
              <div className="marging-x-10">
                <button className="btn btn-default rounded-full">RESET</button>
              </div>
            </div>
          </form>
    );
};

export default Form;
