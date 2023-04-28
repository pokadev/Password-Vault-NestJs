import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import FormWrapper from "./FormWrapper";
import { generateVaultKey, hashPassword } from '../../crypto';
import { useMutation } from 'react-query';
import { registerUser } from '../api';

function RegisterForm() {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string; hashedPassword: string }>();

  const mutation = useMutation(registerUser,{
    onSuccess: ({salt, vault}) => {
      const hashedPassword = getValues('hashedPassword')
      const email = getValues('email')
      const vaultKey = generateVaultKey({
        hashedPassword,
        email, salt
      })
      window.sessionStorage.setItem('vk', vaultKey)
      window.sessionStorage.setItem("vault",'')
    }
  })


  return(

  <FormWrapper
    onSubmit={handleSubmit(() => {

      const password = getValues("password");

      const hashedPassword = hashPassword(password)

      setValue('hashedPassword', hashedPassword)
    })}
  >
    <Heading>Register</Heading>

    <FormControl mt="4">
      <FormLabel htmlFor="email">Email</FormLabel>
      <Input
        id="email"
        placeholder="Email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address",
          },
          minLength: {
            value: 5,
            message: "invalid email address",
          },
        })}
      />
      <FormErrorMessage>
        {errors.email && errors.email.message}
      </FormErrorMessage>
    </FormControl>

    <FormControl mt="4">
      <FormLabel htmlFor="password">Password</FormLabel>
      <Input
        id="email"
        placeholder="Password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 5,
            message: "invalid password",
          }
        })}
      />
      <FormErrorMessage>
        {errors.email && errors.email.message}
      </FormErrorMessage>
    </FormControl>
  </FormWrapper>
  )
}

export default RegisterForm;
