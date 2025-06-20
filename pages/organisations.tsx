import type { InferGetStaticPropsType } from "next";
import Head from "next/head";
import MiniSearch from "minisearch";
import { useState } from "react";
import SearchHero from "../components/dataset/_shared/SearchHero";
import ListOfOrgs from "../components/organization/ListOfOrganizations";
import Layout from "../components/_shared/Layout";
import TopBar from "../components/_shared/TopBar";
import { Organization } from "@portaljs/ckan";
import { getAllOrganizations } from "@/lib/queries/orgs";

export async function getStaticProps() {
  const orgs = await getAllOrganizations({ detailed: true });
  return {
    props: {
      orgs,
    },
    revalidate: 1800,
  };
}

export default function OrgsPage({
  orgs,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const miniSearch = new MiniSearch({
    fields: ["description", "display_name"], // fields to index for full-text search
    storeFields: ["description", "display_name", "image_display_url", "name"], // fields to return with search results
  });
  miniSearch.addAll(orgs);
  return (
    <>
      <Head>
        <title>Organisations</title>
        <meta name="description" content="Browse the list of organisations featured on the London Borough of Hounslow Open Data Portal, offering valuable insights and data." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main miniSearch={miniSearch} orgs={orgs} />
    </>
  );
}

function Main({
  miniSearch,
  orgs,
}: {
  miniSearch: MiniSearch<any>;
  orgs: Array<Organization>;
}) {
  const [searchString, setSearchString] = useState("");
  return (
    <Layout>
      <section className="row-start-1 row-end-3 col-span-full">
        <div
          className="bg-cover h-full bg-center bg-no-repeat bg-accent flex flex-col"

        >
          <TopBar />
          <SearchHero
            title="Organisations"
            searchValue={searchString}
            onChange={setSearchString}
          />
        </div>
      </section>
      <main className="custom-container py-8 max-w-6xl">
        <ListOfOrgs
          orgs={orgs}
          searchString={searchString}
          miniSearch={miniSearch}
        />
      </main>
    </Layout>
  );
}
