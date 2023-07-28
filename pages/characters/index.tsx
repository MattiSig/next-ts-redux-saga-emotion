import { Basic } from "../../shared/styles";
import { storeWrapper } from "../../store";
import {
  api,
  getCharacters,
  useGetCharactersQuery,
} from "../../store/services/rickNMortyApi";
import { useRouter } from "next/router";
import Link from "next/link";
import { END } from "redux-saga";

const Home = () => {
  const router = useRouter();
  const { data } = useGetCharactersQuery(router.query.page);
  const currentPage = Number(router.query.page) || 1;

  const handlePageChange = (page: number) => {
    router.push({
      pathname: "/",
      query: { page },
    });
  };

  return (
    <div>
      <Basic>Paginated Rick and Morty characters</Basic>
      {data?.results.map((character) => (
        <div
          key={character.id}
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link href={`/characters/${character.id}`}>{character.name}</Link>
          <img src={character.image} alt={character.name} />
        </div>
      ))}
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: 20,
        }}
      >
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(Number(currentPage) - 1)}>
            Previous
          </button>
        )}
        <div>Page {currentPage}</div>
        <button onClick={() => handlePageChange(Number(currentPage) + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps = storeWrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(getCharacters.initiate(undefined));
    await Promise.all(store.dispatch(api.util.getRunningQueriesThunk()));

    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
);

export default Home;
