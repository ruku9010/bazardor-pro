"use client";
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
  InputGroup,
} from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { useState } from "react";
import { signIn, signUp } from "@/lib/auth-client";

const SignUpPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isMismatch = confirmPassword.length > 0 && password !== confirmPassword;
  
  const canSubmit = password.length > 0 && password === confirmPassword;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as { name:string; email: string; password:string; confirmpassword:string;};


    const { data: resData, error } = await signUp.email({
        ...data,
        callbackURL: "/", // A URL to redirect to after the user verifies their email (optional)
    },);

    console.log("Signup res:", resData, error)

    if (!canSubmit) return;
    
    // console.log("Signup successful!");
        
    
  };

  const handleGoogleSignIn = async () => {
        await signIn.social({
          provider: "google",
        });
      };
    
      const handleGithubSignIn = async () => {
     await signIn.social({
          provider: "github",
        });
      }


  return (
    <div className="flex justify-center items-center">
      <Form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md my-5"
      >
        <Fieldset className="w-sm ">
          <Fieldset.Legend>Sign Up Here</Fieldset.Legend>
          <Description>Create your account.</Description>
          <Fieldset.Group>
            <TextField
              isRequired
              name="name"
              validate={(value) => {
                if (value.length < 3) {
                  return "Name must be at least 3 characters";
                }
                return null;
              }}
            >
              <Label>Name</Label>
              <Input placeholder="Enter your name"  />
              <FieldError />
            </TextField>
            <TextField isRequired name="email" type="email">
              <Label>Email</Label>
              <Input placeholder="Enter your email" />
              <FieldError />
            </TextField>

            <TextField isRequired fullWidth name="password">
              <Label>Password</Label>
              <InputGroup fullWidth>
                <InputGroup.Input
                  placeholder="Enter password"
                  // Dynamically change type based on state
                  type={isVisible ? "text" : "password"}
                  value={password}
            onChange={(e) => setPassword(e.target.value)}
                />
                <InputGroup.Suffix>
                  {/* Wrap the icon in a button to handle the click properly */}
                  <button
                    type="button" // Prevents the button from submitting if inside a form
                    onClick={toggleVisibility}
                    className="flex items-center justify-center focus:outline-none"
                    aria-label="Toggle password visibility"
                  >
                    {isVisible ? (
                      <EyeSlash className="size-4 text-muted cursor-pointer" />
                    ) : (
                      <Eye className="size-4 text-muted cursor-pointer" />
                    )}
                  </button>
                </InputGroup.Suffix>
              </InputGroup>
            </TextField>
            <TextField isRequired fullWidth name="confirmPassword">
        <Label>Confirm Password</Label>
        <InputGroup fullWidth>
          <InputGroup.Input 
            placeholder="Confirm password" 
            type={isConfirmVisible ? "text" : "password"} 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={isMismatch ? "border-red-500" : ""}
          />
          <InputGroup.Suffix>
            <button
              type="button"
              onClick={() => setIsConfirmVisible(!isConfirmVisible)}
              className="flex items-center justify-center focus:outline-none"
              aria-label="Toggle confirm password visibility"
            >
              {isConfirmVisible ? (
                <EyeSlash className="size-4 text-muted cursor-pointer" />
              ) : (
                <Eye className="size-4 text-muted cursor-pointer" />
              )}
            </button>
          </InputGroup.Suffix>
        </InputGroup>
      </TextField>
          </Fieldset.Group>
          <Fieldset.Actions>
            <Button type="submit">
              {/* <FloppyDisk /> */}
              Save changes
            </Button>
            <Button type="reset" variant="tertiary">
              Cancel
            </Button>
          </Fieldset.Actions>
        </Fieldset>

      <div className="flex justify-center items-center gap-4 w-full mt-5">
        <Button onClick={handleGoogleSignIn} className="btn">
          Login with Google
        </Button>
        <Button onClick={handleGithubSignIn} className="btn">
          Login with Github
        </Button>
      </div>
      </Form>

    </div>
  );
};

export default SignUpPage;
