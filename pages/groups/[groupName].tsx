import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import DatasetList from "../../components/_shared/DatasetList";
import ActivityStream from "../../components/_shared/ActivityStream";
import Layout from "../../components/_shared/Layout";
import Tabs from "../../components/_shared/Tabs";
import TopBar from "../../components/_shared/TopBar";
import { CKAN, Group } from "@portaljs/ckan";
import styles from "@/styles/DatasetInfo.module.scss";
import GroupNavCrumbs from "../../components/groups/individualPage/GroupNavCrumbs";
import GroupInfo from "../../components/groups/individualPage/GroupInfo";
import { getAllGroups, getGroup } from "@/lib/queries/groups";
import { getDataset } from "@/lib/queries/dataset";
import { capitalize } from "@/lib/utils";

export async function getStaticPaths() {
  const paths = (await getAllGroups({ detailed: false })).map(
    (group: Group) => ({
      params: { groupName: group.name },
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
  const groupName = context.params?.groupName;
  if (!groupName) {
    return {
      notFound: true,
    };
  }
  let group = await getGroup({
    name: groupName as string,
    include_datasets: true,
  });
  if (group.packages) {
    const packagesWithResources = await Promise.all(
      group.packages.map(async (dataset) => getDataset({ name: dataset.name }))
    );
    group = { ...group, packages: packagesWithResources };
  }
  const activityStream = await ckan.getGroupActivityStream(group._name);
  if (!group) {
    return {
      notFound: true,
    };
  }
  group = { ...group, activity_stream: activityStream };
  return {
    props: {
      group,
    },
    revalidate: 1800,
  };
};

export default function OrgPage({
  group,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const tabs = [
    {
      id: "datasets",
      content: group.packages ? (
        <DatasetList datasets={group.packages ? group.packages : []} />
      ) : (
        ""
      ),
      title: "Datasets",
    },
    {
      id: "activity-stream",
      content: (
        <ActivityStream
          activities={group?.activity_stream ? group.activity_stream : []}
        />
      ),
      title: "Activity Stream",
    },
  ];
  
  return (
    <>
      <Head>
        <title>{capitalize(group?.title) ? capitalize(group.title) : "Group Page"}</title>
        <meta name="description" content={group.description? group.description : ""} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {group && (
        <Layout>
          <div className="grid grid-rows-datasetpage-hero min-h-[87.2vh]">
            <section className="row-start-1 row-end-3 col-span-full">
              <div
                className="bg-cover h-full bg-center bg-no-repeat bg-accent flex flex-col"

              >
                <TopBar />
                <GroupNavCrumbs
                  group={{
                    name: group?.name,
                    title: group?.title,
                  }}
                />
                <div
                  className="grid mx-auto items-center grow custom-container grow max-w-6xl pb-24 pt-7"
                >
                  <div className="col-span-1">
                    <h1 className="text-4xl font-[600] text-white">
                      {group.title}
                    </h1>
                  </div>
                </div>
              </div>
            </section>
            <section className="grid row-start-2 row-span-2 col-span-full">
              <div className="custom-container max-w-6xl drop-shadow">
                {group && (
                  <main className={styles.main}>
                    <GroupInfo group={group} />
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
