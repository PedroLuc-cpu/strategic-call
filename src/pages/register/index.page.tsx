import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { Container, Form, FormErro, Header } from './styles'
import { ArrowRight } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'usuario dever conter 3 caracteres.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuario pode ter apenas caracteres e hifens.',
    })
    .transform((username) => username.toLowerCase()),
  name: z.string().min(3, { message: 'O nome dever conter 3 caracteres.' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  async function handleRegister(data: RegisterFormData) {
    console.log(data)
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={1} />
      </Header>
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size={'sm'}>Nome do usuário</Text>
          <TextInput
            {...register('username')}
            prefix="strategic.com/"
            crossOrigin="anonymous"
            placeholder="seu usuário"
            autoComplete="off"
          />
          {errors.username && (
            <FormErro size={'sm'}>{errors.username.message}</FormErro>
          )}
        </label>
        <label>
          <Text size={'sm'}>Nome completo</Text>
          <TextInput
            {...register('name')}
            crossOrigin="anonymous"
            placeholder="seu nome"
            autoComplete="off"
          />
          {errors.name && (
            <FormErro size={'sm'}>{errors.name.message}</FormErro>
          )}
        </label>
        <Button type="submit" disabled={isSubmitting}>
          Próximo passo <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
