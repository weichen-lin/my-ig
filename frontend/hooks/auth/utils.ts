export const PwdValidate = (value: string) => {
  const upperCaseRegex = /[A-Z]/g
  const numberRegex = /[0-9]/g
  const symbolRegex = /[!@#$%^&*]/g

  return [value.length >= 8, upperCaseRegex.test(value), numberRegex.test(value), symbolRegex.test(value)]
}
