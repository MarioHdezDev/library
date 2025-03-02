import {
  FieldValues,
  useController,
  UseControllerProps
} from 'react-hook-form';
import {
  Checkbox,
  CheckboxProps,
  FormControlLabel
} from '@mui/material';

export type ControlledCheckboxProps<T extends FieldValues> = Omit<CheckboxProps, "name"> & UseControllerProps<T> & {label: string}

/**
 * A reusable MUI Checkbox integrated with React Hook Form using `useController`.
 */
export function ControlledCheckbox<T extends FieldValues>({
  name,
  control,
  label,
  rules,
  defaultValue,
  ...checkboxProps
}: ControlledCheckboxProps<T>) {
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
    <FormControlLabel
      control={
        <Checkbox
          {...checkboxProps}
          inputRef={ref}
          checked={!!value}     // convert undefined/null to boolean
          onBlur={onBlur}
          onChange={onChange}
        />
      }
      label={error ? error.message : label}
    />
  );
}
