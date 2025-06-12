import Link from 'next/link'
import { format } from 'timeago.js'
import { Dataset } from '@portaljs/ckan'
import ResourceCard from './ResourceCard'
import { resourceBgColors } from '../../_shared/Colors'
export default function DatasetCard({
  dataset,
  showOrg = true,
}: {
  dataset: Dataset
  showOrg?: boolean
}) {
  const resourceBgColorsProxy = new Proxy(resourceBgColors, {
    get: (obj, prop) => {
      if (prop in obj) {
        return obj[prop]
      }
      return 'bg-amber-400'
    },
  })

  function DatasetInformations() {
    return (
      <div className="flex align-center gap-2 text-white ">
        {(dataset.resources.length > 0 && dataset.resources[0].format && (
          <>
            {showOrg !== false && (
              <span
                className={`${
                  resourceBgColors[
                    dataset.resources[0].format as keyof typeof resourceBgColors
                  ]
                } px-4 py-1 rounded-md text-xs`}
              >
                {dataset.organization
                  ? dataset.organization.title
                  : 'No organization'}
              </span>
            )}
            <span
              className={`${
                resourceBgColorsProxy[
                  dataset.resources[0].format as keyof typeof resourceBgColors
                ]
              } px-4 py-1 rounded-md text-xs`}
            >
              {dataset.metadata_created && format(dataset.metadata_created)}
            </span>
          </>
        )) || (
          <>
            {showOrg !== false && (
              <span className="bg-accent px-4 py-1 rounded-md text-xs">
                {dataset.organization
                  ? dataset.organization.title
                  : 'No organization'}
              </span>
            )}
            <span className="bg-accent text-white px-4 py-1 rounded-md text-xs">
              {dataset.metadata_created && format(dataset.metadata_created)}
            </span>
          </>
        )}
      </div>
    )
  }

  return (
    <article className="grid grid-cols-1 md:grid-cols-7 gap-x-2">
      <div className="mb-4 md:mb-0">
        {' '}
        <ResourceCard
          resource={dataset?.resources.find((resource) => resource.format)}
        />
      </div>

      <div className="col-span-6 place-content-start flex flex-col gap-1">
        <Link href={`/@${dataset.organization.name}/${dataset.name}`}>
          <h1 className="m-auto md:m-0 font-semibold text-lg text-secondary">
            {dataset.title || 'No title'}
          </h1>
        </Link>
        <p className="text-sm font-normal text-secondary  line-clamp-2 h-[44px] overflow-y-hidden ">
          {dataset.notes?.replace(/<\/?[^>]+(>|$)/g, '') || 'No description'}
        </p>
        <DatasetInformations />
      </div>
    </article>
  )
}
