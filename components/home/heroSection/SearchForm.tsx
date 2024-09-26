import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

const SearchForm: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    router.push({
      pathname: "/search",
      query: { q: searchQuery },
    });
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="items-center flex flex-row gap-4"
    >
      <input
        id="search2"
        type="search"
        name="search"
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        placeholder="Search datasets..."
        aria-label="Search"
        className="w-3/4 pl-3 py-[0.78rem] border border-secondary rounded-md leading-none bg-white placeholder-secondary text-xl font-inter focus:border-secondary focus:outline-none "
      />
      <button
        type="submit"
        className="text-base transition font-[600] px-10 py-4 leading-none border bg-white rounded-md text-accent hover:text-secondary border-accent lg:mt-0 hover:bg-lightaccent"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
