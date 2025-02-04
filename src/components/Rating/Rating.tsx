import { FormControl, FormHelperText, FormLabel, Rating } from "@mui/material";
import { FieldValues, useController, UseControllerProps } from "react-hook-form"

type ControlledRatingProps<T extends FieldValues> = {
    label?: string
} & UseControllerProps<T>;
 
export const ControlledRating = <T extends FieldValues>({
    name,
    control,
    defaultValue,
    rules,
    label
} : ControlledRatingProps<T>) => {
    const {
        field,
        fieldState: { error }
    } = useController({
        name,
        control,
        defaultValue,
        rules
    })

    return (
        <FormControl component={"fieldset"} error={!!error}>
            {label && <FormLabel component={"legend"}>{label}</FormLabel>}
            <Rating
                {...field}
                value={Number(field.value)}
                onChange={(_, value) =>{
                    field.onChange(value)
                }}
            />
            {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
    )
}