import { useState, useEffect } from "react";
import SmallButtonNavigate from "../small-button/SmallButton";
import { HiHome } from "react-icons/hi2";
import LoadScreen from "../loadScreen/LoadScreen";
import { fetchData } from "../../../config/fetchData";
export default function Header() {
  const [nombreLocal, setNombreLocal] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetchData("user");
        setNombreLocal(data.nombreLocal);
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  if(loading) {
    return <LoadScreen />
  }
  return (
    <div className="header-container">
      <div className="header-title">{nombreLocal}</div>
      <div className="header-button-usuario">
      <SmallButtonNavigate
          urlTo={`/`}
          color={"home"}
          icon={<HiHome />}
        />
      </div>
    </div>
  );
}
