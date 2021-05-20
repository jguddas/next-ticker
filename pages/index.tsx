import { x } from '@xstyled/styled-components'
import PageWrapper from '../components/PageWrapper'
import Input from '../components/Input'

export const Home = (): JSX.Element => (
  <PageWrapper title="Next Ticker" subHeader="some text about this app">
    <x.div mb="56px">
      <Input title="Symbol" mb={5} />
      <x.div display="flex" flexDirection={{ _: 'column', md: 'row' }} gap={5}>
        <Input title="From Date" />
        <Input title="To Date" />
      </x.div>
    </x.div>
  </PageWrapper>
)

export default Home
