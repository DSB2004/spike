import { zodResolver } from "@hookform/resolvers/zod";
import LogInSchema, { LogInFormData } from './validation';
import { useForm } from "react-hook-form";
import LogInAction from './action';
export default function useHook() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isLoading, isSubmitting },
    } = useForm<LogInFormData>({
        resolver: zodResolver(LogInSchema),
    });

    const onSubmit = async (data: LogInFormData) => {
        try {
            const err = await LogInAction(data)
            if (err) {
                console.log(err)
                Object.keys(err).forEach(key => {
                    // @ts-ignore
                    setError(key as keyof LogInFormData, err[key]);
                })
            }
        } catch (err) {
            // 
        }
    };

    return {
        onSubmit,
        register,
        handleSubmit,
        setError,
        errors,
        isLoading,
        isSubmitting
    }
}
