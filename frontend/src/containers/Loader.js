import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const antIcon = (
  <LoadingOutlined
    style={{
      color: "black",
      fontSize: 28,
    }}
    spin
  />
);
const Loader = () => { 
        return (
          <div className="loader">
              <Spin indicator={antIcon} />
          </div>
          
          )};
export default Loader;