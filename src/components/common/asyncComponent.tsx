import React, { Suspense } from "react";

type AsyncComponentProps = {
  route: any;
  loading: any;
}
const AsyncComponent:React.FC<AsyncComponentProps> = ({ route, loading }) => {
  return <Suspense fallback={loading}>{route.component}</Suspense>;
};

export default AsyncComponent;
