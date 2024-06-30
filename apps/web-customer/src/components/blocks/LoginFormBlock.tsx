import { LoginParams } from '@repo/core-library/types/types'
import { LoginForm } from './LoginForm'

interface Props {
  onSubmit: (value: LoginParams) => void,
  isLoading: boolean
}

export function LoginFormBlock({ onSubmit, isLoading }: Props) {
  return (
    <LoginForm onSubmit={onSubmit} submitLoading={isLoading} />
  )
}

