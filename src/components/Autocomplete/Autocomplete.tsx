import { useController, UseControllerProps, FieldValues } from 'react-hook-form';
import { Autocomplete, TextField, FormControl } from '@mui/material';

type ControlledAutocompleteProps<T extends FieldValues> = {
  label?: string; // Label for the Autocomplete
  options: { value: string; label: string }[]; // Options for the Autocomplete
} & UseControllerProps<T>;

export const ControlledAutocomplete = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  label,
  options,
}: ControlledAutocompleteProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
    rules,
  });

  return (
    <FormControl error={!!error}>
      <Autocomplete
        {...field}
        options={options}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        onChange={(_, newValue) => field.onChange(newValue)} // Update the form value
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
    </FormControl>
  );
};
