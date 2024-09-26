import { Field, Form, Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { Organization, PackageSearchOptions } from "@portaljs/ckan";
import { Group } from "@portaljs/ckan";
import useSWR from "swr";
import { getAllGroups } from "@/lib/queries/groups";
import { getAllOrganizations } from "@/lib/queries/orgs";

export default function DatasetSearchForm({
  groups,
  orgs,
  setOptions,
  options,
}: {
  groups: Array<Group>;
  orgs: Array<Organization>;
  options: PackageSearchOptions;
  setOptions: Dispatch<SetStateAction<PackageSearchOptions>>;
}) {
  const { data: groupsData } = useSWR('groups', () => {
    return getAllGroups({ detailed: true });
  }, { fallbackData: groups})
  const { data: orgsData } = useSWR('orgs', () => {
    return getAllOrganizations({ detailed: true });
  }, { fallbackData: orgs })
  return (
    <Formik
      initialValues={{
        org: "",
        group: "",
        query: options.query ? options.query : "",
      }}
      enableReinitialize={true}
      onSubmit={async (values) => {
        const org = orgsData.find((org) => org.title === values.org);
        const group = groupsData.find(
          (group) => group.display_name === values.group
        );
        setOptions({
          ...options,
          groups: group ? [group.name] : [],
          orgs: org ? [org.name] : [],
          query: values.query,
        });
      }}
    >
      <div className="mx-auto max-w-6xl w-full px-4 xl:px-0">
        <Form className="min-h-[80px] flex flex-col lg:flex-row bg-white px-5 py-3 rounded-xl border-box border-black">
          <Field
            type="text"
            placeholder="Search Datasets"
            className="ml-6 lg:ml-2 grow py-4 border-0 placeholder:text-secondary"
            name="query"
          />
          <Field
            list="groups"
            name="group"
            placeholder="Groups"
            className="lg:border-l p-4 mx-2 placeholder:text-secondary"
          ></Field>

          <datalist aria-label="Formats" id="groups">
            <option value="">Theme</option>
            {groupsData.map((group, index) => (
              <option key={index}>{group.display_name}</option>
            ))}
          </datalist>
          <Field
            list="orgs"
            name="org"
            placeholder="Organization"
            className="lg:border-l p-4 mx-2 placeholder:text-secondary"
          ></Field>
          <datalist aria-label="Formats" id="orgs">
            <option value="">Organization</option>
            {orgsData.map((org, index) => (
              <option key={index}>{org.title}</option>
            ))}
          </datalist>
          <button
            className="font-[600] text-white px-12 py-4 rounded-lg bg-accent hover:bg-lightaccent hover:text-secondary duration-150"
            type="submit"
          >
            Search
          </button>
        </Form>
      </div>
    </Formik>
  );
}
