import React from 'react'

import Slider from './Slider'

const slides = [
  {
    id: 1,
    title: '',
  },
  {
    id: 2,
    title: '',
  },
  {
    id: 3,
    title: '',
  },
  {
    id: 4,
    title: '',
  },
  {
    id: 5,
    title: '',
  },
]

const gridSlide = [
  {
    id: 1,
    label: 'Latest facebook post',
    tag: '',
    title: '',
    image: '',
    option: true,
  },
  {
    id: 2,
    label: '',
    tag: 'Latest blog post',
    title: '',
    image:
      'https://cdn.sanity.io/images/1mk9ifx4/production/815c097eef58aa35770fd3cacc9b402d27af6cf0-1920x1244.jpg',
  },
  {
    id: 3,
    label: '',
    tag: 'listening to',
    title: 'Vamos a la playa – Righeira',
    image: '',
  },
  {
    id: 4,
    label: '',
    tag: '',
    title: '',
    image:
      'https://cdn.sanity.io/images/1mk9ifx4/production/6ff60c92617a293133af4bca7c8cbd629b506ea4-713x462.jpg',
  },
]

export const Primary: React.VFC = () => {
  return (
    <>
      <Slider slides={slides} />
    </>
  )
}

export const Secondary: React.VFC = () => {
  return (
    <>
      <Slider slides={gridSlide} grid />
    </>
  )
}

export default {
  title: 'Slider',
  component: Slider,
}
