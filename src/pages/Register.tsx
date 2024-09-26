import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { faker } from "@faker-js/faker";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

// import components
import PersonalInfoForm from "../components/forms/PersonalInfoForm";
import ResidenceForm from "../components/forms/ResidenceForm";
import AccountInfoForm from "../components/forms/AccountInfoForm";
import FormHeader from "../components/ui/FormHeader";

type Props = {};

export type FormState = {
  occupation?: string | undefined;
  name: string;
  email: string;
  phone_number: string;
  password: string;
  address: string;
  zipCode: string;
  country: string;
  accountType: string;
  accountDescription: string;
};

const formSchema = new yup.ObjectSchema({
  name: yup.string().required(),
  email: yup.string().email().required(),
  occupation: yup.string(),
  phone_number: yup.string().required("Phone Number is Required"),
  password: yup.string().required().min(6),
  address: yup.string().required(),
  zipCode: yup.string().required("Enter your regional zip code"),
  country: yup.string().required(),
  accountType: yup.string().required("Please select an account type"),
  accountDescription: yup.string().required("Description is required"),
});

const Register = (props: Props) => {
  const [activeForm, setActiveForm] = useState(1);

  const navigation = useNavigate();

  // set up form values
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(formSchema),
  });

  let accountNumber = faker.finance.accountNumber();

  // submit to firebase
  const submitTofirebase = async (formValue: FormState) => {
    try {
      // submit to firebase
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formValue.email.toLocaleLowerCase(),
        formValue.password
      );
      // save to database
      const userRef = doc(db, "user", formValue.email);

      await setDoc(userRef, {
        ...formValue,
        createdAt: user.metadata.creationTime,
        accountBalance: 0,
        loanBalance: 0,
        verified: false,
        accountNumber: accountNumber,
        email: formValue.email.toLocaleLowerCase(),
      });

      toast.success("Auth Successful", {
        position: "top-right",
        theme: "colored",
      });

      navigation("/dashboard");
    } catch (error: any) {
      toast.error(error.code, {
        position: "top-right",
        theme: "colored",
        type: "error",
      });
    }

    console.log(formValue);
  };

  return (
    <section className="bg-slate-900 min-h-screen">
      {/* container */}
      <main className="p-3 md:w-[40%] mx-auto w-[90%]">
        {/* Form Header */}
        <div className="flex justify-between items-center gap-1 my-[2rem]">
          <FormHeader title="Personal" stage={1} currentState={activeForm} />
          <FormHeader title="Residence" stage={2} currentState={activeForm} />
          <FormHeader title="Account" stage={3} currentState={activeForm} />
        </div>
        <form onClick={handleSubmit(submitTofirebase)}>
          {activeForm == 1 && (
            <PersonalInfoForm
              updateFn={setActiveForm}
              formState={register}
              errors={errors}
            />
          )}
          {activeForm == 2 && (
            <ResidenceForm
              updateFn={setActiveForm}
              formState={register}
              errors={errors}
            />
          )}
          {activeForm == 3 && (
            <AccountInfoForm
              updateFn={setActiveForm}
              formState={register}
              errors={errors}
            />
          )}

          {/*form footer */}
          <div className="flex flex-col mt-[2rem] py-[2rem]  text-center justify-center items-center font-sans font-light">
            <p className="text-yellow-200">
              Have an account,{" "}
              <Link to="/login" className="underline font-regular">
                Login
              </Link>
            </p>
            <p className="font-light text-yellow-200/50">
              INB will not ask you for your online access and private
              information Don't let anyone know your security details
            </p>
          </div>
        </form>
      </main>
    </section>
  );
};

export default Register;
