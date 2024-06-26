"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NumberInput from "@/components/Inputs/NumberInput";
import AutoCompleteInput from "@/components/Inputs/AutoCompleteInput";
import { Form } from "@/components/Inputs/Form";
import { FormSubmitButton } from "@/components/Inputs/buttons/FormSubmitButton";
import { User } from "./interface";
import { findUser } from "@/utils/ServerActions/user";
import { createStamps } from "@/utils/ServerActions/stamp";
import AdminAddModalButton from "@/components/Inputs/buttons/AdminAddModalButton";
import AdminAddButton from "@/components/Inputs/buttons/AdminAddButton";

/**
 * Provides functionality to add a stamp for a user.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.user_id - The id of the user to add a stamp for.
 * @returns {JSX.Element} A component that allows an admin to add stamps for users.
 */
export default function AddStamp(props?: { user_id?: string }) {
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [userInput, setUserInput] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getUsers = async () => {
      const response = await findUser("-id", userInput);
      setUsers(
        response.users?.map((user) => ({ ...user, email: user.email || "" })) ||
          []
      );
    };

    getUsers();
  }, [userInput]);

  const handleSubmit = async (formData: FormData) => {
    await createStamps(formData);

    router.refresh();
    setModal(false);
  };

  const handleChange = () => setModal(!modal);

  return (
    <div>
      <AdminAddButton
        handleChange={() => handleChange()}
        modal={modal}
        title='Add stamp'
      />

      <div
        className={`
        ${modal ? "" : "hidden"} 
        flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full
      `}
      >
        <div className='relative w-full h-full max-w-2xl p-4 md:h-auto'>
          <div className='relative p-4 bg-white rounded-lg shadow sm:p-5'>
            <AdminAddModalButton
              title='Add Stamp'
              handleChange={() => handleChange()}
            />

            <Form isError={false} error=''>
              <AutoCompleteInput
                inputName='user_id'
                inputLabel='User'
                inputPlaceholder='Select a user'
                defaultValue={props?.user_id ? props.user_id : undefined}
                onInputChange={(value) => setUserInput(value)}
                options={users.map((user) => ({
                  id: user.id,
                  label: user.email,
                }))}
              />

              <NumberInput
                inputName='amount'
                inputLabel='Amount'
                inputPlaceholder='Number of stamps'
                min={1}
                helperText='The number of stamps created for this user.'
              />
              <FormSubmitButton
                formAction={handleSubmit}
                pendingText='Adding...'
              >
                Save
              </FormSubmitButton>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
