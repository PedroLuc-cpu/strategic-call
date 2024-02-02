import { Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'
import { Container, Hero, Preview } from './style'

import previewImage from '../../assets/app-preview.png'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size={"4xl"}>Agendamento descomplicado</Heading>
        <Text size={"lg"}>Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.</Text>
      </Hero>
      <Preview>
        <Image
          src={previewImage}
          height={400}
          quality={100}
          priority
          alt='calendário simbolizando aplicação em funcionamento'
        />
      </Preview>
    </Container>
  )
}
