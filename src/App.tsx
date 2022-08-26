import React from "react";
import { Outlet } from "react-router-dom";

const App: React.FC<NullProps> = () => (
  <>
    <p>这里是主页</p>
    <Outlet />
  </>
)

export default App;