interface EmailInputProps {
  inputName?: string;
  showLabel?: boolean;
  inputLabel?: string;
  inputPlaceholder?: string;
  isRequired?: boolean;
  helperText?: string;
}

/**
 * Renders an email input field.
 *
 * @param {EmailInputProps} props - The props for the EmailInput component.
 * @param {string} props.inputName - The name attribute for the input field.
 * @param {boolean} props.showLabel - Determines whether to show the input label.
 * @param {string} props.inputLabel - The label text for the input field.
 * @param {string} props.inputPlaceholder - The placeholder text for the input field.
 * @param {boolean} props.isRequired - Determines whether the input field is required.
 * @param {string} props.helperText - The helper text to display below the input field.
 * @returns {JSX.Element} The rendered EmailInput component.
 */
export default function EmailInput({
  inputName = "email",
  showLabel = true,
  inputLabel = "Email",
  inputPlaceholder = "example@example.com",
  isRequired = true,
  helperText = "",
}: EmailInputProps) {
  return (
    <div>
      {showLabel && (
        <label className='input-label' htmlFor={inputName}>
          {inputLabel} {isRequired && <label>*</label>}
        </label>
      )}
      <input
        className='input'
        type='email'
        name={inputName}
        pattern='[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$'
        title='Must be in form of "example@example.com"'
        placeholder={inputPlaceholder}
        required={isRequired}
      />
      {helperText && <p className='input-helper-text'>{helperText}</p>}
    </div>
  );
}
