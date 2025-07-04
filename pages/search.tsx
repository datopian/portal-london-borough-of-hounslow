import type { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { SWRConfig, unstable_serialize } from "swr";
import Layout from "@/components/_shared/Layout";
import TopBar from "@/components/_shared/TopBar";
import { PackageSearchOptions } from "@portaljs/ckan";
import DatasetSearchForm from "@/components/dataset/search/DatasetSearchForm";
import DatasetSearchFilters from "@/components/dataset/search/DatasetSearchFilters";
import ListOfDatasets from "@/components/dataset/search/ListOfDatasets";
import { searchDatasets } from "@/lib/queries/dataset";
import { getAllGroups } from "@/lib/queries/groups";
import { getAllOrganizations } from "@/lib/queries/orgs";

const mainOrg = process.env.NEXT_PUBLIC_ORG;

export async function getStaticProps() {
  const search_result = await searchDatasets({
    offset: 0,
    limit: 5,
    tags: [],
    groups: [],
    orgs: [],
  });
  const groups = await getAllGroups({ detailed: true });
  const orgs = await getAllOrganizations({ detailed: true });
  return {
    props: {
      fallback: {
        [unstable_serialize([
          "package_search",
          {
            offset: 0,
            limit: 5,
            tags: [],
            groups: [],
            orgs: [],
          },
        ])]: search_result,
      },
      groups,
      orgs,
    },
    revalidate: 1800,
  };
}

export default function DatasetSearch({
  fallback,
  groups,
  orgs,
}: InferGetServerSidePropsType<typeof getStaticProps>): JSX.Element {
  const router = useRouter();
  const { q } = router.query;
  const [options, setOptions] = useState<PackageSearchOptions>({
    offset: 0,
    limit: 5,
    tags: [],
    groups: [],
    orgs: [],
    query: q as string,
  });

  return (
    <>
      <Head>
        <title>Datasets</title>
        <meta name="description" content="Explore a comprehensive list of datasets available at the London Borough of Hounslow's Open Data Portal, providing valuable insights and data for public use." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="grid grid-rows-searchpage-hero">
          <section className="row-start-1 row-span-3 col-span-full">
            <div
              className="bg-cover bg-center bg-no-repeat bg-[#65316c] h-[414px] flex flex-col"
             
            >
              <TopBar />
              <div
                className="grid md:grid-cols-2 mx-auto items-center grow w-full max-w-6xl px-4 xl:px-0"
                //This lines up the text with the search form below
              >
                <div className="col-span-1">
                  <h1 className="text-4xl font-semibold text-white">
                    Search Datasets
                  </h1>
                  <h2 className="text-xl text-white py-6">
                    Search datasets and filter by organizations or groups.
                  </h2>
                </div>
              </div>
            </div>
          </section>
          <section className="grid row-start-3 row-span-2 col-span-full">
            <DatasetSearchForm
              options={options}
              orgs={orgs}
              groups={groups}
              setOptions={setOptions}
            />
          </section>
        </div>
        <main className="custom-container">
          <article
            className="grid grid-cols-1 lg:grid-cols-9 lg:gap-x-2 xl:gap-x-12"
            style={{ paddingBlock: "min(8vh, 10rem)" }}
          >
            <div className="lg:col-span-3">
              <DatasetSearchFilters
                groups={groups}
                orgs={orgs}
                options={options}
                setOptions={setOptions}
              />
            </div>
            <div className="lg:col-span-6">
              <SWRConfig value={{ fallback }}>
                <ListOfDatasets options={options} setOptions={setOptions} />
              </SWRConfig>
            </div>
          </article>
        </main>
      </Layout>
    </>
  );
}
