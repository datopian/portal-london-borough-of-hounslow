interface IconProps {
  className: string
  'aria-hidden': boolean
}

const Footer: React.FC = () => {
  const navigation = {
    about: [
      {
        name: 'London Borough of Hounslow',
        href: 'https://www.hounslow.gov.uk/',
      },
      { name: 'Hounslow Data Hub', href: 'https://stats.hounslow.gov.uk/' },
      {
        name: 'Contact us',
        href: 'https://www.hounslow.gov.uk/info/20158/customer_services',
      },
      {
        name: 'Privacy notice',
        href: 'https://www.hounslow.gov.uk/info/20110/open_data_and_information_requests/1368/privacy_notice',
      },
    ],
    useful: [
      { name: 'Datasets', href: '/search' },
      { name: 'Groups', href: '/groups' },
    ],
    social: [
      {
        name: 'facebook',
        href: 'https://web.facebook.com/datopianltd/',
        // eslint-disable-next-line
        icon: (props: IconProps) => (
          <svg fill="currentColor" viewBox="0 0 64 64" {...props}>
            <path
              fillRule="evenodd"
              d="M39.8 12.2H48V0h-9.7C26.6.5 24.2 7.1 24 14v6.1h-8V32h8v32h12V32h9.9l1.9-11.9H36v-3.7a3.962 3.962 0 0 1 3.8-4.2z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        name: 'twitter',
        href: 'https://twitter.com/datopian',
        // eslint-disable-next-line
        icon: (props: IconProps) => (
          <svg fill="currentColor" viewBox="0 0 64 64" {...props}>
            <path
              fillRule="evenodd"
              d="M60.448 15.109a24.276 24.276 0 0 1-3.288.968.5.5 0 0 1-.451-.853 15.146 15.146 0 0 0 3.119-4.263.5.5 0 0 0-.677-.662 18.6 18.6 0 0 1-6.527 2.071 12.92 12.92 0 0 0-9-3.75A12.363 12.363 0 0 0 31.25 20.994a12.727 12.727 0 0 0 .281 2.719c-9.048-.274-19.61-4.647-25.781-12.249a.5.5 0 0 0-.83.073 12.475 12.475 0 0 0 2.956 14.79.5.5 0 0 1-.344.887 7.749 7.749 0 0 1-3.1-.8.5.5 0 0 0-.725.477 11.653 11.653 0 0 0 7.979 10.567.5.5 0 0 1-.09.964 12.567 12.567 0 0 1-2.834 0 .506.506 0 0 0-.536.635c.849 3.282 5.092 7.125 9.839 7.652a.5.5 0 0 1 .267.87 20.943 20.943 0 0 1-14 4.577.5.5 0 0 0-.255.942 37.29 37.29 0 0 0 17.33 4.266 34.5 34.5 0 0 0 34.687-36.182v-.469a21.11 21.11 0 0 0 4.934-4.839.5.5 0 0 0-.58-.765z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        name: 'linkedin',
        href: 'https://www.linkedin.com/company/datopian',
        // eslint-disable-next-line
        icon: (props: IconProps) => (
          <svg fill="currentColor" viewBox="0 0 64 64" {...props}>
            <path
              fillRule="evenodd"
              d="M3.078 22.331h12.188v36.844H3.078z 
              M46.719 21.112c-5.344 0-8.531 1.969-11.906 6.281v-5.062H22.625v36.844h12.281V39.206c0-4.219 2.156-8.344 7.031-8.344s7.781 4.125 7.781 8.25v20.063H62V38.269c0-14.532-9.844-17.157-15.281-17.157z
              M9.219 4.425C5.188 4.425 2 7.331 2 10.894s3.188 6.469 7.219 6.469 7.219-2.906 7.219-6.469-3.188-6.469-7.219-6.469z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        name: 'email',
        href: 'mailto:hello@datopian.com',
        // eslint-disable-next-line
        icon: (props: IconProps) => (
          <svg fill="currentColor" viewBox="0 0 64 64" {...props}>
            <path fillRule="evenodd" d="M2 12h60v40H2z" clipRule="evenodd" />
            <path
              fillRule="evenodd"
              stroke="#fff"
              strokeWidth="2"
              d="M2 12l30 27.4L62 12"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
    ],
  }

  return (
    <footer className="bg-accent !text-white">
      <div className="max-w-6xl custom-container flex flex-col flex-wrap py-10 mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap text-secondary">
        <div className="flex flex-col-reverse justify-between w-full text-center md:text-left lg:flex-row gap-4 items-center">
          <div className="w-full lg:w-2/3">
            <ul className="flex gap-4 text-md list-none justify-center lg:justify-start">
              {navigation.about.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="font-inter font-normal text-white underline hover:decoration-2"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="text-white font-inter text-[14px] flex justify-center lg:justify-start mt-2.5">
              © Copyright 2024 London Borough of Hounslow. Powered
              by
              <a
                href="https://portaljs.org"
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                🌀 <span className="underline group-hover:decoration-2">PortalJS</span>
              </a>
            </div>
          </div>

          <div className="flex w-full lg:w-1/3 justify-center lg:justify-auto">
            <img src="/images/logos/site-logo-footer.svg" />
          </div>
        </div>
      </div>
      
    </footer>
  )
}

export default Footer
