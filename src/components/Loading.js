import spinnerImg from '../asset/Spinner-1s-200px.gif';
import { Spinner } from './style';
const Loading = () => {
  return (
    <Spinner>
      <img src={spinnerImg} alt="" />
    </Spinner>
  );
};
export default Loading;
