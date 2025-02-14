import { Container, Button, Typography, Stack, Skeleton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { InfoContext } from "../store/InfoContext";
import { createWallet } from "../api/WalletApi";

const ViewMnemonicPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { info } = useContext(InfoContext);
  const [dataInfo, setInfoData] = useState({ mnemonic: "", password: "" });
  useEffect(() => {
    console.log("location: ", state);
    setInfoData(state);
    console.log("useContext] info:", info);
  }, []);

  const onSubmit = async () => {
    const formData = {
      mnemonic: dataInfo.mnemonic,
      password: info.password,
    };
    console.log(formData);
    const { data, status } = await createWallet(formData);
    if (status === 200) {
      console.log(data.data);
      //ToDo:: extension 저장로직
      /*global chrome*/
      //chrome.storage.local.set({"address":test},function(){ console.log("saved ok"); } );
      navigate("/wallet");
    }
    if (status !== 200) {
      console.error(data);
    }
  };
  return (
    <Container style={{ marginTop: "2%", marginLeft: "25%" }}>
      <img src="/logo_2.png" alt="no img" width="190px" height="60px" />
      <Stack spacing={3}>
        <Button
          onClick={() => navigate(-1, { replace: true })}
          sx={{
            width: "3rem",
            height: "2.3rem",
            marginTop: "15px",
            whiteSpace: "nowrap",
          }}
        >
          <ArrowBackIosNewIcon fontSize="4px" sx={{ marginRight: "5px" }} />
          뒤로가기
        </Button>
        <Typography variant="h3" component="p">
          비밀 복구 구문
        </Typography>
        <Typography variant="body2" component="p">
          비밀 백업 구문을 이용하면 계정을 쉽게 백업하고 복구할 수 있습니다.
        </Typography>
        <Typography
          variant="body2"
          component="p"
          sx={{ whiteSpace: "pre-wrap" }}
        >
          경고: 비밀 복구 구문은 절대로 공개하지 마세요.
          <br />이 구문이 있는 사람은 귀하의 Ether를 영원히 소유할 수 있습니다.
        </Typography>
        <Stack>
          <Skeleton
            variant="rectangular"
            width={350}
            height={150}
            sx={{
              padding: "20px",
              fontSize: "20px",
              wordSpacing: "10px",
              lineHeight: "50px",
              textAlign: "center",
              borderRadius: "30px",
            }}
          >
            {dataInfo.mnemonic}
          </Skeleton>
        </Stack>

        <Button
          variant="contained"
          onClick={() => onSubmit()}
          sx={{
            width: "10%",
            borderRadius: "30px",
            position: "relative",
            right: "-8.2rem",
          }}
        >
          생성하기
        </Button>
      </Stack>
    </Container>
  );
};

export default ViewMnemonicPage;
