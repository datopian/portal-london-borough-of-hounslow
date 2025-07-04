import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import DatasetInfo from '@/components/dataset/individualPage/DatasetInfo'
import DatasetOverview from '@/components/dataset/individualPage/DatasetOverview'
import DatasetNavCrumbs from '@/components/dataset/individualPage/NavCrumbs'
import ResourcesList from '@/components/dataset/individualPage/ResourcesList'
import ActivityStream from '@/components/_shared/ActivityStream'
import Layout from '@/components/_shared/Layout'
import Tabs from '@/components/_shared/Tabs'
import TopBar from '@/components/_shared/TopBar'
import { Dataset as DatasetType } from '@portaljs/ckan'
import { CKAN } from '@portaljs/ckan'
import styles from 'styles/DatasetInfo.module.scss'
import {
  getAvailableOrgs,
  privateToPublicDatasetName,
  privateToPublicOrgName,
  publicToPrivateDatasetName,
} from '@/lib/queries/utils'
import { getDataset } from '@/lib/queries/dataset'

export async function getStaticPaths() {
  const ckan = new CKAN(process.env.NEXT_PUBLIC_DMS)
  const mainOrg = process.env.NEXT_PUBLIC_ORG
  const availableOrgs = await getAvailableOrgs(mainOrg)
  const paths = (
    await ckan.getDatasetsListWithDetails({ offset: 0, limit: 1000 })
  )
    //Only create routes for datasets whose owner_orgs is in the availableOrgs list
    .filter((dataset) => availableOrgs.includes(dataset.organization?.name))
    .map((dataset: DatasetType) => ({
      params: {
        dataset: privateToPublicDatasetName(dataset.name, mainOrg),
        org: `@${privateToPublicOrgName(dataset.organization?.name, mainOrg)}`,
      },
    }))
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const ckan = new CKAN(process.env.NEXT_PUBLIC_DMS)
    const mainOrg = process.env.NEXT_PUBLIC_ORG
    let orgName = context.params.org as string;
    const datasetName = context.params?.dataset as string

    if (!orgName.startsWith("@")) {
      return {
        redirect: {
          destination: `/@${orgName}/${datasetName}`,
          permanent: true,
        },
      };
    }
    orgName = orgName.split("@").at(1)

    const privateDatasetName = publicToPrivateDatasetName(datasetName, mainOrg)
    if (!datasetName) {
      return {
        notFound: true,
      }
    }
    let dataset = await getDataset({ name: datasetName as string })
    if (!dataset || dataset.organization.name != orgName) {
      return {
        notFound: true,
      }
    }
    const activityStream = await ckan.getDatasetActivityStream(
      privateDatasetName
    )
    dataset = {
      ...dataset,
      activity_stream: activityStream,
    }
    return {
      props: {
        dataset,
      },
      revalidate: 1800,
    }
  } catch {
    return {
      notFound: true,
    }
  }
}

export default function DatasetPage({
  dataset,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const tabs = [
    {
      id: 'resources',
      content: (
        <ResourcesList
          resources={dataset?.resources}
          orgName={dataset.organization ? dataset.organization.name : ''}
          datasetName={dataset.name}
        />
      ),
      title: 'Resources',
    },
    {
      id: 'information',
      content: <DatasetOverview dataset={dataset} />,
      title: 'Info',
    },
    {
      id: 'activity-stream',
      content: (
        <ActivityStream
          activities={dataset?.activity_stream ? dataset.activity_stream : []}
        />
      ),
      title: 'Activity Stream',
    },
  ]

  return (
    <>
      <Head>
        <title>{`${dataset.title || dataset.name} - Dataset`}</title>
        <meta
          name="description"
          content={dataset.notes?.replace(/<\/?[^>]+(>|$)/g, '') || 'London Borough of Hounslow Dataset'}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="grid grid-rows-datasetpage-hero min-h-[87.2vh]">
          <section className="row-start-1 row-end-3 col-span-full">
            <div className="bg-cover h-full bg-accent flex flex-col">
              <TopBar />
              <DatasetNavCrumbs
                org={{
                  name: dataset.organization?.name,
                  title: dataset.organization?.title,
                }}
                dataset={{
                  name: dataset.name,
                  title: dataset.title ? dataset.title : 'This dataset',
                }}
              />
              <div className="grid mx-auto items-center grow custom-container grow max-w-6xl pb-24 pt-7">
                <div className="col-span-1">
                  <h1 className="text-4xl font-[600] text-white">
                    {dataset.title}
                  </h1>
                </div>
              </div>
            </div>
          </section>
          <section className="grid row-start-2 row-span-2 col-span-full ">
            <div className="custom-container max-w-6xl drop-shadow">
              {dataset && (
                <main className={styles.main}>
                  <DatasetInfo dataset={dataset} />
                  <div>
                    <Tabs items={tabs} />
                  </div>
                </main>
              )}
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}
