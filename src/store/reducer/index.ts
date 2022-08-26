import userSlice, { nameSpace as user } from "./user";
import globalSlice, { nameSpace as global } from "./global";

const slices = {
  [user]: userSlice,
  [global]: globalSlice,
};

export default slices;
