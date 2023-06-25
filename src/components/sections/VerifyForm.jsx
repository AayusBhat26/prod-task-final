import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import FormProvider, { TextFieldAdv } from "../../components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack } from "@mui/material";
import AdvCodes from "../../components/hook-form/AdvCodes";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import authApi from "../../api/authApi";
import {useNavigate} from "react-router-dom"
// import { VerifyEmail } from "../../redux/slices/auth";
export default function VerifyForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.user.value.user);
  // const user = useSelector((state)=>state.user.value)
  console.log(email);
  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required("Code is required"),
    code2: Yup.string().required("Code is required"),
    code3: Yup.string().required("Code is required"),
    code4: Yup.string().required("Code is required"),
    code5: Yup.string().required("Code is required"),
    code6: Yup.string().required("Code is required"),
  });

  const defaultValues = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data) => {
    console.log(data);
    try {
      // await axios.post('')
      // await authApi.verifyOtp()
      const otp = `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`;
      console.log(email, otp);
      await authApi.verifyOtp({email, otp})
    } catch (error) {
      console.log(error);
    }finally{
      navigate('/')
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <AdvCodes
          keyName="code"
          inputs={["code1", "code2", "code3", "code4", "code5", "code6"]}
        />

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          Verify
        </Button>
      </Stack>
    </FormProvider>
  );
}
