import { useFetchCountry } from "../../hooks/useCountry";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  increment,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { TransferOtp } from "../otp/OtpForm";

type Props = {};

// account type options
const accountTypeOptions = [
  "Checking Account",
  "Savings Account",
  "Fixed Deposit",
  "Premium Leo Account",
];

// schema

const formSchema = new yup.ObjectSchema({
  amount: yup.string().required().min(1),
  beneficiary_name: yup
    .string()
    .required("Beneficiary Account Name is important"),
  bankName: yup.string().required("Bank Name is required"),
  beneficiary_account_number: yup
    .string()
    .required("Account number is important"),
  swift_code: yup.string().required("swift code is important").min(1),
  country: yup.string().required(),
  routing_number: yup.string().required("Routing number is important").min(1),
  account_type: yup.string().required().min(1),
  remark: yup.string().required().min(1),
  ims_code: yup.string().required("IMS code is Required"),
});

// form type

const InternationalTransferForm = (props: Props) => {
  // use country hook
  const { countries }: any = useFetchCountry();
  const { user }: any = useContext(AuthContext);
  const Navigation = useNavigate();

  // use Form Hook
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  // form values
  const formValues = {
    amount: watch("amount"),
    beneficiary_name: watch("beneficiary_name"),
    bankName: watch("bankName"),
    beneficiary_account_number: watch("beneficiary_account_number"),
    swift_code: watch("swift_code"),
    country: watch("country"),
    routing_number: watch("routing_number"),
    account_type: watch("account_type"),
    remark: watch("remark"),
    ims_code: watch("ims_code"),
  };

  // add to firebase
  const addTransactionToFireStore = async (formValue: any) => {
    try {
      // collection ref
      const transactionRef = collection(
        db,
        "user",
        `${user.email}`,
        "transactions"
      );

      // user ref
      const userRef = doc(db, "user", user.email);

      await addDoc(transactionRef, {
        ...formValue,
        approved: false,
        date: serverTimestamp(),
        type: "International Transfer",
      });

      await updateDoc(userRef, {
        accountBalance: increment(-formValue.amount),
      });
    } catch (error: any) {
      toast.error(error.code, {
        bodyClassName: "toast",
        position: "bottom-center",
        theme: "colored",
      });
    }
  };

  return (
    <>
      <form className="md:w-[60%] mx-auto">
        {/* amount */}
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="Amount" className="font-light font-sans">
            Amount
          </label>
          <input
            type="text"
            {...register("amount")}
            className="p-3 rounded bg-slate-400/20  font-sans font-light"
          />
          <p className="text-red-500 text-sm font-sans capitalize font-light">
            {errors.amount?.message}
          </p>
        </div>
        {/* beneficiary Name */}
        <div className="flex flex-col gap-2 my-4">
          <label
            htmlFor="Beneficiary Account Name"
            className="font-light font-sans"
          >
            Beneficiary Account Name
          </label>
          <input
            type="text"
            {...register("beneficiary_name")}
            className="p-3 rounded bg-slate-400/20  font-sans font-light"
          />
          <p className="text-red-500 text-sm font-sans capitalize font-light">
            {errors.beneficiary_name?.message}
          </p>
        </div>
        {/* bank Name */}
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="full name" className="font-light font-sans">
            Bank Name
          </label>
          <input
            type="text"
            {...register("bankName")}
            className="p-3 rounded bg-slate-400/20  font-sans font-light"
          />
          <p className="text-red-500 text-sm font-sans capitalize font-light">
            {errors.bankName?.message}
          </p>
        </div>
        {/* Beneficiary Account number */}
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="full name" className="font-light font-sans">
            Beneficiary Account Number
          </label>
          <input
            type="text"
            {...register("beneficiary_account_number")}
            className="p-3 rounded bg-slate-400/20  font-sans font-light"
          />
          <p className="text-red-500 text-sm font-sans capitalize font-light">
            {errors.beneficiary_account_number?.message}
          </p>
        </div>
        {/* swift code */}
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="full name" className="font-light font-sans">
            Swift Code
          </label>
          <input
            type="text"
            {...register("swift_code")}
            className="p-3 rounded bg-slate-400/20  font-sans font-light"
          />
          <p className="text-red-500 text-sm font-sans capitalize font-light">
            {errors.swift_code?.message}
          </p>
        </div>
        {/* IMS Code */}
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="Remarks" className="font-light font-sans">
            IMS Code
          </label>
          <input
            type="text"
            {...register("ims_code")}
            className="resize-y bg-slate-400/20 px-2 font-sans font-light capitalize py-2"
          />
          <p className="text-red-500 text-sm font-sans capitalize font-light">
            {errors.ims_code?.message}
          </p>
        </div>
        {/* Country */}
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="country" className="font-light font-sans ">
            Country
          </label>
          <select
            {...register("country")}
            className="p-3 rounded bg-slate-400/20 font-sans font-light"
          >
            {countries &&
              countries.map((country: any) => (
                <option value={country.country} key={country.country}>
                  {country.country}
                </option>
              ))}
          </select>
          <p className="text-red-500 text-sm font-sans capitalize font-light">
            {errors.country?.message}
          </p>
        </div>
        {/* routing Number */}
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="full name" className="font-light font-sans">
            Routing Number
          </label>
          <input
            type="text"
            {...register("routing_number")}
            className="p-3 rounded bg-slate-400/20  font-sans font-light"
          />
          <p className="text-red-500 text-sm font-sans capitalize font-light">
            {errors.routing_number?.message}
          </p>
        </div>
        {/* Account Type input */}
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="Account Type" className="font-light font-sans">
            Account Type
          </label>
          <select
            {...register("account_type")}
            className="p-4 outline-none rounded bg-slate-400/20  font-sans font-light"
          >
            {accountTypeOptions.map((actType) => (
              <option value={actType} key={actType}>
                {actType}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-sm font-sans capitalize font-light">
            {errors.account_type?.message}
          </p>
        </div>
        {/* fund Purpose */}
        <div className="flex flex-col gap-2 my-4">
          <label
            htmlFor="account description"
            className="font-light font-sans "
          >
            Remark
          </label>
          <textarea
            {...register("remark")}
            className="p-4 outline-none resize-none  rounded bg-slate-400/20  font-sans font-light"
          />
          <p className="text-red-500 text-sm font-sans capitalize font-light">
            {errors.remark?.message}
          </p>
        </div>
      </form>
      <TransferOtp formValues={formValues} fn={addTransactionToFireStore} />
    </>
  );
};

export default InternationalTransferForm;
