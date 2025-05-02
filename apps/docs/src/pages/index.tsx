import CommonLayout from '../components/@Layout/CommonLayout'
import HomeFooter from '../components/HomeFooter/HomeFooter'
import { Section1 } from '../components/Section1'
import { Section2 } from '../components/Section2'
import { Section3 } from '../components/Section3'
import { Section4 } from '../components/Section4'
import { Section5 } from '../components/Section5'
import { Section9 } from '../components/Section9'
import { Section10 } from '../components/Section10'

export default function Home() {
  return (
    <CommonLayout header={null} footer={<HomeFooter />}>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section9 />
      <Section10 />
    </CommonLayout>
  )
}
