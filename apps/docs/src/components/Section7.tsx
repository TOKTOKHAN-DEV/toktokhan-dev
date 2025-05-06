import Marquee from 'react-fast-marquee'

import {
  Client1Icon,
  Client2Icon,
  Client3Icon,
  Client4Icon,
  Client5Icon,
  Client6Icon,
  Client7Icon,
  Client8Icon,
  Client9Icon,
  Client10Icon,
  Client11Icon,
} from '../generated/icons'

export const Section7 = () => {
  return (
    <div className="flex flex-col w-full mt-[240px]">
      <div className="mt-[64px] flex max-w-[100vw]">
        <div className="md:hidden w-full max-w-[100vw]">
          <Marquee speed={100} loop={0} autoFill>
            <Client1Icon className="ml-[80px]" />
            <Client2Icon className="ml-[80px]" />
            <Client3Icon className="ml-[80px]" />
            <Client4Icon className="ml-[80px]" />
            <Client5Icon className="ml-[80px]" />
            <Client6Icon className="ml-[80px]" />
          </Marquee>
          <Marquee speed={100} loop={0} autoFill direction="right">
            <Client7Icon className="ml-[80px]" />
            <Client8Icon className="ml-[80px]" />
            <Client9Icon className="ml-[80px]" />
            <Client10Icon className="ml-[80px]" />
            <Client11Icon className="ml-[80px]" />
          </Marquee>
        </div>
        <div className="base:hidden md:block full max-w-[100vw]">
          <Marquee speed={150} autoFill pauseOnHover loop={0}>
            <Client1Icon className="ml-[80px]" />
            <Client2Icon className="ml-[80px]" />
            <Client3Icon className="ml-[80px]" />
            <Client4Icon className="ml-[80px]" />
            <Client5Icon className="ml-[80px]" />
            <Client6Icon className="ml-[80px]" />
            <Client7Icon className="ml-[80px]" />
            <Client8Icon className="ml-[80px]" />
            <Client9Icon className="ml-[80px]" />
            <Client10Icon className="ml-[80px]" />
            <Client11Icon className="ml-[80px]" />
          </Marquee>
        </div>
      </div>
    </div>
  )
}
