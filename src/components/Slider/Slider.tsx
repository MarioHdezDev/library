import { FormControl, FormHelperText, FormLabel, Slider, Stack } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";
import { FieldValues, useController, UseControllerProps } from "react-hook-form"

type ControlledSliderProps<T extends FieldValues> = {
    label?: string,
    leftIcon?: SvgIconComponent,
    rightIcon?: SvgIconComponent,
} & UseControllerProps<T>;

export const ControlledSlider = <T extends FieldValues>({
    name,
    label,
    control,
    defaultValue,
    rules,
    leftIcon,
    rightIcon
}: ControlledSliderProps<T>) => {
    const {
        field: {onChange, ...propsField},
        fieldState: {error}
    } = useController({
        control,
        name,
        defaultValue,
        rules
    })

    return (
        <FormControl component="fieldset" error={!!error}>
            {label && <FormLabel component={"legend"}>{label}</FormLabel>}
            <Stack spacing={2} direction={"row"} sx={{alignItems: "center"}}>
                <>{leftIcon}</>
                <Slider
                    onChange={(_, value) => onChange(value)}
                    {...propsField}
                />
                <>{rightIcon}</>
            </Stack>
            {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
    )
}