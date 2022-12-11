import React from 'react'
import { Container } from 'react-bootstrap'
import './HowItWorks.css'

import Timeline from '@mui/lab/Timeline'
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem'
import useMediaQuery from '@mui/material/useMediaQuery'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import steps from './../assets/data/stepsData'

const HowItWorks = () => {
  const isMobile = useMediaQuery('(max-width:768px)')

  // const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  // useEffect(() => {
  //   window.addEventListener('resize', () => {
  //     setIsMobile(window.innerWidth < 768)
  //   })
  // }, [])

  return (
    <section className='works-container'>
      <Container className='my-5'>
        <div className='text-center my-5'>
          <h1 className='works-title'>How it Works</h1>
          <p className='works-sub-title'>
            Our platform is made to be as simple as possible.
          </p>
        </div>

        <div style={{ maxWidth: '800px' }} className='mx-auto'>
          <Timeline
            position={`${isMobile ? 'right' : 'alternate'}`}
            sx={
              isMobile
                ? {
                    [`& .${timelineItemClasses.root}:before`]: {
                      flex: 0,
                      padding: 0,
                    },
                  }
                : {}
            }
          >
            {steps.map((step) => (
              <TimelineItem key={step.id}>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot
                    sx={{ bgcolor: '#ff3f62', p: '10px' }}
                    // variant='outlined'
                  >
                    <span
                      style={{ height: '12px', width: '12px' }}
                      className='center'
                    >
                      <i className={step.icon}></i>
                    </span>
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <p className='step-title'>{step.title}</p>
                  <p className='step-subtitle'>{step.text}</p>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </Container>
    </section>
  )
}

export default HowItWorks
