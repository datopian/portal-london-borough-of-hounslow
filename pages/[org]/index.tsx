import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import OrgNavCrumbs from "@/components/organization/individualPage/OrgNavCrumbs";
import OrgInfo from "@/components/organization/individualPage/OrgInfo";
import ActivityStream from "@/components/_shared/ActivityStream";
import Layout from "@/components/_shared/Layout";
import Tabs from "@/components/_shared/Tabs";
import TopBar from "@/components/_shared/TopBar";
import styles from "styles/DatasetInfo.module.scss";
import DatasetList from "@/components/_shared/DatasetList";
import { CKAN, Organization } from "@portaljs/ckan";
import { getAllOrganizations, getOrganization } from "@/lib/queries/orgs";
import { getDataset } from "@/lib/queries/dataset";
import { capitalize } from "@/lib/utils";

export async function getStaticPaths() {
  const paths = (await getAllOrganizations({ detailed: false })).map(
    (org: Organization) => ({
      params: { org: `@${org.name}` },
    })
  );
  return {
    paths,
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const DMS = process.env.NEXT_PUBLIC_DMS;
  const ckan = new CKAN(DMS);
  let orgName = context.params.org as string;
  if (!orgName.startsWith("@")) {
    return {
      redirect: {
        destination: `/@${orgName}`,
        permanent: true,
      },
    };
  }
  orgName = orgName.split("@").at(1);
  let org = null;
  try {
    org = await getOrganization({
      name: orgName as string,
      include_datasets: true,
    });
  } catch (e) {
    return {
      notFound: true,
    };
  }

  if (org.packages) {
    const packagesWithResources = await Promise.all(
      org.packages.map(
        async (dataset) => await getDataset({ name: dataset.name })
      )
    );
    org = { ...org, packages: packagesWithResources };
  }
  const activityStream = await ckan.getOrgActivityStream(org._name);
  org = { ...org, activity_stream: activityStream };
  return {
    props: {
      org,
    },
    revalidate: 1800,
  };
};

export default function OrgPage({
  org,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const tabs = [
    {
      id: "datasets",
      content: org.packages ? (
        <DatasetList datasets={org.packages ? org.packages : []} />
      ) : (
        ""
      ),
      title: "Datasets",
    },
    {
      id: "activity-stream",
      content: (
        <ActivityStream
          activities={org?.activity_stream ? org.activity_stream : []}
        />
      ),
      title: "Activity Stream",
    },
  ];
  return (
    <>
      <Head>
        <title>{capitalize(org.title) || capitalize(org.name) + " - Organization Page"}</title>
        <meta name = "description"
        content={
            org.description
              ? org.description
              : 'London Borough of Hounslow organisation from the Open Data Portal'
          }/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {org && (
        <Layout>
          <div className="grid grid-rows-datasetpage-hero min-h-[87.2vh]">
            <section className="row-start-1 row-end-3 col-span-full">
              <div
                className="bg-cover h-full bg-center bg-no-repeat bg-accent flex flex-col"

              >
                <TopBar />
                <OrgNavCrumbs
                org={{
                    name: org?.name,
                    title: org?.title,
                  }}
                />
                <div
                  className="grid mx-auto items-center grow custom-container grow max-w-6xl pb-24 pt-7"
                >
                  <div className="col-span-1">
                    <h1 className="text-4xl font-[600] text-white">
                      {org.title}
                    </h1>
                  </div>
                </div>
              </div>
            </section>
            <section className="grid row-start-2 row-span-2 col-span-full">
              <div className="custom-container max-w-6xl">
                {org && (
                  <main className={styles.main}>
                    <OrgInfo org={org} />
                    <div>
                      <Tabs items={tabs} />
                    </div>
                  </main>
                )}
              </div>
            </section>
          </div>
        </Layout>
      )}
    </>
  );
}
