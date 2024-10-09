import React from 'react';
import './styles.css';
import { Form } from './components/form';
import { FORM_CONFIG } from './constants/formConfig';
import { PROFILE_CONFIG } from './constants/profileConfig';

export default function App() {
  const handleSave = (formData) => {
    console.log('Save' ,formData);
  };

  return (
    <div className="App">
      <Form
        onSave={handleSave}
        formConfig={FORM_CONFIG}
        profile={PROFILE_CONFIG}
      />
    </div>
  );
}
