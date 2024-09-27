import type {
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import MiniSearch from "minisearch";
import ListOfGroups from "../../components/groups/ListOfGroups";
import Layout from "../../components/_shared/Layout";
import { useState } from "react";
import TopBar from "../../components/_shared/TopBar";
import SearchHero from "../../components/dataset/_shared/SearchHero";
import { Group } from "@portaljs/ckan";
import { getAllGroups } from "@/lib/queries/groups";

export async function getStaticProps() {
  const groups = await getAllGroups({ detailed: true });

  return {
    props: {
      groups,
    },
    revalidate: 1800,
  };
}

export default function GroupsPage({
  groups,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const miniSearch = new MiniSearch({
    fields: ["description", "display_name"], // fields to index for full-text search
    storeFields: ["description", "display_name", "image_display_url", "name"], // fields to return with search results
  });
  miniSearch.addAll(groups);
  return (
    <>
      <Head>
        <title>Groups</title>
        <meta name="description" content="List of groups from the London Borough of Hounslow Open Data Portal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main miniSearch={miniSearch} groups={groups} />
    </>
  );
}

function Main({
  miniSearch,
  groups,
}: {
  miniSearch: MiniSearch<any>;
  groups: Array<Group>;
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
            title="Groups"
            searchValue={searchString}
            onChange={setSearchString}
          />
        </div>
      </section>
      <main className="custom-container py-8 max-w-6xl">
        <ListOfGroups
          groups={groups}
          searchString={searchString}
          miniSearch={miniSearch}
        />
      </main>
    </Layout>
  );
}
