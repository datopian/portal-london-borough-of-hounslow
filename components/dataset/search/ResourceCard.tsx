import { Resource } from '@portaljs/ckan'
import { resourceTextColors } from '@/components/_shared/Colors'

export default function ResourceCard({
  resource,
  small,
}: {
  resource?: Resource
  small?: boolean
}) {
  let textSize: string
  const charCountBreakpoint = 5
  if (small) {
    if (resource && resource.format.length < charCountBreakpoint) {
      textSize = 'text-lg'
    } else {
      textSize = 'text-xs'
    }
  } else {
    if (resource && resource.format.length < charCountBreakpoint) {
      textSize = 'text-2xl'
    } else {
      textSize = 'text-lg'
    }
  }

  return (
    <div className="col-span-1 md:pt-1.5 place-content-center md:place-content-start">
      <div
        className="bg-white border-l-[5px] border-box border-lightaccent max-w-[100px] min-w-[64px] mx-auto md:mx-0 flex place-content-center my-auto"
        style={{ minHeight: small ? '64px' : '100px' }}
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
            } font-bold ${textSize} my-auto`}
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
