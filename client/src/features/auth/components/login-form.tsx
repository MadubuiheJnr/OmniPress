import { zodResolver } from "@hookform/resolvers/zod";
import { loginDtoSchema, type LoginDto } from "../schemas";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { Spinner } from "@/shared/components/ui/spinner";
import { useLoginMutation } from "../hooks/use-login";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/shared/store/global.auth.store";
import { toast } from "sonner";

export const LoginForm = () => {
  const { setAuth, setLoading } = useAuthStore();
  const navigate = useNavigate();
  const form = useForm<LoginDto>({
    resolver: zodResolver(loginDtoSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const { mutate, isPending } = useLoginMutation();

  const onSubmit = (data: LoginDto) => {
    mutate(data, {
      onSuccess: (data) => {
        setAuth(data.data.user, data.data.token);
        form.reset();
        setLoading(false);
        navigate("/", { replace: true });
        toast.success(data.message);
      },
    });
  };
  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-3">
            <Controller
              name="identifier"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor={field.name}>Email/Username</FieldLabel>
                  <Input
                    id={field.name}
                    {...field}
                    placeholder="Johndoe"
                    disabled={isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    id={field.name}
                    type="password"
                    {...field}
                    placeholder="*** *** **"
                    disabled={isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="flex items-center justify-between">
              <Field orientation="horizontal" className="text-primary">
                <Checkbox
                  id="terms-checkbox-invalid"
                  name="terms-checkbox-invalid"
                />
                <FieldLabel htmlFor="terms-checkbox-invalid">
                  Remember me
                </FieldLabel>
              </Field>

              <Link to="/auth/forgot-password">
                <Button variant="link">Forgot password?</Button>
              </Link>
            </div>
          </FieldGroup>

          <FieldGroup className="mt-5">
            <Button
              type="submit"
              size="lg"
              disabled={isPending}
              className={cn(isPending && "cursor-not-allowed bg-primary/20")}
            >
              {isPending ? (
                <>
                  <Spinner />
                  Logging in...
                </>
              ) : (
                "Log in"
              )}
            </Button>
          </FieldGroup>
        </form>
      </FormProvider>
    </div>
  );
};
