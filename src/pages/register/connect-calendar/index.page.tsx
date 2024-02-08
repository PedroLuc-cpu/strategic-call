import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { Container, Header } from '../styles'
import { ArrowRight, Check } from '@phosphor-icons/react'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function ConnectCalendar() {
  const router = useRouter()
  const session = useSession()

  const hasAuthError = !!router.query.error
  const isSignIn = session.status === 'authenticated'

  const handleConnectCalendar = () => {
    signIn('google', { callbackUrl: '/register/connect-calendar' })
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>
        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Canlendar</Text>
          {isSignIn ? (
            <Button variant={'secondary'} size={'sm'} disabled>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              variant={'secondary'}
              size={'sm'}
              onClick={handleConnectCalendar}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>
        {hasAuthError && (
          <AuthError size={'sm'}>
            Falha ao se conectar ao Google, verfique se você habilitou as
            permissões de acesso ao Google Canlendar.
          </AuthError>
        )}
        <Button
          type="submit"
          disabled={!isSignIn}
          onClick={() => router.push('/register/time-intervals')}
        >
          Próximo passo <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
