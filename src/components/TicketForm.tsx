import { useState } from "react";
import { flushSync } from "react-dom";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import TicketGraphic from "./TicketGraphic";
import type { Control, FieldErrors, FieldValues } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// Define type interface for our fieldArray
export type GuestInputs = {
  guests: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    i: number;
  }[];
};

// Store default values to use later
const defaultValues = {
  guests: [{ firstName: "", lastName: "", email: "", phone: "", i: 0 }],
};

export default function TicketForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<GuestInputs>({ defaultValues: defaultValues });

  const { fields, append, remove } = useFieldArray<GuestInputs>({
    name: "guests",
    control,
  });
  // response message used to display server response message
  const [responseMessage, setResponseMessage] = useState("");
  // number of guests is used to set focusIndex when appending fields and to disable the 'Add guest' button when guest limit is reached
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  // guestId is used to give each fieldArray a unique view-transition-name css property. We will store the value in guests.i and increment it after appending each new fieldArray
  const [guestId, setGuestId] = useState(1);

  async function submitForm(data: FieldValues) {
    const response = await fetch("/api/bookings", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (res.message) {
      setResponseMessage(res.message);
    }
  }

  function handleErrors(data: FieldErrors) {
    console.log(data);
  }

  // Appends a new set of guest field inputs to the form
  // Wrapped in flushSync to force synchronous DOM updates (required for View Transitions to work properly)
  async function addGuestFields() {
    flushSync(() => {
      // @ts-ignore
      append<GuestInputs>(
        { guests: [{ defaultValues }], i: guestId },
        { focusIndex: numberOfGuests }
      );
      // increment guestId and NumberOfGuests
      setGuestId(guestId + 1);
      setNumberOfGuests(numberOfGuests + 1);
    });
  }
  // Removes the target set of form fields referenced by index
  // Wrapped in flushSync to force synchronous DOM updates (required for View Transitions to work properly)
  function removeGuestFields(index: number) {
    flushSync(() => {
      remove(index);
      setNumberOfGuests(numberOfGuests - 1);
    });
  }

  const addGuest = () => {
    if (!document.startViewTransition) {
      return addGuestFields();
    }
    document.startViewTransition(addGuestFields);
  };

  const removeGuest = (index: number) => {
    if (!document.startViewTransition) {
      return removeGuestFields(index);
    }
    document.startViewTransition(() => removeGuestFields(index));
  };

  const isRequiredText = (index: number, text: string) => {
    if (index == 0) {
      return { required: text };
    }
    return {};
  };

  return (
    <form
      className="guest-form"
      onSubmit={handleSubmit(submitForm, handleErrors)}
    >
      <div className="guests">
        {fields.map((field, index) => {
          return (
            <section
              className={`guest guest-${field.i}`}
              key={field.id}
              style={
                field.i > 0 ? { viewTransitionName: `guest-${field.i}` } : {}
              }
            >
              <TicketGraphic control={control} index={index} />
              <div className="guest-inputs">
                <label className="required">
                  <span className="vhidden">First Name</span>
                  <input
                    type="text"
                    {...register(`guests.${index}.firstName` as const, {
                      required: "First Name is required",
                    })}
                    placeholder="First name"
                    autoComplete="on"
                    aria-required="true"
                  />
                  {errors && (
                    <span className="error">
                      <ErrorMessage
                        errors={errors}
                        name={`guests.${index}.firstName`}
                      ></ErrorMessage>
                    </span>
                  )}
                </label>
                <label className={index == 0 ? "required" : ""}>
                  <span className="vhidden">Last Name</span>
                  <input
                    type="text"
                    {...register(
                      `guests.${index}.lastName` as const,
                      isRequiredText(index, "Last Name is required")
                    )}
                    placeholder={`Last name ${index == 0 ? "" : "(optional)"}`}
                    autoComplete="on"
                    aria-required={index == 0}
                  />
                  {errors && (
                    <span className="error">
                      <ErrorMessage
                        errors={errors}
                        name={`guests.${index}.lastName`}
                      ></ErrorMessage>
                    </span>
                  )}
                </label>
                <label className={index === 0 ? "required" : ""}>
                  <span className="vhidden">Email</span>
                  <input
                    type="email"
                    {...register(
                      `guests.${index}.email` as const,
                      isRequiredText(index, "Email is required")
                    )}
                    placeholder={`Email ${index == 0 ? "" : "(optional)"}`}
                    autoComplete="on"
                    aria-required={index == 0}
                  />
                  {errors && (
                    <span className="error">
                      <ErrorMessage
                        errors={errors}
                        name={`guests.${index}.email`}
                      ></ErrorMessage>
                    </span>
                  )}
                </label>
                <label className={index === 0 ? "required" : ""}>
                  <span className="vhidden">Phone</span>
                  <input
                    type="number"
                    {...register(
                      `guests.${index}.phone` as const,
                      isRequiredText(index, "Phone is required")
                    )}
                    placeholder={`Phone ${index == 0 ? "" : "(optional)"}`}
                    autoComplete="on"
                    aria-required={index == 0}
                  />
                  {errors && (
                    <span className="error">
                      <ErrorMessage
                        errors={errors}
                        name={`guests.${index}.phone`}
                      ></ErrorMessage>
                    </span>
                  )}
                </label>

                <button
                  className="btn btn--xs"
                  key="removeGuest"
                  type="button"
                  onClick={() => removeGuest(index)}
                  disabled={numberOfGuests <= 1}
                >
                  Delete
                </button>
              </div>
            </section>
          );
        })}
        <label className="btn-panel">
          <span className="vhidden">Add ticket</span>
          <button
            className="add-guest btn btn--small btn--blue"
            key="addGuest"
            type="button"
            onClick={addGuest}
          >
            Add Ticket
          </button>
        </label>
      </div>
      <div className="submit-wrapper">
        <input type="submit" className="btn btn-blue" />
        {responseMessage && <span>{responseMessage}</span>}
      </div>
    </form>
  );
}
