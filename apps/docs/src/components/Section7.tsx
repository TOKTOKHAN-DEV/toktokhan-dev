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
  Client12Icon,
  Client13Icon,
  Client14Icon,
  Client15Icon,
  Client16Icon,
} from '../generated/icons'

export const Section7 = () => {
  return (
    <div className="flex flex-col w-full mt-[240px] base:max-w-[404px] md:max-w-[100vw] mx-auto">
      <div className="mt-[64px] flex ">
        <div className="md:hidden w-full max-w-[100vw] relative">
          <div className="absolute left-0 top-0 w-[60px] h-full bg-transparent bg-gradient-to-r from-background-basic-1 to-transparent z-10" />
          <div className="absolute right-0 top-0 w-[60px] h-full bg-transparent bg-gradient-to-l from-background-basic-1 to-transparent z-10" />
          <Marquee speed={70} loop={0} autoFill>
            <Client1Icon className="ml-[80px]" />
            <Client2Icon className="ml-[80px]" />
            <Client3Icon className="ml-[80px]" />
            <Client4Icon className="ml-[80px]" />
            <Client5Icon className="ml-[80px]" />
            <Client6Icon className="ml-[80px]" />
            <Client7Icon className="ml-[80px]" />
            <Client8Icon className="ml-[80px]" />
          </Marquee>
          <Marquee speed={70} loop={0} autoFill direction="right">
            <Client9Icon className="ml-[80px]" />
            <Client10Icon className="ml-[80px]" />
            <Client11Icon className="ml-[80px]" />
            <Client12Icon className="ml-[80px]" />
            <Client13Icon className="ml-[80px]" />
            <Client14Icon className="ml-[80px]" />
            <Client15Icon className="ml-[80px]" />
            <Client16Icon className="ml-[80px]" />
          </Marquee>
        </div>
        <div className="base:hidden md:block full max-w-[100vw]">
          <Marquee speed={100} autoFill pauseOnHover loop={0}>
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
            <Client12Icon className="ml-[80px]" />
            <Client13Icon className="ml-[80px]" />
            <Client14Icon className="ml-[80px]" />
            <Client15Icon className="ml-[80px]" />
            <Client16Icon className="ml-[80px]" />
          </Marquee>
        </div>
      </div>
    </div>
  )
}
