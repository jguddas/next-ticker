import { x } from '@xstyled/styled-components'
import PageWrapper from '../components/PageWrapper'
import Input from '../components/Input'
import Box from '../components/Box'
import Donut from '../components/Donut'
import InfoElement from '../components/InfoElement'

export const Home = (): JSX.Element => (
  <PageWrapper title="Next Ticker" subHeader="some text about this app">
    <x.div display="flex" flexDirection="column" gap="56px">
      <x.div>
        <Input title="Symbol" mb={5} />
        <x.div
          display="flex"
          flexDirection={{ _: 'column', md: 'row' }}
          gap={5}
        >
          <Input title="From Date" />
          <Input title="To Date" />
        </x.div>
      </x.div>
      <Box title="Information">
        <x.div
          display="flex"
          flexDirection={{ _: 'column', sm: 'row' }}
          gap={{ _: '36px', sm: '40px' }}
        >
          <Donut max={100} value={60} alignSelf={{ _: 'center', sm: 'right' }}>
            <InfoElement alignItems="center" title="Growth">
              +60%
            </InfoElement>
          </Donut>
          <x.div display="flex" flexDirection="column" gap="32px">
            <InfoElement title="Total investments">800000$</InfoElement>
            <InfoElement title="Simple return">5000$</InfoElement>
          </x.div>
          <x.div display="flex" flexDirection="column" gap="32px">
            <InfoElement title="Maximum drawdown">-80%</InfoElement>
          </x.div>
        </x.div>
      </Box>
      <Box title="History" />
    </x.div>
  </PageWrapper>
)

export default Home
