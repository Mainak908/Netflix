import { redirect } from "next/navigation";
import { auth } from "../auth";
import Billboard from "../components/Billboard";
import MovieList from "../components/MovieList";
import { client } from "../libs/prismadb";
import Main from "./Main";

const Mainpage = async () => {
  const session = await auth();
  if (!session?.user?.email) return redirect("/auth");

  const currentUser = await client.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!currentUser) return redirect("/auth");
  const favoritedMovies = await client.movie.findMany({
    where: {
      id: {
        in: currentUser.favoriteIds,
      },
    },
  });
  const data = await fetch(`${process.env.API_URL}/api/movies`);
  const movies = await data.json();

  return (
    <Main>
      <Billboard />
      <div className=" pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favoritedMovies} />
      </div>
    </Main>
  );
};

export default Mainpage;
