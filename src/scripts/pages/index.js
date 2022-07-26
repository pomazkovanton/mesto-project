import "../../css/pages/index.css";
import Api from "../components/Api";
import { configApi } from "../utils/constants";

const api = new Api(configApi);

const getData = async () => {
  const serverData = await Promise.all([api.getUser(), api.getCards()]);
  const userData = serverData[0].data;
  const cards = serverData[1].data;
};

getData();
