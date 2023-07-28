import { useRouter } from "next/router";
import { storeWrapper } from "../../store";
import {
  api,
  getCharacter,
  useGetCharacterQuery,
} from "../../store/services/rickNMortyApi";
import { END } from "redux-saga";

const CharacterPage = () => {
  const router = useRouter();
  const { data } = useGetCharacterQuery(router.query.id, {
    skip: router.isFallback,
  });

  return (
    <div>
      Hydrated storage
      <div>{router.query.id}</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default CharacterPage;

export const getServerSideProps = storeWrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      store.dispatch(getCharacter.initiate(params.id));
      await Promise.all(store.dispatch(api.util.getRunningQueriesThunk()));

      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);
