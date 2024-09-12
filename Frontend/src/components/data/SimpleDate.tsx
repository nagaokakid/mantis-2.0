export const simplifyDateValue = (dateObj: any): string =>
    {
      if (!dateObj)
      {
        return "";
      }
    
      const newDate = new Date(dateObj);
    
      return newDate.toLocaleString();
    }