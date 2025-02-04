import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { FieldValues, useController, UseControllerProps } from "react-hook-form"


type ControlledSelectProps<T extends FieldValues> = {
    label?: String,
    options: {value: string | Number; label: string}[]
} & UseControllerProps<T>;

export const ControlledSelect = <T extends FieldValues>({
    name,
    control,
    defaultValue,
    rules,
    label,
    options
}: ControlledSelectProps<T>) => {
    const {
        field,
        fieldState: {error}
    } = useController({
        name,
        rules,
        defaultValue,
        control
    })

    return (
        <FormControl component={"fieldset"} error={!!error}>
            {label && <InputLabel id={name} component={"legend"}>{label}</InputLabel>}
            <Select
                labelId={name}
                label={label}
                {...field}
            >
                {options.map(op => (
                    <MenuItem {...({} as any)} key={`${name}--${op.label}--${op.value}`} value={op.value}>{op.label}</MenuItem>
                ))}
            </Select>
            {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
    )
}