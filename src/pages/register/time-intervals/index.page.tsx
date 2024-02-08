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
  FormError,
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
} from './styles'
import { ArrowRight } from '@phosphor-icons/react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { getWeekDays } from '@/utils/get-week-day'
import { zodResolver } from '@hookform/resolvers/zod'
import { convertTimeStringToMinutes } from '@/utils/convert-time-string-to-minutes'
import { api } from '@/lib/axios'

const timeIntervalTimeFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekday: z.number().min(0).max(6),
        enabled: z.boolean(),
        starTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) =>
      intervals.filter((interval) => interval.enabled === true),
    )
    .refine((interval) => interval.length > 0, {
      message: 'Você precisa selecionar pelo menos um dia da semana',
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekay: interval.weekday,
          startTimeInMinutes: convertTimeStringToMinutes(interval.starTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        }
      })
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes,
        )
      },
      {
        message:
          'O horário de término deve ser pelo menos 1h distante do início ',
      },
    ),
})

type TimeIntervalsFormInput = z.input<typeof timeIntervalTimeFormSchema>

type TimeIntervalsFormOutput = z.output<typeof timeIntervalTimeFormSchema>

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<TimeIntervalsFormInput, unknown, TimeIntervalsFormOutput>({
    resolver: zodResolver(timeIntervalTimeFormSchema),
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
  const intervals = watch('intervals')

  async function handleSetTimeIntervals(data: TimeIntervalsFormOutput) {
    await api.post('/users/time-intervals', { data })
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
      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalContainer>
          {fields.map((fields, index) => {
            return (
              <IntervalItem key={fields.id}>
                <IntervalDay>
                  <Controller
                    name={`intervals.${index}.enabled`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Checkbox
                          onCheckedChange={(checked) => {
                            field.onChange(checked === true)
                          }}
                          checked={field.value}
                        />
                      )
                    }}
                  />
                  <Text>{weekDays[fields.weekday]}</Text>
                </IntervalDay>
                <IntervalInputs>
                  <TextInput
                    size={'sm'}
                    type="time"
                    step={60}
                    crossOrigin="anonymous"
                    disabled={intervals[index].enabled === false}
                    {...register(`intervals.${index}.starTime`)}
                  />
                  <TextInput
                    size={'sm'}
                    type="time"
                    step={60}
                    crossOrigin="anonymous"
                    disabled={intervals[index].enabled === false}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </IntervalInputs>
              </IntervalItem>
            )
          })}
        </IntervalContainer>
        {errors.intervals && (
          <FormError size={'sm'}>{errors.intervals.root?.message}</FormError>
        )}
        <Button type="submit" disabled={isSubmitting}>
          Próximo passo <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}
