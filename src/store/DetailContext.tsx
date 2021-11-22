import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { getDetail } from "../api/api";

interface DetailContextInterface {
  detail: any;
  handleDetail: any;
}
  
const defaultState = {
  detail: {},
  handleDetail: () => {}
};

export const DetailContext = React.createContext<DetailContextInterface>(defaultState);

const DetailProvider: React.FC = ({ children }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const [detailId, setDetailId] = useState<string>("");
  const [detail, setDetail] = useState<any>({});
  const [newDetail, setNewDetail] = useState<boolean>(false);

  useEffect(() => {
    if (newDetail) {
      console.log(location.pathname, detailId);
      let data = getDetail(detailId);
      // Only execute if detail data exists
      if (data) {
        if (location.pathname !== "/detail/" + detailId) {
          navigate("/detail/" + detailId); // Detail click from another view
        }
        setDetail(data);
        console.log("useEffect setDetail", detail);
      }
    }
    setNewDetail(false);
  }, [newDetail]);

  const handleDetail = (id) => {
    console.log("handleDetail", id);
    setDetailId(id);
    setNewDetail(true);
  };

  return (
    <DetailContext.Provider
      value={{
        detail,
        handleDetail
      }}
    >
      {children}
    </DetailContext.Provider>
  );
};

export default DetailProvider;