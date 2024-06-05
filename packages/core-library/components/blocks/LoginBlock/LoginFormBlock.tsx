import { LoginForm } from './LoginForm'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { LoginValidationType, loginSchema } from './validation'

export const LoginFormBlock = () => {
    const form = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(loginSchema),
        defaultValues: loginSchema.getDefault(),
    })
    const { control, handleSubmit } = form

    const onSubmit = (values: LoginValidationType) => {
        console.log("values : ", values)
    }

    return (
        <FormProvider {...form}>
            <LoginForm handleSubmit={handleSubmit(onSubmit)} control={control} />
        </FormProvider>
    )
}
