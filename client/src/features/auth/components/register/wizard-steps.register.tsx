import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";
import type { RegisterDto } from "../../schemas";

export const RegisterStepOne = () => {
  const { control, register } = useFormContext<RegisterDto>();
  return (
    <FieldGroup className="gap-3">
      <Controller
        name="firstName"
        control={control}
        render={({ fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1">
            <FieldLabel htmlFor="firstName">First Name</FieldLabel>
            <Input
              id="firstName"
              {...register("firstName")}
              placeholder="John"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1">
            <FieldLabel htmlFor="lastName">First Name</FieldLabel>
            <Input {...register("lastName")} placeholder="Doe" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};

export const RegisterStepTwo = () => {
  const { control, register } = useFormContext<RegisterDto>();
  return (
    <FieldGroup>
      <Controller
        name="username"
        control={control}
        render={({ fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1">
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input id="username" {...register("username")} placeholder="Doe" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};
export const RegisterStepThree = () => {
  const { control, register } = useFormContext<RegisterDto>();
  return (
    <FieldGroup>
      <Controller
        name="email"
        control={control}
        render={({ fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1">
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Doe"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};
export const RegisterStepFour = () => {
  const { control, register } = useFormContext<RegisterDto>();
  return (
    <FieldGroup>
      <Controller
        name="password"
        control={control}
        render={({ fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="*** *** **"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};
