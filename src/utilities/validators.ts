export const maxLengthValidation = (value: string | undefined, limit: number | undefined = 300) => {
    if (value && value.length > limit) {
      return false
    }
  
    return true
  }