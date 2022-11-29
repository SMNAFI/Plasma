import React from 'react'
import { Accordion, Container } from 'react-bootstrap'
import faqData from '../assets/data/faqData'
import SubHero from '../components/SubHero/SubHero'

const FaqScreen = () => {
  return (
    <>
      <SubHero
        title={'Frequently Asked Questions'}
        text={'Some faq to help you clear your confusion'}
      />

      <Container>
        <div className='my-5 mx-auto' style={{ maxWidth: '700px' }}>
          <Accordion alwaysOpen flush>
            {faqData.map((data, index) => (
              <Accordion.Item eventKey={index} key={data.id}>
                <Accordion.Header>
                  <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                    {data.question}
                  </p>
                </Accordion.Header>
                <Accordion.Body>{data.ans}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </Container>
    </>
  )
}

export default FaqScreen
