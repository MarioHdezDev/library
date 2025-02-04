import {
  FieldValues,
  useController,
  UseControllerProps
} from 'react-hook-form';
import {
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  FormHelperText
} from '@mui/material';

export type ControlledRadioGroupProps<T extends FieldValues> = UseControllerProps<T> & {
  options: { value: string; label: string}[],
  label?: string
}

/**
 * A reusable MUI RadioGroup integrated with React Hook Form using `useController`.
 */
export function ControlledRadioGroup<T extends FieldValues>({
  name,
  control,
  label,
  rules,
  defaultValue,
  options
}: ControlledRadioGroupProps<T>) {
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control,
    rules,
    defaultValue
  });

  return (
    <FormControl component={"fieldset"} error={!!error}>
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <RadioGroup {...field}>
      {options.map(op => (
        <FormControlLabel
          {...({} as any)} // Bypass type assertion
          key={`${label?.replace(" ", "-")}--${op.label}--${op.label}`}
          value={op.value}
          control={<Radio/>}
          label={op.label}
        />
      ))}
      </RadioGroup>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
}
