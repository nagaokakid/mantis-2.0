import React, {ChangeEvent, FormEvent, useState} from 'react';

interface DynamicFormProps
{
    formTitles: string[];
}

interface FormState
{
    [key: string]: string;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formTitles }) => {
    const [formData, setFormData] = useState<FormState>({});
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log('Form Data Submitted:', formData);
      alert('Form data submitted: ' + JSON.stringify(formData, null, 2));
    };
  
    return (
      <form onSubmit={handleSubmit}>
        {formTitles.map((title, index) => (
          <div key={index}>
            <label>
              {title}:
              <input
                type="text"
                name={title}
                value={formData[title] || ''}
                onChange={handleChange}
              />
            </label>
          </div>
        ))}
        <input type="submit" value="Submit" />
      </form>
    );
  };

export default DynamicForm;