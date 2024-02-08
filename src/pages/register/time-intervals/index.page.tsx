import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { Container, Header } from '../styles'
import {
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
} from './styles'
import { ArrowRight } from '@phosphor-icons/react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { getWeekDays } from '@/utils/get-week-day'

const timeIntervalTimeSchema = z.object({})

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      intervals: [
        { weekday: 0, enabled: false, starTime: '08:00', endTime: '18:00' },
        { weekday: 1, enabled: true, starTime: '08:00', endTime: '18:00' },
        { weekday: 2, enabled: true, starTime: '08:00', endTime: '18:00' },
        { weekday: 3, enabled: true, starTime: '08:00', endTime: '18:00' },
        { weekday: 4, enabled: true, starTime: '08:00', endTime: '18:00' },
        { weekday: 5, enabled: true, starTime: '08:00', endTime: '18:00' },
        { weekday: 6, enabled: false, starTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const weekDays = getWeekDays()

  // permite interar ou manipular campos de um array
  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  async function handleSetTimeIntervals() {
    return console.log()
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>
        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>
        <MultiStep size={4} currentStep={3} />
      </Header>
      <IntervalBox as="form" onSubmit={handleSetTimeIntervals}>
        <IntervalContainer>
          {fields.map((fields, index) => {
            return (
              <IntervalItem key={fields.id}>
                <IntervalDay>
                  <Checkbox />
                  <Text>{weekDays[fields.weekday]}</Text>
                </IntervalDay>
                <IntervalInputs>
                  <TextInput
                    size={'sm'}
                    type="time"
                    step={60}
                    crossOrigin="anonymous"
                    {...register(`intervals.${index}.starTime`)}
                  />
                  <TextInput
                    size={'sm'}
                    type="time"
                    step={60}
                    crossOrigin="anonymous"
                    {...register(`intervals.${index}.endTime`)}
                  />
                </IntervalInputs>
              </IntervalItem>
            )
          })}
        </IntervalContainer>
        <Button type="submit">
          Próximo passo <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}
