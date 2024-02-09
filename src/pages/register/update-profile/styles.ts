import { Box, Text, styled } from '@ignite-ui/react'

export const ProfileBox = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '$6',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const FormAnnotation = styled(Text, {
  color: '$gray200',
})
