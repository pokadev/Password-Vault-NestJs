import { FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import FormWrapper from "./FormWrapper";

function RegisterForm() {
  return;
  <FormWrapper>
    <Heading>Register</Heading>
    <FormControl mt="4">
      <FormLabel htmlFor="email">Email</FormLabel>
      <Input id="email" placeholder="Email" />
    </FormControl>
  </FormWrapper>;
}

export default RegisterForm;
