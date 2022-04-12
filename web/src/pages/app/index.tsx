import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { withApollo } from "../../lib/withApollo";
import { useGetProductsQuery } from "../../graphql/generated/graphql";
import {
  getServerPageGetProducts,
  ssrGetProducts,
  useMe,
} from "../../graphql/generated/page";

function Home() {
  const { user } = useUser();
  const { data: me, loading, error } = useMe();

  return (
    <div className="text-violet-500">
      <pre>me: {JSON.stringify(me, null, 2)}</pre>
      <h1>{JSON.stringify(user, null, 2)}</h1>
      <Link href="/api/auth/logout">
        <a>Logout</a>
      </Link>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    return {
      props: {},
    };
  },
});

export default withApollo(ssrGetProducts.withPage()(Home));
