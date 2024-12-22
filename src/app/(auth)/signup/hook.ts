import { zodResolver } from "@hookform/resolvers/zod";
import SignUpSchema, { SignUpFormData } from "./validation";
import { useForm } from "react-hook-form";
import SignUpAction from "./action";
export default function useHook() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isLoading, isSubmitting },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(SignUpSchema),
    });

    const onSubmit = async (data: SignUpFormData) => {
        try {
            const err = await SignUpAction(data)
            if (err) {
                Object.keys(err).forEach(key => {
                    // @ts-ignore
                    setError(key as keyof SignInFormData, err[key]);
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
