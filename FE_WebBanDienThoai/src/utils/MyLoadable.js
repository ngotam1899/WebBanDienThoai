import Loadable from "react-loadable";
import Loading from "../containers/Loading";

export default function MyLoadable(opts) {
  return Loadable({
    loading: Loading,
    ...opts,
  });
}
