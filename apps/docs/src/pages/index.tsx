import CommonLayout from '../components/@Layout/CommonLayout'
import HomeFooter from '../components/HomeFooter/HomeFooter'
import { Section1 } from '../components/Section1'
import { Section2 } from '../components/Section2'

export default function Home() {
  return (
    <CommonLayout header={null} footer={<HomeFooter />}>
      <Section1 />
      <Section2 />
    </CommonLayout>
  )
}
