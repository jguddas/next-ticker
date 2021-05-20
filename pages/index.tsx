import { x } from '@xstyled/styled-components'
import PageWrapper from '../components/PageWrapper'
import Input from '../components/Input'
import Box from '../components/Box'
import Donut from '../components/Donut'

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
        <Donut max={100} value={60} />
      </Box>
      <Box title="History" />
    </x.div>
  </PageWrapper>
)

export default Home
