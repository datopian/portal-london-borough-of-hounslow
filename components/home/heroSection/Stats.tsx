export interface StatsProps {
  datasetCount: number
  orgCount: number
  groupCount: number
}

const Stats: React.FC<StatsProps> = ({
  datasetCount,
  orgCount,
  groupCount,
}) => {
  const stats = [
    {
      name: 'Datasets',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 sm:mr-2 mt-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
      ),
      stat: datasetCount,
    },
    {
      name: 'Groups',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 sm:mr-2 mt-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      stat: groupCount,
    },
  ]

  return (
    <div className="flex lg:justify-end">
      <div className="flex flex-col items-start  bg-transparent text-secondary mb-4 lg:my-4 sm:pt-5 gap-x-5 ">
        {stats.map((item) => (
          <div key={item.name} className="flex items-center mr-2 ">
            <div className="flex justify-center -mt-1.5 h-12 w-12 ">
              {item.icon}
            </div>
            <div className="flex items-center gap-2 text-2xl font-[600]  text-white">
              {' '}
              {item.stat} <div className="font-normal"> {item.name} </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stats
