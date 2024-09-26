import getConfig from 'next/config'
import Image from 'next/image'
import Link from 'next/link'
import { Organization } from 'ckan'

type OrgCardProps = Pick<
  Organization,
  'display_name' | 'image_display_url' | 'description' | 'name'
>

export default function GroupCard({
  display_name,
  image_display_url,
  description,
  name,
}: OrgCardProps) {
  const url = image_display_url ? new URL(image_display_url) : undefined
  return (
    <div className="border-box border-l-[6px] border-lightaccent bg-white p-8 col-span-3 h-full text-secondary grid grid-rows-3 group hover:underline hover:cursor-pointer">
      <Image
        src={
          image_display_url &&
          url &&
          getConfig().publicRuntimeConfig.DOMAINS.includes(url.hostname)
            ? image_display_url
            : '/images/logos/DefaultOrgLogo.svg'
        }
        alt={`${name}-collection`}
        width="43"
        height="43"
      ></Image>
      <h3 className="font-inter font-[600] text-2xl">{display_name}</h3>
      <p className="font-inter font-medium text-lg line-clamp-3 mb-1">
        {description}
      </p>
    </div>
  )
}
