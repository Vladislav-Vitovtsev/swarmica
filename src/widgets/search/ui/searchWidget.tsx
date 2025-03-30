import { SearchForm, SearchResults } from "@/features/articleSearch";
import { useRecoilValue } from "recoil";
import { isSearchingState, searchParamsState } from "@/features/articleSearch";

export const SearchWidget = () => {
  const isSearching = useRecoilValue(isSearchingState);
  const searchParams = useRecoilValue(searchParamsState);

  return (
    <div>
      <SearchForm />
      {isSearching && <SearchResults searchParams={searchParams} />}
    </div>
  );
};
