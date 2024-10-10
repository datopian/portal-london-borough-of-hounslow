import Layout from '@/components/_shared/Layout'
import TopBar from '@/components/_shared/TopBar'
import Head from 'next/head'

export default function About() {
  return (
    <>
      <Head>
        <title>
          About
        </title>
        <meta name="description" content="Learn more about the London Borough of Hounslow Open Data Portal and its commitment to transparency and data accessibility" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <section className="sm:grid sm:grid-rows-frontpage-hero min-h-[87.2vh]">
          <section className="row-start-1 row-span-3 col-span-full">
            <div className="bg-accent flex flex-col min-h-[112px]">
              <TopBar />
              <div className="grid lg:grid-cols-2 max-w-6xl items-center grow custom-container min-h-[114px] ">
                <div className="col-span-1 drop-shadow py-12  ">
                  <h1 className="text-[40px] font-[600] text-white  text-secondary">
                    About the Open Data Portal
                  </h1>
                </div>
              </div>
            </div>
            <div className="custom-container max-w-6xl mx-auto space-y-4 text-lg text-secondary lg: pt-24 py-24">
              {' '}
              <p>
                On this website we are making a host of information available
                about Hounslow and its communities by enabling you to access
                various sources of open data.
              </p>{' '}
              <p>
                {' '}
                This is a service provided by the <a href="https://hounslow.gov.uk" className='underline '>London Borough of Hounslow.</a> We
                want to be more open and transparent to you, our residents.
              </p>
              <p>
                Therefore, we are making information available online so you can
                access data about the borough. We are publishing data sets in
                response to public demand through, for example, Freedom of
                Information requests and to comply with the Local Government
                Transparency Code. We endeavour to provide up-to-date, high
                quality data that reaches national standards, allowing you to
                compare us with other councils. We will also publish information
                on this open data portal on behalf of other organisations.
              </p>
              <p>
                {' '}
                More information about <a href="https://hounslow.gov.uk" className='underline '>open data and the London Borough of
                Hounslow</a> can be found on our website.
              </p>
              <p>
                {' '}
                If you have any questions or comments about our open data, or
                are looking for a data set that you cannot find, please email
                the <a href="mailto:opendata@hounslow.gov.uk" className='underline '>Open Data team.</a>
              </p>
            </div>
          </section>
        </section>
      </Layout>
    </>
  )
}
