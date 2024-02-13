import { Calendar } from '@/components/Canlendar'
import { Container } from './styles'
import * as TimePicker from './styles'
import { useState } from 'react'

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const isDateSelected = !!selectedDate
  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
      {isDateSelected && (
        <TimePicker.TimePickerRoot>
          <TimePicker.TimePickerHeader>
            Terça-feira <span>20 de setembro</span>
          </TimePicker.TimePickerHeader>
          <TimePicker.TimePickerList>
            <TimePicker.TimePickerItem>08:00h</TimePicker.TimePickerItem>
            <TimePicker.TimePickerItem>09:00h</TimePicker.TimePickerItem>
            <TimePicker.TimePickerItem>10:00h</TimePicker.TimePickerItem>
            <TimePicker.TimePickerItem>11:00h</TimePicker.TimePickerItem>
            <TimePicker.TimePickerItem>12:00h</TimePicker.TimePickerItem>
            <TimePicker.TimePickerItem>13:00h</TimePicker.TimePickerItem>
            <TimePicker.TimePickerItem>14:00h</TimePicker.TimePickerItem>
            <TimePicker.TimePickerItem>15:00h</TimePicker.TimePickerItem>
            <TimePicker.TimePickerItem>16:00h</TimePicker.TimePickerItem>
            <TimePicker.TimePickerItem>17:00h</TimePicker.TimePickerItem>
            <TimePicker.TimePickerItem>18:00h</TimePicker.TimePickerItem>
          </TimePicker.TimePickerList>
        </TimePicker.TimePickerRoot>
      )}
    </Container>
  )
}
