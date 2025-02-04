import { TextField, TextFieldProps } from '@mui/material';
import { FieldValues, useController, UseControllerProps} from 'react-hook-form';


export type ControlledTextFieldProps<T extends FieldValues> = TextFieldProps & UseControllerProps<T>;


/**
 * A reusable MUI TextField integrated with React Hook Form using `useController`.
 */
export function ControlledTextField<T extends FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  ...muiProps
}: ControlledTextFieldProps<T>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error }
  } = useController({
    name,
    control,
    rules,
    defaultValue
  });

  return (
    <TextField
      {...muiProps}         // pass through any MUI TextField props like label, variant, etc.
      inputRef={ref}        // attach ref for RHF
      value={value || ''}   // ensure value is always a string for TextField
      onChange={onChange}
      onBlur={onBlur}
      error={!!error}       // MUI prop to show an error state
      helperText={error ? error.message : muiProps.helperText}
    />
  );
}
