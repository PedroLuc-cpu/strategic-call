import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import {
  CalendarContainer,
  CanlendarActions,
  CanlendarBody,
  CanlendarDay,
  CanlendarHeader,
  CanlendarTitle,
} from './styles'
import { getWeekDays } from '@/utils/get-week-day'

export function Calendar() {
  const shortWeekDays = getWeekDays({ short: true })

  return (
    <CalendarContainer>
      <CanlendarHeader>
        <CanlendarTitle>
          Dezembro <span>2022</span>
        </CanlendarTitle>
        <CanlendarActions>
          <button>
            <CaretLeft />
          </button>
          <button>
            <CaretRight />
          </button>
        </CanlendarActions>
      </CanlendarHeader>
      <CanlendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <CanlendarDay disabled>1</CanlendarDay>
            </td>
            <td>
              <CanlendarDay>2</CanlendarDay>
            </td>
            <td>
              <CanlendarDay>3</CanlendarDay>
            </td>
          </tr>
        </tbody>
      </CanlendarBody>
    </CalendarContainer>
  )
}
