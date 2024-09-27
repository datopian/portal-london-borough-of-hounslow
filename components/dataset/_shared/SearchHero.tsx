import { Dispatch, SetStateAction } from "react";

export default function SearchHero({
  title,
  searchValue,
  onChange,
}: {
  title: string;
  searchValue: string;
  onChange: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="grid md:grid-cols-2 mx-auto items-center grow custom-container grow pt-16 max-w-6xl">
      <div className="col-span-1">
        <h1 className="text-4xl font-[600] text-white pt-1">{title}</h1>
        <input
          id="search2"
          type="search"
          name="search"
          onChange={(e) => {
            onChange(e.target.value);
          }}
          value={searchValue}
          placeholder="Search..."
          aria-label="Search"
          className="w-3/4 px-3 py-4 my-8 border border-accent rounded-md leading-none bg-white placeholder-secondary focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-accent focus:border-accent"
        />
      </div>
    </div>
  );
}
