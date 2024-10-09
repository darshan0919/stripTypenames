import { TextField } from './components/fields/TextField';
import { NumberField } from './components/fields/NumberField';
import { SelectField } from './components/fields/SelectField';
import { useState } from 'react';

const TYPE_VS_COMPONENT = {
  TEXT: TextField,
  NUMBER: NumberField,
  SELECT: SelectField,
};

export const Form = ({ onSave, formConfig, profile }) => {
  const [formValues, setFormValues] = useState(profile);

  const handleSubmit = (e) => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    onSave(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <h2 className="text-lg font-semibold leading-7 text-gray-900">
          Personal Information
        </h2>

        <div className="flex flex-col gap-6">
          {formConfig.map(({ type, ...formElementProps }) => {
            const Component = TYPE_VS_COMPONENT[type];

            if (!Component) return null;

            const elementId = formElementProps.id;

            return (
              <div key={elementId} className="col-span-full">
                <Component
                  {...formElementProps}
                  value={formValues[elementId]}
                  onChange={(newValue) => {
                    setFormValues((prevValues) => ({
                      ...prevValues,
                      [elementId]: newValue,
                    }));
                  }}
                />
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};
