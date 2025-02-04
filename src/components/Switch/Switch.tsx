import { FormControl, FormControlLabel, FormHelperText, Switch } from "@mui/material";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";

type ControlledSwitchProps<T extends FieldValues> = {
    label?: string
} & UseControllerProps<T>;

export const ControlledSwitch = <T extends FieldValues>({
    name,
    control,
    defaultValue,
    rules,
    label,
  }: ControlledSwitchProps<T>) => {
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
        <FormControlLabel
          control={
            <Switch
              {...field}
              checked={field.value} // Ensure the value is a boolean
              onChange={(e) => field.onChange(e.target.checked)} // Update the form value
            />
          }
          label={label}
        />
        {error && <FormHelperText>{error.message}</FormHelperText>}
      </FormControl>
    );
  };