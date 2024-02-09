import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'
import { Container, Header } from '../styles'
import { ArrowRight } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormAnnotation, ProfileBox } from './styles'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import { useSession } from 'next-auth/react'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'

const UpdateProfileSchema = z.object({
  bio: z.string(),
})

type UpdateProfileData = z.infer<typeof UpdateProfileSchema>

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(UpdateProfileSchema),
  })

  const router = useRouter()

  async function handleUpdateProfile(data: UpdateProfileData) {
    try {
      await api.put('/users/profile', {
        bio: data.bio,
      })
      await router.push(`/schedules/${session.data?.user.username}`)
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.data?.message) {
        alert(error.response.data.message)
      }
    }
  }

  const session = useSession()

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={4} />
      </Header>
      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text>Foto de perfil</Text>
          <Avatar
            src={session.data?.user.avatar_url}
            alt={session.data?.user.name}
          />
        </label>
        <label>
          <Text size={'sm'}>Sobre você</Text>
          <TextArea {...register('bio')} />
          <FormAnnotation size={'sm'}></FormAnnotation>
        </label>
        <Button type="submit" disabled={isSubmitting}>
          Finalizar <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )
  return {
    props: {
      session,
    },
  }
}
