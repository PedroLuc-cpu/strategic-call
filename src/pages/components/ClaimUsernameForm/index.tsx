import { Button, TextInput } from '@ignite-ui/react'
import { Form } from './styles'
import { ArrowRight } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ClaimUsernameSchema = z.object({
  username: z.string(),
})

type ClaimUsernameFormData = z.infer<typeof ClaimUsernameSchema>

export const ClaimUsernameForm = () => {
  const { register, handleSubmit } = useForm<ClaimUsernameFormData>()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data)
  }

  return (
    <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        size={'sm'}
        prefix="strategic.com/"
        placeholder="your username"
        crossOrigin="anonymous"
        autoComplete="off"
        {...register('username')}
      />
      <Button size={'sm'} type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </Form>
  )
}
