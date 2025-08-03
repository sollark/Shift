import { authService } from "@/service/auth.service";
import { navigationService } from "@/service/navigation.service";
import { log } from "@/service/console.service";
import useAccountStore, { accountSelector } from "@/stores/accountStore";
import { useNavigate } from "@tanstack/react-router";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import ErrorMessage from "./ErrorMessage";
import Form from "./Form";
import SubmitButton from "./buttons/SubmitButton";
import Input from "./inputs/TextInput/TextInput";
import { useAppState } from "@/hooks/useAppState";

type SigninForm = {
  email: string;
  password: string;
};

const defaultValues = {
  email: "",
  password: "",
};

const SignInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Field can not be empty" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Field can not be empty" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password must be less than 20 characters" }),
});

const SignInForm: FC = () => {
  log("SignInForm connected");

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Use the new state management hook (replaces storeService usage)
  const { saveAccessToken, saveAccount } = useAppState();

  // Use proper hook pattern instead of direct store access
  const isAccountComplete = useAccountStore(accountSelector.isComplete);

  async function submit(form: SigninForm) {
    log("Signin form submitted: ", form);

    const { email, password } = form;
    setErrorMessage("");

    const response = await authService.signIn(
      email,
      password,
      saveAccessToken, // Inject token save function
      saveAccount // Inject account save function
    );
    if (!response) {
      setErrorMessage("Could not connect to server");
      return;
    }
    const { success, message } = response;
    if (!success) {
      setErrorMessage(message);
      return;
    }

    // Use navigation service instead of hardcoded routes
    navigationService.handlePostAuthNavigation(navigate, isAccountComplete);
  }

  const emailLabel = t("labels.email");
  const passwordLabel = t("labels.password");

  return (
    <>
      <Form
        schema={SignInSchema}
        defaultValues={defaultValues}
        submit={submit}
        submitButton={<SubmitButton />}
      >
        <Input name="email" label={emailLabel} type="email" />
        <Input name="password" label={passwordLabel} type="password" />
        <ErrorMessage message={errorMessage} />
      </Form>
    </>
  );
};

export default SignInForm;
