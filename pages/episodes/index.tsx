import { END } from "redux-saga";
import { storeWrapper } from "../../store";
import { getEpisodesRequest } from "../../store/slices/rickAndMortySlice";
import { useSelector } from "react-redux";
import Link from "next/link";

const EpisodesPage = () => {
  const episodes = useSelector(
    (state) => state.rickAndMorty.endpoints.getEpisodes.data.results
  );

  return (
    <div>
      Episodes
      {episodes.map((episode) => (
        <div
          key={episode.id}
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link href={`/episodes/${episode.id}`}>{episode.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default EpisodesPage;

export const getServerSideProps = storeWrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(getEpisodesRequest());

    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
);
