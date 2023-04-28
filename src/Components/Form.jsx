import React, { useState, useEffect } from 'react';
import './index.css'
import Post from"../Api/post"
import{validateForm} from"../Util/Validation"

  function Form() {
    const [formData, setFormData] = useState({
      name: '',
      gender: '',
      email: '',
      phone: ''
    });
    const [serverResponse, setServerResponse] = useState("");
    const [formErrors, setFormErrors] = useState({});
    useEffect(() => {
      const queryParams = new URLSearchParams(window.location.search);
      const name = queryParams.get('name') || '';
      const gender = queryParams.get('gender') || '';
      const email = queryParams.get('email') || '';
      const phone = queryParams.get('phone') || '';
      setFormData({ name, gender, email, phone });
    }, []);
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
      setFormErrors({})
    };
    const handleSubmit =async (event) => {
      event.preventDefault();
      const formErrors = validateForm(formData);
      setFormErrors(formErrors);
      if (Object.keys(formErrors).length === 0) {
       try{
           const res=await Post(formData)
           setServerResponse(JSON.stringify(res))
           console.log(res);
            setFormData({
              name: '',
              gender: '',
              email: '',
              phone: ''
            });
      
          }catch(e){
       console.log(e);
          }
      }
    };
    
return (
    <div>
      {serverResponse}
    <div className='form-container'>
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData?.name}
          onChange={(event) => handleInputChange(event)}
        />
        {formErrors.name && <div className="error-message">{formErrors.name}</div>}
      </div>
      <div className="form-field">
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          type="gender"
          defaultValue={formData?.gender}
          onChange={(event) => handleInputChange(event)}
        >
         
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {formErrors.gender && <div className="error-message">{formErrors.gender}</div>}
      </div>
      <div className="form-field">
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData?.email}
          onChange={(event) => handleInputChange(event)}
        />
        {formErrors.email && <div className="error-message">{formErrors.email}</div>}
        </div>
        <div className="form-field">
      <label htmlFor="phone">Phone number:</label>
      <input
        id="phone"
        name="phone"
        type="tel"
        value={formData?.phone}
        onChange={(event) => handleInputChange(event)}
      />
      {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
    </div>
        <button type="submit" className="submit-button">  Submit  </button>
      </form>
      </div>
      </div>
      
  )
  }
  export default Form
