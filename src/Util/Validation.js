export function validateForm(formData) {

    const errors = {};
        if (!formData.name || formData.name.length < 3) {
          errors.name = 'Name must be at least 3 characters long';
        }
      
        if (!formData.gender) {
          errors.gender = 'Gender is a required field';
        }
      
        if (!formData.email) {
          errors.email = 'Email is a required field';
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
          }
        }
      
        if (formData.phone && !/^92\d{10}$/.test(formData.phone)) {
          errors.phone = 'Please enter a valid Pakistani phone number';
        }
      
        return errors;
      }