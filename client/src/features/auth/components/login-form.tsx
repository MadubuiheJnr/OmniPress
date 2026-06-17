import { LogoWordMark } from "@/shared/components/logo";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";

export const LoginForm = () => {
  return (
    <div className="w-full max-w-md h-screen">
      <div>
        <LogoWordMark classname="w-32 h-auto mb-6 mx-auto" />
      </div>
      <form>
        <Card className="shadow-none drop-shadow-none px-3 py-5 border-0 bg-transparent">
          <CardContent>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Welcome Back</FieldLegend>
                <FieldDescription>
                  Please enter your credentials to access your account
                </FieldDescription>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">Email / username</FieldLabel>
                    <Input id="email" placeholder="john@example.com" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      placeholder="•••• •••• •••• ••••"
                      required
                    />
                    <FieldDescription>
                      Enter your 16-digit card number
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
