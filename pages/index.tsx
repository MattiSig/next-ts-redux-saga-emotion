import Link from "next/link";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/characters">Characters</Link>
      <br />
      <Link href="/episodes">Episodes</Link>
    </div>
  );
};

export default Home;
