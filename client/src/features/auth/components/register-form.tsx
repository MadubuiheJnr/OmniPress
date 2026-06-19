import { Controller, FormProvider, useForm } from "react-hook-form";
import { registerDtoSchema, type RegisterDto } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { useRegisterMutation } from "../hooks/use-register";
import { Spinner } from "@/shared/components/ui/spinner";
import { cn } from "@/shared/lib/utils";

export const RegisterForm = () => {
  const form = useForm<RegisterDto>({
    resolver: zodResolver(registerDtoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useRegisterMutation();
  const onSubmit = (data: RegisterDto) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-3">
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                  <Input
                    id={field.name}
                    {...field}
                    placeholder="John"
                    disabled={isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                  <Input
                    id={field.name}
                    {...field}
                    placeholder="Doe"
                    disabled={isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                  <Input
                    id={field.name}
                    {...field}
                    placeholder="johndoe"
                    disabled={isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    type="email"
                    {...field}
                    placeholder="johndoe@gmail.com"
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
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </FieldGroup>
        </form>
      </FormProvider>
    </div>
  );
};
