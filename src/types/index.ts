import { FieldValues, FieldError } from "react-hook-form";

export type FormError<T extends FieldValues> = Partial<Record<keyof T, FieldError>>;