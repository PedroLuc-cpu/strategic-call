import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from '@phosphor-icons/react'
import * as ConfirmForm from './styles'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um e-email válido' }),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  function handleConfirmScheduling() {
    console.log('Scheduling')
  }

  return (
    <ConfirmForm.Root
      as="form"
      onSubmit={handleSubmit(handleConfirmScheduling)}
    >
      <ConfirmForm.Header>
        <Text>
          <CalendarBlank />
          22 de setembro de 2023
        </Text>
        <Text>
          <Clock />
          18:00
        </Text>
      </ConfirmForm.Header>
      <label>
        <Text size={'sm'}>Nome completo</Text>
        <TextInput
          placeholder="seu nome"
          crossOrigin="anonymous"
          autoComplete="off"
          {...register('name')}
        />
        {errors.name && (
          <ConfirmForm.Error size={'sm'}>
            {errors.name.message}
          </ConfirmForm.Error>
        )}
      </label>
      <label>
        <Text size={'sm'}>Endereço de email</Text>
        <TextInput
          type="email"
          placeholder="pedrolucas@strategic.com"
          autoComplete="off"
          crossOrigin="anonymous"
          {...register('email')}
        />
        {errors.email && (
          <ConfirmForm.Error size={'sm'}>
            {errors.email.message}
          </ConfirmForm.Error>
        )}
      </label>
      <label>
        <Text size={'sm'}>Nome completo</Text>
        <TextArea {...register('observations')} />
      </label>
      <ConfirmForm.Actions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </ConfirmForm.Actions>
    </ConfirmForm.Root>
  )
}
