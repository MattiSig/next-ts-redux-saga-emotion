import { END } from "redux-saga";
import { storeWrapper } from "../../store";
import { getEpisodeRequest } from "../../store/slices/rickAndMortySlice";

const EpisodePage = ({ episode }) => {
  return (
    <div>
      <h1>{episode.name}</h1>
      <p>{episode.air_date}</p>
      <p>{episode.episode}</p>
      <p>{episode.characters}</p>
    </div>
  );
};

export default EpisodePage;

export const getServerSideProps = storeWrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      store.dispatch(getEpisodeRequest(params.id));

      store.dispatch(END);
      await store.sagaTask.toPromise();

      const episode = store.getState().rickAndMorty.endpoints.getEpisode.data;

      return {
        props: {
          episode,
        },
      };
    }
);
