interface Props {
  fill?: string
  className?: string
  onClick?: () => void
}

export const ErrorIcon = (props: Props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 20 20'
    fill='currentColor'
    {...props}
  >
    <path
      fill-rule='evenodd'
      d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
      clip-rule='evenodd'
    />
  </svg>
)

export const LoadingIcon = (props: Props) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' {...props}>
    <path d='M231.6 44C149.4 54 79.6 110.5 54 187.7c-8.6 26-11.5 46.4-10.7 74.7.5 19.7 1.8 29.6 6.2 46.8 19.1 74.7 78.6 134.1 153.3 153.3 20.6 5.3 27.1 6 53.2 5.9 26 0 32.3-.7 53.1-6 29.7-7.4 60-22.9 83.5-42.6 46.9-39.4 75.4-97.9 75.8-155.4.1-15.9.1-16.1-2.6-20-4.4-6.2-9-8.8-16.7-9.2-8.1-.4-14.1 2.3-18.5 8.6-2.7 3.9-3 5-4.2 20.6-2.8 34.5-11.4 60.3-28.7 86.4-38.5 57.6-108.6 86.4-176.4 72.2C129.4 403.8 69.8 313.1 89 221.3 101.4 161.7 145 113 202.7 94c15.1-4.9 25.4-6.8 45.4-8.4 14.4-1.2 16.2-1.5 19.6-3.9 2.1-1.5 4.9-4.3 6.3-6.4 2.1-3.1 2.5-4.8 2.5-11.3 0-6.5-.4-8.2-2.5-11.3-1.4-2.1-4.3-5-6.4-6.5-3.7-2.6-4.5-2.7-16.5-2.9-6.9 0-15.7.3-19.5.7z' />
  </svg>
)
