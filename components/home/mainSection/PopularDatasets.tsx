import Link from 'next/link'
import { Dataset } from '@portaljs/ckan'

type DatasetLinkProps = Pick<Dataset, 'title' | 'metadata_modified'>

//  Name is "PopularDatasets" but content is "Recent Datasets" - Parametrize this
export default function PopularDatasets({
  datasets,
}: {
  datasets: Array<Dataset>
}) {
  return (
    <div className="bg-white p-8 border-box border-l-[5px] border-lightaccent h-full text-secondary">
      <div>
        <div className="inline-block align-middle w-12 h-0.5 border border-accent" />
        <span className="inline-block font-inter text-lg font-[600] text-center pl-2">
          &nbsp; Most recent datasets
        </span>
        <h1 className="font-inter font-[600] text-4xl mt-6">Highlights</h1>
        <div className="flex flex-col">
          {datasets.map((dataset, index) => (
            <Link
              key={index}
              href={`/@${dataset.organization.name}/${dataset.name}`}
              className="block mt-6"
            >
              <DatasetLink
                key={dataset.id}
                title={dataset.title}
                metadata_modified={dataset.metadata_modified}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function DatasetLink({ title, metadata_modified }: DatasetLinkProps) {
  return (
    <div className='group'>
      <h3 className="font-inter font-[600] text-2xl group-hover:underline mb-2">{title}</h3>
      <span className="font-inter text-lg flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
        Last updated:{' '}
        {metadata_modified
          ? new Intl.DateTimeFormat('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(new Date(metadata_modified))
          : ''}
      </span>
    </div>
  )
}
