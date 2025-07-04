import TopBar from '../../_shared/TopBar'
import { Organizations, FindData, Groups } from './Options'
import SearchForm from './SearchForm'
import Stats, { StatsProps } from './Stats'

export default function Hero({ stats }: { stats: StatsProps }) {
  return (
    <section className="sm:grid sm:grid-rows-frontpage-hero">
      <section className="row-start-1 row-span-3 col-span-full">
        <div
          className="bg-no-repeat bg-cover bg-left flex flex-col min-h-[212px]"
          style={{
            backgroundImage:
              "url('/images/backgrounds/hounslow-skyline-purple-01.jpg')",
          }}
        >
          <TopBar />
          <div className="grid lg:grid-cols-2 max-w-6xl items-center grow custom-container min-h-[414px] ">
            <div className="col-span-1 drop-shadow py-12  ">
              <h1 className="text-[40px] font-[600] text-white  text-secondary">
                Welcome to Hounslow&#39;s
              </h1>
              <h1 className="text-[40px] text-white font-[600] ">
                Open Data Portal
              </h1>

              <div className="">
                <div className="pt-4 sm:max-w-lg sm:text-center lg:text-left lg:mx-0 ">
                  <SearchForm />
                </div>
               
              </div>
              
            </div>
            <div className="sm:max-w-lg py-4 sm:py-0">
                  <Stats
                    datasetCount={stats.datasetCount}
                    orgCount={stats.orgCount}
                    groupCount={stats.groupCount}
                  />
                </div>
          </div>
        </div>
      </section>
      <div className=" max-w-screen my-24">
        <div className="max-w-6xl mx-auto ">
          <h3 className="text-xl  font-inter mx-4 sm:mx-8 xl:mx-auto leading-8">
            On this website we are making a host of information available about
            the borough of Hounslow and its communities by enabling you to
            access various sources of open data. This is a service provided by
            the London Borough of Hounslow. We want to be more open and
            transparent to you, our residents. Therefore, we are publishing data
            in response to public demand and to comply with statutory
            requirements. We will also publish information on this open data
            portal on behalf of other organisations.
          </h3>
        </div>
      </div>
    </section>
  )
}
