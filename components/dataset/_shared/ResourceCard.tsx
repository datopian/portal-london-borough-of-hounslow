import { Resource } from '@portaljs/ckan'
import { resourceTextColors } from '../../_shared/Colors'
export default function ResourceCard({
  resource,
  small,
}: {
  resource?: Resource
  small?: boolean
}) {
  return (
    <div className="col-span-1 place-content-center md:place-content-start">
      <div
        className="border-l-[5px] border-box border-lightaccent max-w-[90px] min-w-[60px] mx-auto md:mx-0 flex place-content-center my-auto"
        style={{ minHeight: small ? '60px' : '90px' }}
      >
        {(resource && resource.format && (
          <span
            className={`${
              resourceTextColors[
                resource.format as keyof typeof resourceTextColors
              ]
                ? resourceTextColors[
                    resource.format as keyof typeof resourceTextColors
                  ]
                : 'text-gray-200'
            } font-bold ${small ? 'text-lg' : 'text-2xl'} my-auto`}
          >
            {resource.format}
          </span>
        )) || (
          <span className="font-bold text-2xl text-gray-200 my-auto">NONE</span>
        )}
      </div>
    </div>
  )
}
