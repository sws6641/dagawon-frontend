"use client";

import React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const FormItemContext = React.createContext<{ id: string } | null>(null);

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField must be used inside <FormField>");
  }
  if (!itemContext) {
    throw new Error("useFormField must be used inside <FormItem>");
  }

  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  return {
    id: itemContext.id,
    name: fieldContext.name,
    formItemId: `${itemContext.id}-form-item`,
    formDescriptionId: `${itemContext.id}-form-item-description`,
    formMessageId: `${itemContext.id}-form-item-message`,
    ...fieldState,
  };
}

const Form = FormProvider;

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();
  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={className} {...props} />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  children,
  ...props
}: React.ComponentProps<"label">) {
  const { formItemId, error } = useFormField();
  return (
    <label
      htmlFor={formItemId}
      className={`${error ? "text-red-600" : ""} ${className || ""}`}
      {...props}
    >
      {children}
    </label>
  );
}

function FormControl({
  children,
  ...props
}: React.ComponentProps<"input"> | React.ComponentProps<"textarea">) {
  const { formItemId, formDescriptionId, formMessageId, error } =
    useFormField();
  const commonProps = {
    id: formItemId,
    "aria-describedby": error
      ? `${formDescriptionId} ${formMessageId}`
      : formDescriptionId,
    "aria-invalid": !!error,
    ...props,
  };
  return React.cloneElement(children as React.ReactElement, commonProps);
}

function FormDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();
  return (
    <p id={formDescriptionId} className={`text-sm text-gray-500 ${className}`}>
      {props.children}
    </p>
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  if (!error) return null;
  return (
    <p id={formMessageId} className={`text-sm text-red-600 ${className}`}>
      {String(error?.message ?? "")}
    </p>
  );
}

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
};